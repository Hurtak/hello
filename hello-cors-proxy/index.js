const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const bingImageUrl = (() => {
  // Some related docs: https://github.com/timothymctim/Bing-wallpapers
  // Locale (the "mkt" parameter) is determined automatically based on the IP address.

  const bingImage = new URL("https://www.bing.com/HPImageArchive.aspx");
  bingImage.searchParams.set("format", "js"); // get JSON as response-type
  bingImage.searchParams.set("idx", "0"); // 0 - first image today, 1 - first yesterday, ...
  bingImage.searchParams.set("n", "1"); // number of images

  return bingImage.toString();
})();

app.get("/", cors(), (req, res) => {
  req.pipe(request(bingImageUrl)).pipe(res);
});

app.get("/health-check", cors(), (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`hello-cors-proxy listening at port ${port}`);
});
