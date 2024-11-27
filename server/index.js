const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/userRoute");
const schoolRouter = require("./src/routes/schoolRoute");
const studentRouter = require("./src/routes/studentRoute");
const teacherRouter = require("./src/routes/teacherRoute");
const classRouter = require("./src/routes/classRoute");
const parentRouter = require("./src/routes/parentRoute");
const expenseRouter = require("./src/routes/expenseRoute");
const subjectRouter = require("./src/routes/subjectRoute");
const authRouter = require("./src/routes/auth");
const { feesGroupRouter, FeesRouter } = require("./src/routes/feesRoute");
const cookieParser = require("cookie-parser");
// const { isAuth } = require("./middlewares/authentication");
const { getAccountDetails } = require("./src/services/userService");
const { authenticate } = require("./src/middlewares/auth");
const app = express();

require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
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
app.use("/parent", parentRouter);
app.get("/details", authenticate, getAccountDetails);
app.use("/expenses", expenseRouter);
app.use("/subjects", subjectRouter);
app.use("/fees", FeesRouter);
app.use("/fees-groups", feesGroupRouter);
app.use("/auth", authRouter);

app.listen(PORT || 5000, () => console.log("server running on port 3000"));
