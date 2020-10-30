const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.get('/', function (req, res) {
  res.send('Success!!!');
});

app.listen(PORT, async () => {
  console.log(`express  port ${PORT}`);
  require("../core/start.js").StartSingleton.start();
});
