const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  facultyID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  department: String,
  contact: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Faculty", facultySchema);
