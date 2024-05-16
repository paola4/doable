import createTaskCard from "./taskCard.js";
import { createElementWithContent } from "./helpers.js";
import { updateLocalStorage } from "./categoryManager.js";
import { set } from "lodash";

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

  const close = document.createElement("div");
  close.classList.add("close-button");
  close.innerHTML = "<i class='ph-bold ph-x'></i>";
  modalContent.appendChild(close);

  const header = document.createElement("div");
  header.classList.add("published-view-header");
  modalContent.appendChild(header);

  createElementWithContent("span", task.title, header, "title");

  const deleteButton = document.createElement("div");
  header.appendChild(deleteButton);
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = '<i class="ph-bold ph-trash"></i>';
  deleteButton.addEventListener("click", () => {
    deleteTask(task, category, modal);
  });

  const description = document.createElement("div");
  modalContent.appendChild(description);
  description.classList.add("form-section");
  const descriptionText = document.createElement("span");
  description.appendChild(descriptionText);
  descriptionText.textContent = "Description";

  createElementWithContent(
    "p",
    task.description,
    description,
    "task-description"
  );

  const setDate = document.createElement("div");
  modalContent.appendChild(setDate);
  setDate.classList.add("form-section");
  const setDateText = document.createElement("span");
  setDate.appendChild(setDateText);
  setDateText.textContent = "Set Date";

  createElementWithContent(
    "p",
    `Set Date: ${task.setDate}`,
    setDate,
    "set-date"
  );

  const dueDate = document.createElement("div");
  modalContent.appendChild(dueDate);
  dueDate.classList.add("form-section");
  const dueDateText = document.createElement("span");
  dueDate.appendChild(dueDateText);
  dueDateText.textContent = "Due Date";

  createElementWithContent(
    "p",
    `Due Date: ${task.dueDate}`,
    dueDate,
    "due-date"
  );

  const priority = document.createElement("div");
  modalContent.appendChild(priority);
  priority.classList.add("form-section");
  const priorityText = document.createElement("span");
  priority.appendChild(priorityText);
  priorityText.textContent = "Priority";

  createElementWithContent(
    "p",
    `Priority: ${task.priority}`,
    priority,
    "priority"
  );

  const notes = document.createElement("div");
  modalContent.appendChild(notes);
  notes.classList.add("form-section");
  const notesText = document.createElement("span");
  notes.appendChild(notesText);
  notesText.textContent = "Notes";

  createElementWithContent("p", task.notes, notes, "notes");

  // Add checklist
  const checklistWrapper = document.createElement("div");
  modalContent.appendChild(checklistWrapper);
  checklistWrapper.classList.add("form-section");
  const checklistText = document.createElement("span");
  checklistWrapper.appendChild(checklistText);
  checklistText.textContent = "Checklist";

  console.log("Checklist", task.checklist);
  if (task.checklist.length > 0) {
    const checklist = document.createElement("ul");
    task.checklist.forEach((item) => {
      createElementWithContent("li", item, checklist);
    });
    checklistWrapper.appendChild(checklist);
  }

  // Add close button
  const closeButton = createElementWithContent("button", "Close", modalContent);
  closeButton.addEventListener("click", () => {
    modal.remove();
  });
  closeButton.classList.add("primary");

  // Add delete button
  // const deleteButton = createElementWithContent(
  //   "div",
  //   "Delete",
  //   modalContent
  // );

  modal.appendChild(modalContent);

  const mainView = document.querySelector(".main-view");
  mainView.appendChild(modal);

  // Handle Close Button Click: Remove Modal
  close.addEventListener("click", () => {
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
