const express = require("express");
require("dotenv").config();
const colors = require("colors");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    msg: "PROPETY-PULSE IS RUNNING...",
  });
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.white);
});
