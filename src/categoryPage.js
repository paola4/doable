// Description: This file contains the logic for rendering the category page.
import { compareAsc, format } from "date-fns";

function categoryPage(category) {
  const page = document.createElement("div");
  page.classList.add("category-page");

  const heading = document.createElement("div");
  heading.classList.add("category-heading");
  page.appendChild(heading);

  const categoryHeadingTitle = document.createElement("div");
  categoryHeadingTitle.classList.add("category-heading-title");

  const icon = document.createElement("span");
  icon.innerHTML = category.icon;
  categoryHeadingTitle.appendChild(icon);

  const h2 = document.createElement("h2");
  h2.textContent = category.name;
  categoryHeadingTitle.appendChild(h2);

  heading.appendChild(categoryHeadingTitle);

  const addTaskButton = document.createElement("button");
  addTaskButton.classList.add("add-task");
  addTaskButton.innerHTML = `<i class="ph-bold ph-plus"></i> Add Task`;
  heading.appendChild(addTaskButton);

  // Handle Add Task Button Click: Open Task Modal
  addTaskButton.addEventListener("click", () => {
    console.log("Add Task Button Clicked");
    const modal = renderTaskModal(category);
  });

  // Dynamically render tasks on the page
  const tasks = renderTasks(category);
  page.appendChild(tasks);
  return page;
}
export default categoryPage;

