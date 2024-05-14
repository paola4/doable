import createTaskCard from "./taskCard.js";
import { createElementWithContent } from "./helpers.js";
import { updateLocalStorage } from "./categoryManager.js";

// Helper function to render all tasks in a category as task cards
function renderTasks(category) {
  const tasks = document.createElement("div");
  tasks.classList.add("tasks");
  category.tasks.forEach((task) => {
    const taskCard = createTaskCard(task, category);
    tasks.appendChild(taskCard);
  });
  return tasks;
}

// Helper function to render a single task as a task card
function renderSingleTask(task, category) {
  const tasks = document.querySelector(".tasks");
  const taskCard = createTaskCard(task, category);
  tasks.appendChild(taskCard);
}
// Helper function to render a full view of a task
function renderTaskFullView(task, category) {
  console.log("Rendering Full Task View");
  const modal = document.createElement("div");
  modal.classList.add("taskModal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeTask = createElementWithContent("span", "x", modalContent);
  closeTask.classList.add("close-add-task");

  createElementWithContent("h2", task.title, modalContent);
  createElementWithContent("p", task.description, modalContent);
  createElementWithContent("p", `Set Date: ${task.setDate}`, modalContent);
  createElementWithContent("p", `Due Date: ${task.dueDate}`, modalContent);
  createElementWithContent("p", `Priority: ${task.priority}`, modalContent);
  createElementWithContent("p", task.notes, modalContent);

  console.log("Checklist", task.checklist);
  if (task.checklist.length > 0) {
    const checklist = document.createElement("ul");
    task.checklist.forEach((item) => {
      createElementWithContent("li", item, checklist);
    });
    modalContent.appendChild(checklist);
  }

  // Add delete button
  const deleteButton = createElementWithContent(
    "button",
    "Delete",
    modalContent
  );
  deleteButton.addEventListener("click", () => {
    deleteTask(task, category, modal);
  });

  modal.appendChild(modalContent);

  const mainView = document.querySelector(".main-view");
  mainView.appendChild(modal);

  // Handle Close Button Click: Remove Modal
  closeTask.addEventListener("click", () => {
    modal.remove();
  });
  return modal;
}

// Helper function to delete a task
function deleteTask(task, category, modal) {
  const index = category.tasks.indexOf(task);
  if (index > -1) {
    category.tasks.splice(index, 1);
    // If you're using local storage to persist tasks, update it here
    updateLocalStorage(category);
    // Clear and re-render tasks
    const tasksContainer = document.querySelector(".tasks");
    tasksContainer.innerHTML = "";
    category.tasks.forEach((task) => {
      const taskCard = createTaskCard(task, category);
      tasksContainer.appendChild(taskCard);
    });
    // Remove the modal
    modal.remove();
  }
}

export { renderTasks, renderSingleTask, renderTaskFullView };
