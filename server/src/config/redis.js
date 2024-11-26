const { createClient } = require("redis");

require("dotenv").config();

const redisConfig = {
  url: process.env.REDIS_URL || "redis://localhost:6379",
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      return undefined;
    }
    // Reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
};

const client = createClient(redisConfig);
client
  .connect()
  .then(() => {
    console.log("connected to the redis server successfully");
  })
  .catch((err) => {
    console.log("error connecting to the redis server :", err);
  });

client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = { redisConfig, client };
