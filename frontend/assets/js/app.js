const API_URL = "https://taskmaster-lb6d.onrender.com/api"; // API base URL

// Register new user
// Get the registration form
document
  .getElementById("register-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if the form fields are valid
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Send the registration request to the backend API
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Successfully registered, redirect to login page
        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
      } else {
        // Show the error message from the backend
        console.error("Registration Error:", result.message);
        alert(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Something went wrong. Please try again.");
    }
  });

// Login user
// Get the registration form
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("token", result.token);
      window.location.href = "dashboard.html";
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  }
});

// Add task on dashboard
document.getElementById("task-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;
  const deadline = document.getElementById("task-deadline").value;
  const priority = document.getElementById("task-priority").value;

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, deadline, priority }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Task created successfully!");
      fetchTasks(); // Reload tasks
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  // Clear the token from localStorage
  localStorage.removeItem("token");

  // Redirect to the login page
  window.location.href = "login.html";
});

// Load tasks on dashboard
async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const tasks = await response.json();

      const taskList = document.getElementById("task-list");
      taskList.innerHTML = "";

      tasks.forEach((task) => {
        taskList.innerHTML += `
            <div class="task" id="task-${task._id}">
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <p><strong>Priority:</strong> ${task.priority}</p>
              <p><strong>Deadline:</strong> ${new Date(
                task.deadline
              ).toLocaleDateString()}</p>
              <button class="edit-btn" data-id="${task._id}">Edit</button>
              <button class="delete-btn" data-id="${task._id}">Delete</button>
            </div>
          `;
      });

      attachEventListeners();
    } else {
      console.error("Failed to fetch tasks");
    }
  } catch (err) {
    console.error(err);
  }
}

function attachEventListeners() {
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const taskId = e.target.dataset.id;
      openEditModal(taskId);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const taskId = e.target.dataset.id;
      deleteTask(taskId);
    });
  });
}

fetchTasks();

// Edit Task
async function openEditModal(taskId) {
  // Fetch task details
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.ok) {
    const task = await response.json();

    // Populate the edit form
    document.getElementById("edit-title").value = task.title;
    document.getElementById("edit-description").value = task.description;
    document.getElementById("edit-priority").value = task.priority;
    document.getElementById("edit-deadline").value =
      task.deadline.split("T")[0];

    // Show the modal
    document.getElementById("edit-modal").style.display = "block";

    // Attach submit event listener to save changes
    document
      .getElementById("edit-task-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        saveTaskChanges(taskId);
      });
  } else {
    alert("Failed to load task details");
  }
}

async function saveTaskChanges(taskId) {
  const title = document.getElementById("edit-title").value;
  const description = document.getElementById("edit-description").value;
  const priority = document.getElementById("edit-priority").value;
  const deadline = document.getElementById("edit-deadline").value;

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, priority, deadline }),
    });

    if (response.ok) {
      alert("Task updated successfully");
      document.getElementById("edit-modal").style.display = "none";
      fetchTasks(); // Refresh task list
    } else {
      alert("Failed to update task");
    }
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("close-edit-modal").addEventListener("click", () => {
  document.getElementById("edit-modal").style.display = "none";
});

// Delete Task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      alert("Task deleted successfully");
      document.getElementById(`task-${taskId}`).remove(); // Remove task from UI
    } else {
      alert("Failed to delete task");
    }
  } catch (err) {
    console.error(err);
  }
}
// Refresh Token
async function refreshToken() {
  const response = await fetch(`${API_URL}/refresh-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem("token", token);
  } else {
    redirectToLogin();
  }
}

// Sort & Filter
// References to controls
const filterPriority = document.getElementById("filter-priority");
const sortTasks = document.getElementById("sort-tasks");
const searchTasks = document.getElementById("search-tasks");

// Fetch tasks and render
let allTasks = []; // Store all tasks globally for filtering and sorting
async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); // Replace with your API endpoint
    if (response.ok) {
      const tasks = await response.json();

      allTasks = tasks;
      renderTasks(tasks); // Render fetched tasks
      attachEventListeners();
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Render tasks dynamically
function renderTasks(tasks) {
  const taskContainer = document.getElementById("task-list");
  taskContainer.innerHTML = ""; // Clear existing tasks

  tasks.forEach((task) => {
    const taskCard = `
       <div class="task" id="task-${task._id}">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
                <p><strong>Deadline:</strong> ${new Date(
                  task.deadline
                ).toLocaleDateString()}</p>
                <button class="edit-btn" data-id="${task._id}">Edit</button>
                <button class="delete-btn" data-id="${task._id}">Delete</button>
              </div>`;
    taskContainer.innerHTML += taskCard;
  });
}

// Filter tasks by priority
filterPriority.addEventListener("change", () => {
  const filteredTasks = allTasks.filter((task) =>
    filterPriority.value ? task.priority === filterPriority.value : true
  );
  renderTasks(filteredTasks);
});

// Sort tasks based on dropdown
sortTasks.addEventListener("change", () => {
  const [field, order] = sortTasks.value.split("-");
  const sortedTasks = [...allTasks].sort((a, b) => {
    if (field === "deadline") {
      return order === "asc"
        ? new Date(a.deadline) - new Date(b.deadline)
        : new Date(b.deadline) - new Date(a.deadline);
    } else if (field === "priority") {
      const priorities = { low: 1, medium: 2, high: 3 };
      return order === "asc"
        ? priorities[a.priority] - priorities[b.priority]
        : priorities[b.priority] - priorities[a.priority];
    }
  });
  renderTasks(sortedTasks);
});

// Search tasks by title or description
searchTasks.addEventListener("input", () => {
  const query = searchTasks.value.toLowerCase();
  const searchedTasks = allTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
  );
  renderTasks(searchedTasks);
});

// Initial fetch
fetchTasks();
