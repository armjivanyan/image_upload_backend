const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const getAllUrls = require("./helpers/getAllUrls");
const PORT = process.env.PORT || 3001;

const app = express();

const assetsPath = __dirname + "/assets";
app.use(express.static(assetsPath));

app.get("/api/all", (req, res) => {
  res.json({ links: JSON.stringify(getAllUrls(assetsPath)) });
});

app.post(
  "/api/upload",
  bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "1mb" }),
  (req, res) => {
    const name = `${Date.now()}.jpg`;
    fs.writeFile(`${assetsPath}/${name}`, req.body, (err) => {
      if (err) {
        throw err;
      }
    });
    res.status(200);
    res.json({ message: `image saved as ${name}!` });
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
