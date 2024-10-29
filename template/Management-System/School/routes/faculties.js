const express = require("express");
const router = express.Router();
const Faculty = require("../models/faculty"); // Adjust path as necessary

// Create a new faculty member
router.post("/", async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).send(faculty);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all faculty members
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.status(200).send(faculty);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific faculty member by ID
router.get("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).send();
    }
    res.status(200).send(faculty);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a faculty member by ID
router.put("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!faculty) {
      return res.status(404).send();
    }
    res.status(200).send(faculty);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a faculty member by ID
router.delete("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).send();
    }
    res.status(200).send(faculty);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
