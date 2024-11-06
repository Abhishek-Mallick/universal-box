// routes/billing.js

const express = require("express");
const router = express.Router();
const Billing = require("../models/billing"); // Adjust path as necessary

// Create a new billing record
router.post("/", async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res.status(201).send(billing);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all billing records
router.get("/", async (req, res) => {
  try {
    const billings = await Billing.find();
    res.status(200).send(billings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get billing records for a specific student
router.get("/:studentId", async (req, res) => {
  try {
    const billing = await Billing.find({ student: req.params.studentId });
    if (billing.length === 0) {
      return res
        .status(404)
        .send({ message: "No billing records found for this student." });
    }
    res.status(200).send(billing);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a billing record by ID
router.put("/:id", async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!billing) {
      return res.status(404).send({ message: "Billing record not found." });
    }
    res.status(200).send(billing);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete a billing record by ID
router.delete("/:id", async (req, res) => {
  try {
    const billing = await Billing.findByIdAndDelete(req.params.id);
    if (!billing) {
      return res.status(404).send({ message: "Billing record not found." });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
