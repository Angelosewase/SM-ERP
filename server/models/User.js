const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "teacher"], default: "teacher" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
