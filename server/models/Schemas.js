const mongoose = require("mongoose");

// Parent Schema
const parentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: String,
    phoneNumber: String,
    child: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  },
  { timestamps: true }
);

// Financial Transaction Schema
const transactionRecordSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    transactionType: { type: String, enum: ["tuition", "books", "uniform"], required: true },
    status: { type: String, enum: ["paid", "pending", "overdue"], default: "pending" }
  },
  { timestamps: true }
);

// Student Schema
const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }],
    gender: { type: String, enum: ["male", "female"], required: true },
  },
  { timestamps: true }
);

// Teacher Schema
const teacherSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true }]
  },
  { timestamps: true }
);

// School Schema
const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    establishedYear: { type: Number },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  },
  { timestamps: true }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    role: { type: String, enum: ["admin", "teacher"], default: "teacher" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  },
  { timestamps: true }
);

// Subject Schema
const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    description: String
  },
  { timestamps: true }
);

// Class Schema
const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }]
  },
  { timestamps: true }
);

// Attendance Schema
const attendanceSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent", "late"], required: true }
  },
  { timestamps: true }
);

// Exam Results Schema
const examResultsSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    grade: { type: String, required: true },
    examDate: { type: Date, required: true }
  },
  { timestamps: true }
);

// Schedule Schema
const scheduleSchema = new mongoose.Schema(
  {
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    dayOfWeek: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], required: true }
  },
  { timestamps: true }
);

// Message Schema
const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }
);

// Notification Schema
const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["exam", "fee", "event"], required: true },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Models
const UserModel = mongoose.model("User", userSchema);
const SchoolModel = mongoose.model("School", schoolSchema);
const FinancialTransactionModel = mongoose.model("TransactionRecord", transactionRecordSchema);
const TeacherModel = mongoose.model("Teacher", teacherSchema);
const StudentModel = mongoose.model("Student", studentSchema);
const ParentModel = mongoose.model("Parent", parentSchema);
const SubjectModel = mongoose.model("Subject", subjectSchema);
const ClassModel = mongoose.model("Class", classSchema);
const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
const ExamResultsModel = mongoose.model("ExamResults", examResultsSchema);
const ScheduleModel = mongoose.model("Schedule", scheduleSchema);
const MessageModel = mongoose.model("Message", messageSchema);
const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = {
  UserModel,
  SchoolModel,
  FinancialTransactionModel,
  TeacherModel,
  StudentModel,
  ParentModel,
  SubjectModel,
  ClassModel,
  AttendanceModel,
  ExamResultsModel,
  ScheduleModel,
  MessageModel,
  NotificationModel
};
