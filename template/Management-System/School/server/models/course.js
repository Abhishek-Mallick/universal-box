const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Course", courseSchema);
