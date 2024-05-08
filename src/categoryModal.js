import { createPicker } from "picmo";
import iro from "@jaames/iro";
import { initial } from "lodash";

function renderModal() {
  console.log("In the modal");

  const modal = document.createElement("div");
  modal.classList.add("categoryModal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const close = document.createElement("span");
  close.classList.add("close");
  close.innerHTML = "&times;";

  modalContent.appendChild(close);
  const h2 = document.createElement("h2");
  h2.textContent = "Add Category";
  modalContent.appendChild(h2);

  modalContent.appendChild(createNameInput());
  modalContent.appendChild(createIconInput());
  modalContent.appendChild(createColorInput());

  const addButton = document.createElement("button");
  addButton.classList.add("add-category");
  addButton.textContent = "Add Category";
  modalContent.appendChild(addButton);

  modal.appendChild(modalContent);

  return modal;
}
export default renderModal;

function createNameInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Category Name";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const inputBox = document.createElement("input");
  inputBox.type = "text";
  inputBox.placeholder = "Category Name";
  inputBox.classList.add("input-box");
  inputContainer.appendChild(inputBox);

  return inputContainer;
}

function createIconInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Icon";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const emojiRoot = document.createElement("div");
  emojiRoot.classList.add("emoji-root");
  emojiRoot.innerHTML = "🙂";
  emojiRoot.style.cursor = "pointer";

  emojiRoot.addEventListener("click", () => {
    emojiPicker(emojiRoot);
  });

  inputContainer.appendChild(emojiRoot);
  return inputContainer;
}

function emojiPicker(emojiRoot) {
  const rootElement = document.createElement("div");
  rootElement.classList.add("emoji-picker");
  document.body.appendChild(rootElement);
  const picker = createPicker({ rootElement });

  let emoji = "";
  picker.addEventListener("emoji:select", (event) => {
    emoji = event.emoji;
    console.log("Emoji selected:", emoji);
    if (emoji) {
      rootElement.style.display = "none";
      emojiRoot.innerHTML = emoji.toString();
    }
  });
}

function createColorInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Color";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

  const currentColor = document.createElement("div");
  currentColor.classList.add("current-color");
  currentColor.style.backgroundColor = "#f00";

  // On click, show color picker
  currentColor.addEventListener("click", () => {
    let initialColor = currentColor.style.backgroundColor;
    colorPickerModal(currentColor, initialColor);
    console.log("Still good");
  });

  inputContainer.appendChild(currentColor);
  return inputContainer;
}

function colorPickerModal(currentColorElement, initialColor) {
  const colorPickerModal = document.createElement("div");
  colorPickerModal.classList.add("color-picker-modal");

  const closeButton = document.createElement("span");
  closeButton.classList.add("close");
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", () => {
    colorPickerModal.style.display = "none";
  });
  colorPickerModal.appendChild(closeButton);

  const colorPickerContainer = document.createElement("div");
  let colorPicker = new iro.ColorPicker(colorPickerContainer, {
    width: 150,
    color: initialColor,
  });

  colorPicker.on("color:change", (color) => {
    console.log("Color changed:", color.hexString);
    initialColor = color.hexString;
    currentColorElement.style.backgroundColor = color.hexString;
  });

  colorPickerModal.appendChild(colorPickerContainer);
  const submitButton = document.createElement("button");
  submitButton.textContent = "Select";
  submitButton.addEventListener("click", () => {
    colorPickerModal.style.display = "none";
  });
  colorPickerModal.appendChild(submitButton);
  document.body.appendChild(colorPickerModal);
}
