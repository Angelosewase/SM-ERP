const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const schoolRouter = require("./routes/schoolRoute");
const studentRouter = require("./routes/studentRoute");
const teacherRouter = require("./routes/teacherRoute");
const classRouter = require("./routes/classRoute");
const cookieParser = require("cookie-parser");
const { isAuth } = require("./middlewares/authentication");
const { getAccountDetails } = require("./services/userService");
const app = express();

require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", /^https:\/\/.*/],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());

const PORT = process.env.PORT;
connectDB();

app.get("/test", async (req, res) => {
  res.json({
    hello: "client ",
  });
  console.log("server up and running");
});

app.use("/users", userRouter);
app.use("/school", schoolRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/class", classRouter);
app.get("/details", isAuth, getAccountDetails);

app.listen(PORT || 5000, () => console.log("server running on port 3000"));
