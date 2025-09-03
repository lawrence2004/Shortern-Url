import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Url } from "./models/urlModel.js";
import shortid from "shortid";

const app = express();
app.use(bodyParser.json());

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
    const urls = await Url.find();

    res.status(200).send(urls);
})

app.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;

    if(!longUrl) return res.status(400).json({ error: "Long URL is required" });

    try {
        const generatedShortId = shortid.generate();
        const newUrl = await Url.create({ longUrl, shortId: generatedShortId });

        res.json({
            longUrl: newUrl.longUrl,
            shortUrl: `http://localhost:8080/${newUrl.shortId}`,
        });
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}); 

app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;

    try {
        const url = await Url.findOne({ shortId });

        if(!url) return res.status(404).json({ error: "URL not found" });

        url.clicks += 1;
        await url.save();
        res.redirect(url.longUrl);
    }
    catch(err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(8080, () => {
    console.log("App is listening...");
})