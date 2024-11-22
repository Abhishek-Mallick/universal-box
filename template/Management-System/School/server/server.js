// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // For handling CORS if needed

// Import route files
const studentRoutes = require("./routes/students");
const facultyRoutes = require("./routes/faculties");
const courseRoutes = require("./routes/courses");
const attendanceRoutes = require("./routes/attendance");
const billingRoutes = require("./routes/billing");

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/school_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/billing", billingRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
