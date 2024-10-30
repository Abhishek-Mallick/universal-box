const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  regno: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  contactNumber: { type: Number },
  profile: {
    dob: Date,
    contact: String,
    address: String,
  },
  class: { type: Number },
  billing: [{ type: mongoose.Schema.Types.ObjectId, ref: "Billing" }],
});

module.exports = mongoose.model("Student", studentSchema);
