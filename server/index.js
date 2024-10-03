const express = require("express");
const connectDB = require("./config/db");
const app = express();

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT;
connectDB();

app.get("/test", async (req, res) => {
  console.log("server up and running");
});

app.listen(PORT || 5000, () => console.log("server running on port 3000"));
