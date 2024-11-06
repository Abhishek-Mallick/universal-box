const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Paid", "Pending", "Overdue"],
    required: true,
  },
  description: String,
});

module.exports = mongoose.model("Billing", billingSchema);
