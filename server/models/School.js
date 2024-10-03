const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // School name
    address: {type: String,required: true },
    contactNumber: { type: String, required: true },
    email :{type:String , required :true }, 
    admin: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ], // Head admin
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }], // School teachers
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // All students in the school
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // All classes in the school
    establishedYear: { type: Number, required: true }, // Year the school was established
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", schoolSchema);
