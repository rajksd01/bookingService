const express = require("express");
const app = express();
const { logConfig } = require("./config");

const { ServerConfig } = require("../src/config");


app.listen(ServerConfig.PORT, () => {
  console.log("listening on port " + ServerConfig.PORT);
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });
});
