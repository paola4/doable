// Create a single page view for each category object
// It should include the category name at the top
// Followed by the list of tasks

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
    const priority = document.querySelector("#priority").value;
    const notes = document.querySelector("#notes").value;
    const checklist = document.querySelector("#checklist").value;

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
  inputBox.type = "text";
  inputBox.placeholder = "Set Date";
  inputBox.classList.add("input-box");
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
  inputBox.type = "text";
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

  const inputBox = document.createElement("input");
  inputBox.id = "priority";
  inputBox.type = "text";
  inputBox.placeholder = "Priority";
  inputBox.classList.add("input-box");
  inputContainer.appendChild(inputBox);

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

  const label = document.createElement("label");
  label.textContent = "Checklist";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement("input");
  inputBox.id = "checklist";
  inputBox.type = "text";
  inputBox.placeholder = "Checklist";
  inputBox.classList.add("input-box");
  inputContainer.appendChild(inputBox);

  return inputContainer;
}
