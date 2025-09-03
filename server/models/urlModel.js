import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortId: { type: String, unique: true },
  clicks: { type: Number, default: 0 }
})

export const Url = mongoose.model("Url", urlSchema);