const Task = require("../models/Task");
const taskSchema = require("../middleware/taskValidation");

// Create a new task
const createTask = async (req, res) => {
  try {
    // Validate the request body
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, deadline, priority } = req.body;

    const task = new Task({
      user: req.user.id, // Use the user ID from the JWT token
      title,
      description,
      deadline,
      priority,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Get all tasks for the logged-in user
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // Fetch tasks only for the logged-in user
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    // Validate the request body
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, deadline, priority } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, priority },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

// Get all tasks with filtering and sorting options
const getTasks = async (req, res) => {
  try {
    // Get query parameters for filtering and sorting
    const { priority, sortBy, sortOrder } = req.query;

    // Debug: Check if the query parameters are being received correctly
    console.log("Query Params:", req.query);

    // Build the filter object for priority
    let filter = {};
    if (priority) {
      filter.priority = priority; // Filter by priority (high, medium, low)
    }

    // Build the sort object based on query params
    let sort = {};
    if (sortBy && ["priority", "deadline"].includes(sortBy)) {
      sort[sortBy] = sortOrder === "asc" ? 1 : -1; // Sorting order
    } else {
      // Default sorting by deadline if no valid sortBy is provided
      sort.deadline = 1;
    }

    // Validate sortOrder
    if (sortOrder && sortOrder !== "asc" && sortOrder !== "desc") {
      return res
        .status(400)
        .json({ message: "Invalid sortOrder. It must be 'asc' or 'desc'." });
    }

    // Fetch tasks from the database with filter and sorting
    const tasks = await Task.find(filter).sort(sort);

    // Debug: Log the tasks being returned
    console.log("Tasks Retrieved:", tasks);

    // Send the filtered and sorted tasks
    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching tasks", error: err });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasks,
};
