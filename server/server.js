const express = require("express");
const app = require("./app");
const http = require("http");

const connectToDb = require("./db");
const { PORT } = require("./config/config");

const server = http.createServer(app);

connectToDb();

server.listen(PORT, () => {
  console.log(`listening on on port ${PORT}`);
});
