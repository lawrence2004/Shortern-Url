import React, { useState } from "react";
import axios from "axios";

function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const res = await axios.post("http://localhost:8080/shorten", { longUrl });
    setShortUrl(res.data.shortUrl);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter Long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <button onClick={handleShorten} style={{ marginLeft: "10px", padding: "8px" }}>
        Shorten
      </button>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
}

export default UrlShortener;
