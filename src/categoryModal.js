import "./styles/categoryModal.css";
import { createPicker } from "picmo";
import iro from "@jaames/iro";
import { initial } from "lodash";
import { getCategory, createCategory, loadCategories } from "./categoryManager";
import { createInputContainer } from "./helpers";

function createElement(tag, className, properties = {}) {
  const element = document.createElement(tag);
  element.classList.add(className);
  Object.assign(element, properties);
  return element;
}

function appendChildren(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}
// Display a modal to add a new category
// Users enter a name, and select an icon and color for the new category
function addCategoryModal(parent) {
  const modal = renderModal();

  const closeButton = modal.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const addCategoryButton = modal.querySelector(".add-category");
  const categoryInput = modal.querySelector(
    "input[placeholder='Category Name']"
  );

  // On click or enter, create a new category object and save it to local storage
  categoryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleAddCategory(modal, parent);
    }
  });

  addCategoryButton.addEventListener("click", () => {
    handleAddCategory(modal, parent);
  });

  return modal;
}

function handleAddCategory(modal, parent) {
  const name = modal.querySelector("input[placeholder='Category Name']").value;
  const icon = modal.querySelector(".emoji-root").innerHTML.toString();
  const color = modal
    .querySelector(".current-color")
    .style.backgroundColor.toString();

  console.log("New Category", name, icon, color);
  const newCategory = createCategory(name);
  newCategory.icon = icon;
  newCategory.color = color;

  if (newCategory) {
    const categories = loadCategories();
    categories.push(newCategory);
    localStorage.setItem("categories", JSON.stringify(categories));
    console.log(categories);
    parent.appendChild(
      getCategory(newCategory.name, newCategory.icon, newCategory.color)
    );
    modal.style.display = "none";
  }

  return modal;
}

function renderModal() {
  console.log("In the modal");

  const modal = document.createElement("div");
  modal.classList.add("categoryModal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const close = document.createElement("div");
  close.classList.add("close-button");
  close.innerHTML = "<i class='ph-bold ph-x'></i>";

  const h2 = document.createElement("h2");
  h2.textContent = "Add Category";

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("add-category-modal-inputs");
  const nameInput = createInputContainer("Category Name", createNameInput());
  nameInput.classList.add("category-name-input");
  const iconInput = createInputContainer("Icon", createIconInput());
  iconInput.classList.add("category-icon-input");
  const colorInput = createInputContainer("Color", createColorInput());
  colorInput.classList.add("category-color-input");
  inputContainer.append(nameInput, iconInput, colorInput);

  const addButton = document.createElement("button");
  addButton.classList.add("add-category", "primary");
  addButton.textContent = "Add Category";

  appendChildren(modalContent, [close, h2, inputContainer, addButton]);

  modal.appendChild(modalContent);

  return modal;
}
export default addCategoryModal;

function createNameInput() {
  return createElement("input", "input-box", {
    type: "text",
    placeholder: "Category Name",
  });
}

function createIconInput() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

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
