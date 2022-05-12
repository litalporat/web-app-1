const express = require("express");
const path = require("path");
const app = express();
const ads = require("./data");
const PORT = 8080;
let data;
app.use(express.json());

const getData = (filterNumber) => {
  return ads.filter((item) => item.screenIds.includes(filterNumber));
};

app.get("/", function (req, res) {
  if (req?.query && req.query?.screen) {
    data = getData(Number(req.query.screen));
    res.sendFile(__dirname + "/index.html");
  } else res.send("please specify a screen");
});

app.get("/data", function (req, res) {
  res.send(data);
});

app.get("/a.html", function (req, res) {
  res.sendFile(__dirname + "/a.html");
});

app.get("/b.html", function (req, res) {
  res.sendFile(__dirname + "/b.html");
});

app.get("/c.html", function (req, res) {
  res.sendFile(__dirname + "/c.html");
});

app.get("/script.js", function (req, res) {
  res.sendFile(__dirname + "/script.js");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
