const express = require("express");
const cors = require("cors")
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute")
const schoolRouter = require("./routes/schoolRoute")
const cookieParser = require('cookie-parser')

const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT;
connectDB();

app.get("/test", async (req, res) => {
  res.json({
    "hello":"client "
  })
  console.log("server up and running");
});


app.use("/users", userRouter)
app.use("/schools", schoolRouter)

app.listen(PORT || 5000, () => console.log("server running on port 3000"));
