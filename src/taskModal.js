import { createTask } from "./task";
import { updateLocalStorage } from "./categoryManager.js";
import { renderSingleTask } from "./tasksHelper.js";
import { createElementWithContent, createModal } from "./helpers.js";

function createInputFields(modalContent) {
  createElementWithContent("h2", "Add Task", modalContent);

  modalContent.appendChild(createTitleInput());
  modalContent.appendChild(createSetDateInput());
  modalContent.appendChild(createDescriptionInput());
  modalContent.appendChild(createDueDateInput());
  modalContent.appendChild(createPriorityInput());
  modalContent.appendChild(createNotesInput());
  modalContent.appendChild(createChecklistInput());
}

function handleAddTaskButtonClick(addButton, modal, category) {
  addButton.addEventListener("click", () => {
    const task = createTaskFromInputFields();
    category.tasks.push(task);
    updateLocalStorage(category);
    renderSingleTask(task, category);
    modal.remove();
  });
}

function createTaskFromInputFields() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const setDate = document.querySelector("#set-date").value;
  const dueDate = document.querySelector("#due-date").value;
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  const notes = document.querySelector("#notes").value;
  const checklistItems = document.querySelectorAll(
    ".subtask-container textarea"
  );
  const checklist = Array.from(checklistItems).map((item) => item.value);

  const task = createTask(title);
  task.description = description;
  task.setDate = setDate;
  task.dueDate = dueDate;
  task.priority = priority;
  task.notes = notes;
  task.checklist = checklist;

  return task;
}

function renderTaskModal(category) {
  const { modal, modalContent } = createModal();

  const closeAddTask = createElementWithContent(
    "span",
    "&times;",
    modalContent,
    "close-add-task",
    true
  );
  closeAddTask.addEventListener("click", () => modal.remove());

  createInputFields(modalContent);

  const addButton = createElementWithContent(
    "button",
    "Add Task",
    modalContent,
    "add-task"
  );
  handleAddTaskButtonClick(addButton, modal, category);

  document.querySelector(".main-view").appendChild(modal);

  return modal;
}

export default renderTaskModal;

function createInputContainer(
  labelText,
  inputType,
  inputId,
  placeholder,
  rows = null,
  value = null
) {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = labelText;
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement(
    inputType === "textarea" ? "textarea" : "input"
  );
  inputBox.id = inputId;
  if (inputType !== "textarea") inputBox.type = inputType;
  inputBox.placeholder = placeholder;
  inputBox.classList.add("input-box");
  if (rows) inputBox.rows = rows;
  if (value) inputBox.value = value;
  inputContainer.appendChild(inputBox);

  return inputContainer;
}

function createTitleInput() {
  return createInputContainer("Title", "text", "title", "Title");
}

function createDescriptionInput() {
  return createInputContainer(
    "Description",
    "textarea",
    "description",
    "Description",
    4
  );
}

function createSetDateInput() {
  // Get current date
  const currentDate = new Date();

  // Format date to "yyyy-mm-dd"
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with 0 if necessary
  const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with 0 if necessary

  // Set the default value of the date input to the current date
  const defaultValue = `${year}-${month}-${day}`;

  return createInputContainer(
    "Set Date",
    "date",
    "set-date",
    "Set Date",
    null,
    defaultValue
  );
}
function createDueDateInput() {
  return createInputContainer("Due Date", "date", "due-date", "Due Date");
}

function createPriorityInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  inputContainer.id = "priority";

  const label = document.createElement("h4");
  label.textContent = "Priority";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const priorities = ["1", "2", "3", "4"];
  priorities.forEach((priority) => {
    const label = document.createElement("label");
    label.textContent = priority;
    label.classList.add("radio-label");

    const input = document.createElement("input");
    input.id = priority;
    input.type = "radio";
    input.name = "priority";
    input.value = priority;

    if (priority === "2") {
      input.checked = true;
    }

    label.appendChild(input);

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

  const inputBox = document.createElement("textarea");
  inputBox.id = "notes";
  inputBox.rows = 4;
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
    subtaskContainer.classList.add("subtask-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    subtaskContainer.appendChild(checkbox);

    const inputBox = document.createElement("textarea");
    inputBox.placeholder = "Subtask";
    inputBox.rows = 1;
    const limit = 100;
    inputBox.oninput = function () {
      inputBox.style.height = "";
      inputBox.style.height = Math.min(inputBox.scrollHeight, limit) + "px";
    };
    inputBox.classList.add("input-box");
    subtaskContainer.appendChild(inputBox);

    inputContainer.insertBefore(subtaskContainer, addButton);
  });

  return inputContainer;
}
