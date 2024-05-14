function promptUserName() {
  const userName = localStorage.getItem("userName");
  if (!userName) {
    renderWelcomeModal();
  }
}

function getUserName() {
  return localStorage.getItem("userName") || "Guest";
}

function setUserName(name) {
  localStorage.setItem("userName", name);
}

function renderWelcomeModal() {
  const modal = document.createElement("div");
  modal.classList.add("welcome-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.appendChild(modalContent);

  const h2 = document.createElement("h2");
  h2.textContent = "Welcome to Doable!";
  modalContent.appendChild(h2);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your name";
  modalContent.appendChild(input);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => {
    setUserName(input.value);
    modal.style.display = "none";
    updateGreeting();
  });
  modalContent.appendChild(saveButton);

  document.body.appendChild(modal);
}

function updateGreeting() {
  const greetingElement = document.querySelector(".greeting");
  if (greetingElement) {
    greetingElement.textContent = `Hello, ${getUserName()}!`;
  }
}

function initiateToDo() {
  promptUserName();
  updateGreeting();
}

export { getUserName, initiateToDo };
