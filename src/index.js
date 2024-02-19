const express = require("express");
const app = express();
const { logConfig } = require("./config");

const { ServerConfig } = require("../src/config");
const apiRoutes = require("./routes");
const CRON = require("./utils/common/cron-jobs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log("listening on port " + ServerConfig.PORT);
  CRON();
  await Queue.connectQueue();
  logConfig.log({
    level: "info",
    message: `Running on port ${ServerConfig.PORT} `,
  });
});