function renderTasks(category) {
  const tasks = document.createElement("div");
  tasks.classList.add("tasks");
  category.tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
            <div class="task-title task-item">${task.title}</div>
            <div class="task-description task-item">${task.description}</div>
            <div class="task-set-date task-item">${task.setDate}</div>
            <div class="task-due-date task-item">${task.dueDate}</div>
            <div class="task-priority task-item">${task.priority}</div>
            <div class="task-notes task-item">${task.notes}</div>
            <div class="task-checklist task-item">${task.checklist}</div>
            <button class="delete-task">Delete Task</button>
            `;
    tasks.appendChild(taskElement);
  });
  return tasks;
}

function renderSingleTask(task) {
  const tasks = document.querySelector(".tasks");
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.innerHTML = `
            <div class="task-title task-item">${task.title}</div>
            <div class="task-description task-item">${task.description}</div>
            <div class="task-set-date task-item">${task.setDate}</div>
            <div class="task-due-date task-item">${task.dueDate}</div>
            <div class="task-priority task-item">${task.priority}</div>
            <div class="task-notes task-item">${task.notes}</div>
            <div class="task-checklist task-item">${task.checklist}</div>
            <button class="delete-task">Delete Task</button>
            `;
  tasks.appendChild(taskElement);
}

// Create a Task object with a title, ddescription, setDate, dueDate, priority, notes, and checklist
// The title should be a string
function createTask(title) {
  return {
    title: title,
    description: "",
    setDate: "",
    dueDate: "",
    priority: "",
    notes: "",
    checklist: [],
  };
}

function renderTaskModal(category) {
  console.log("category", category);
  console.log("In the task modal");

  const modal = document.createElement("div");
  modal.classList.add("taskModal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const close = document.createElement("span");
  close.classList.add("close");
  close.innerHTML = "&times;";

  modalContent.appendChild(close);
  const h2 = document.createElement("h2");
  h2.textContent = "Add Task";
  modalContent.appendChild(h2);

  modalContent.appendChild(createTitleInput());
  modalContent.appendChild(createDescriptionInput());
  modalContent.appendChild(createSetDateInput());
  modalContent.appendChild(createDueDateInput());
  modalContent.appendChild(createPriorityInput());
  modalContent.appendChild(createNotesInput());
  modalContent.appendChild(createChecklistInput());

  const addButton = document.createElement("button");
  addButton.classList.add("add-task");
  addButton.textContent = "Add Task";
  modalContent.appendChild(addButton);

  modal.appendChild(modalContent);

  const mainView = document.querySelector(".main-view");
  mainView.appendChild(modal);

  // Handle Add Task Button Click: Create Task Object
  addButton.addEventListener("click", () => {
    console.log("Add Task Button Clicked");

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const setDate = document.querySelector("#set-date").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector(
      'input[name="priority"]:checked'
    ).value;
    const notes = document.querySelector("#notes").value;

    // Get checklist values
    const checklistItems = document.querySelectorAll(
      "#checklist input[type='text']"
    );
    const checklist = Array.from(checklistItems).map((item) => item.value);
    console.log("Checklist", checklist);

    const task = createTask(title);
    task.description = description;
    task.setDate = setDate;
    task.dueDate = dueDate;
    task.priority = priority;
    task.notes = notes;
    task.checklist = checklist;

    category.tasks.push(task);
    // Update local storage with the new task
    updateLocalStorage(category);
    renderSingleTask(task);

    // Close the modal
    modal.remove();
  });

  // Handle Close Button Click: Remove Modal
  close.addEventListener("click", () => {
    modal.remove();
  });
  return modal;
}

function updateLocalStorage(category) {
  const categories = loadCategories();
  const updatedCategories = categories.map((cat) => {
    if (cat.name === category.name) {
      return category;
    }
    return cat;
  });
  localStorage.setItem("categories", JSON.stringify(updatedCategories));
  console.log("Updated categories", updatedCategories);
}

function loadCategories() {
  return JSON.parse(localStorage.getItem("categories")) || [];
}

function createTitleInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Title";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement("input");
  inputBox.id = "title";
  inputBox.type = "text";
  inputBox.placeholder = "Title";
  inputBox.classList.add("input-box");
  inputContainer.appendChild(inputBox);

  return inputContainer;
}

function createDescriptionInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Description";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement("input");
  inputBox.id = "description";
  inputBox.type = "text";
  inputBox.placeholder = "Description";
  inputBox.classList.add("input-box");
  inputContainer.appendChild(inputBox);

  return inputContainer;
}

function createSetDateInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Set Date";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement("input");
  inputBox.id = "set-date";
  inputBox.type = "date";
  inputBox.placeholder = "Set Date";
  inputBox.classList.add("input-box");

  // Get current date
  const currentDate = new Date();

  // Format date to "yyyy-mm-dd"
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with 0 if necessary
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with 0 if necessary

  // Set the default value of the date input to the current date
  inputBox.value = `${year}-${month}-${day}`;

  inputContainer.appendChild(inputBox);

  return inputContainer;
}

function createDueDateInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Due Date";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement("input");
  inputBox.id = "due-date";
  inputBox.type = "date";
  inputBox.placeholder = "Due Date";
  inputBox.classList.add("input-box");
  inputContainer.appendChild(inputBox);

  return inputContainer;
}

function createPriorityInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Priority";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  // Create four radio buttons, 1 through 4, for the different priorities
  const priorities = ["1", "2", "3", "4"];
  priorities.forEach((priority) => {
    const input = document.createElement("input");
    input.id = priority;
    input.type = "radio";
    input.name = "priority";
    input.value = priority;

    if (priority === "1") {
      input.checked = true;
    }

    inputContainer.appendChild(input);

    const label = document.createElement("label");
    label.textContent = priority;
    inputContainer.appendChild(label);
  });

  return inputContainer;
}

function createNotesInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Notes";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement("input");
  inputBox.id = "notes";
  inputBox.type = "text";
  inputBox.placeholder = "Notes";
  inputBox.classList.add("input-box");
  inputContainer.appendChild(inputBox);

  return inputContainer;
}

function createChecklistInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  inputContainer.id = "checklist";

  const label = document.createElement("label");
  label.textContent = "Checklist";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const addButton = document.createElement("button");
  addButton.textContent = "Add a new subtask";
  inputContainer.appendChild(addButton);

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const subtaskContainer = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    subtaskContainer.appendChild(checkbox);

    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.placeholder = "Subtask";
    inputBox.classList.add("input-box");
    subtaskContainer.appendChild(inputBox);

    inputContainer.insertBefore(subtaskContainer, addButton);
  });

  return inputContainer;
}
