const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const jobRoutes = require("./routes/jobRoutes");

const authRoutes = require("./routes/authRoutes");


dotenv.config();

// Connect Database
connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Backend server is running"
  });
});

app.use("/api/jobs", jobRoutes);

app.use("/api/auth", authRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});