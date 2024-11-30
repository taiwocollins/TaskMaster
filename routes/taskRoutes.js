const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware"); // Import authentication middleware
const taskController = require("../controllers/taskController"); // Import task controller

// Create a new task
router.post("/", authenticateToken, taskController.createTask);

// Get all tasks for the logged-in user
router.get("/", authenticateToken, taskController.getAllTasks);

// Get a task by ID
router.get("/:id", authenticateToken, taskController.getTaskById);

// Apply authentication middleware to task-related routes
router.get("/", authenticateToken, taskController.getTasks); // Fetch tasks with optional filters

// Update a task
router.put("/:id", authenticateToken, taskController.updateTask);

// Delete a task
router.delete("/:id", authenticateToken, taskController.deleteTask);

module.exports = router;
