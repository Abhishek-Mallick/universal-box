const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance"); // Adjust path as necessary

// Mark attendance for a student
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get attendance records for a student
router.get("/:studentId", async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.studentId });
    res.status(200).send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get attendance records for all students on a specific date
router.get("/date/:date", async (req, res) => {
  try {
    const attendance = await Attendance.find({ date: req.params.date });
    res.status(200).send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update attendance record by ID
router.put("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attendance) {
      return res.status(404).send();
    }
    res.status(200).send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an attendance record by ID
router.delete("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).send();
    }
    res.status(200).send(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
