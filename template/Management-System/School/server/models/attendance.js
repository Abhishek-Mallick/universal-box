const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
