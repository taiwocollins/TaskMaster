require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Root Route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the TaskMaster API! Access the API routes at /api/users or /api/tasks."
  );
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Handle 404 Errors (Route Not Found)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
