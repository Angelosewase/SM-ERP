const mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.MONGO_URL;

async function connnectDB() {
  try {
    await mongoose.connect(db_url);
   console.log("connected to the database successfully")
  } catch (error) {
    console.log("error connecting to the database :", error);
    process.exit(1);
  }
}
module.exports = connnectDB;
