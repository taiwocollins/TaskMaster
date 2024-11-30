// Open the Edit Modal
function openEditModal(taskId) {
  // Populate the modal with task data
  document.getElementById("edit-title").value = taskId.title;
  document.getElementById("edit-description").value = taskId.description;
  document.getElementById("edit-priority").value = taskId.priority;
  document.getElementById("edit-deadline").value = taskId.deadline;

  // Show the modal
  $("#edit-modal").modal("show");
}

// Handle Form Submission
document.getElementById("edit-task-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedTask = {
    title: document.getElementById("edit-title").value,
    description: document.getElementById("edit-description").value,
    priority: document.getElementById("edit-priority").value,
    deadline: document.getElementById("edit-deadline").value,
  };

  console.log("Task Updated:", updatedTask);

  // Add logic to send updated task to the server via an API
  $("#edit-modal").modal("hide");
});
