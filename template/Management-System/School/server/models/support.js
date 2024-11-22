const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Student" || "Faculty" },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  response: String,
  status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" },
});

module.exports = mongoose.model("Support", supportSchema);
