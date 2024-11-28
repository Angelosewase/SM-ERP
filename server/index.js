const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const schoolRouter = require("./src/routes/school.routes");
const studentRouter = require("./src/routes/student.routes");
const teacherRouter = require("./src/routes/teacher.routes");
const classRouter = require("./src/routes/class.routes");
const parentRouter = require("./src/routes/parent.routes");
const expenseRouter = require("./src/routes/expense.routes");
const subjectRouter = require("./src/routes/subject.routes");
const authRouter = require("./src/routes/auth.routes");
const { feesGroupRouter, FeesRouter } = require("./src/routes/fees.routes");
const paymentRouter = require("./src/routes/payment.routes")
const cookieParser = require("cookie-parser");
// const { isAuth } = require("./middlewares/authentication");
const { getAccountDetails } = require("./src/services/user.service");
const { authenticate } = require("./src/middlewares/auth");
const app = express();

require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin:  process.env.CORS_ALLOWED_ORIGINS.split(','),
    methods:  process.env.CORS_ALLOWED_METHODS.split(','),
    allowedHeaders:  process.env.CORS_ALLOWED_HEADERS.split(','),
    exposedHeaders:process.env.CORS_EXPOSE_HEADERS.split(','),
    credentials: process.env.CORS_CREDENTIALS === 'true',
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
app.use("/payment", paymentRouter)

app.listen(PORT || 5000, () => console.log("server running on port 3000"));
