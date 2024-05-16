import landing from "./landing.js";
import navBar from "./navBar.js";
import "./styles/mainView.css";

function mainView() {
  initiateToDo();

  const mainView = document.createElement("div");
  mainView.classList.add("main-view");
  // mainView.appendChild(navBar());
  const page = document.createElement("div");
  page.classList.add("category-page");
  page.appendChild(getGreeting());
  page.appendChild(landing(getUserName()));

  mainView.appendChild(page);

  return mainView;
}
export default mainView;

function getGreeting() {
  const name = getUserName();
  const greeting = document.createElement("span");
  greeting.classList.add("greeting");
  if (!name) {
    return greeting;
  }

  const icon = document.createElement("i");
  icon.classList.add("ph-thin", "ph-hand-waving", "greeting-icon");
  const greetingText = document.createElement("span");
  greetingText.textContent = `Hello, ${name}!`;
  greeting.appendChild(icon);
  greeting.appendChild(greetingText);

  return greeting;
}

function initiateToDo() {
  promptUserName();
  getUserName();
}

function promptUserName() {
  // If there is nothing already in local storage, prompt the user for their name and store it in local storage
  if (!localStorage.getItem("userName")) {
    console.log("No user name found");
    renderWelcomeModal();
  }
}

function setUserName(name) {
  // If the user does not enter a name, set a default name
  if (!name.trim()) {
    name = "User";
  }
  localStorage.setItem("userName", name);
}

function getUserName() {
  if (localStorage.getItem("userName")) {
    return localStorage.getItem("userName");
  }
}

function renderWelcomeModal() {
  // Render a modal to prompt the user for their name
  const modal = document.createElement("div");
  modal.classList.add("welcome-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const h2 = document.createElement("h2");
  h2.textContent = "Welcome to Doable: Your task helper!";
  modalContent.appendChild(h2);

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "What's your name?";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement("input");
  inputBox.type = "text";
  inputBox.placeholder = "My name is ... ";
  inputBox.classList.add("input-box");
  inputContainer.appendChild(inputBox);

  modalContent.appendChild(inputContainer);

  const addButton = document.createElement("button");
  addButton.classList.add("add-category", "tertiary");
  addButton.textContent = "Let's Go!";
  modalContent.appendChild(addButton);

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  // Function to handle the submission
  function handleSubmit() {
    const name = inputBox.value;
    setUserName(name);
    modal.style.display = "none";
    updateGreeting();
    document.querySelector(".category-page").appendChild(displayIntructions());
  }

  // Add event listener for 'click' event on the 'Add' button
  addButton.addEventListener("click", handleSubmit);

  // Add event listener for 'keydown' event on the input box
  inputBox.addEventListener("keydown", function (event) {
    // Check if 'Enter' key was pressed
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  });
}

function updateGreeting() {
  const greeting = document.querySelector(".greeting");
  const name = getUserName();
  greeting.innerHTML = `
    Hello, ${name}!
    <i class="ph-thin ph-hand-waving"></i>`;
}

function displayIntructions() {
  const instructions = document.createElement("div");
  instructions.classList.add("instructions");
  if (!getUserName()) {
    return instructions;
  }
  instructions.innerHTML = `
    <h3>Instructions</h3>
    <p>Click on "+ Add Category" to create your first category. </p>
    <p>Click on "+ Add Task" to add a task to a category.</p>
    <p>Click on the checkbox to mark a task as complete.</p>`;
  return instructions;
}
