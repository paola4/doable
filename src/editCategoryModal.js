import { createElement, appendChildren, createInputContainer } from "./helpers";
import { createPicker } from "picmo";
import iro from "@jaames/iro";
import { displayCategories, loadCategories } from "./categoryManager";
import { getCategory } from "./categoryManager";
import landing from "./landing";
import successfulCategoryDeletion from "./successfulCategoryDeletion";
import "./styles/categoryModal.css";

function editCategoryModal(parent, category, onCategoryUpdated) {
  const modal = renderEditModal(category);

  const closeButton = modal.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const editCategoryButton = modal.querySelector(".edit-category");
  const deleteCategoryButton = modal.querySelector(".delete-category");
  const categoryInput = modal.querySelector(
    "input[placeholder='Category Name']"
  );

  // On click or enter, update the category object and save it to local storage
  categoryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleEditCategory(modal, parent, category, onCategoryUpdated);
    }
  });

  editCategoryButton.addEventListener("click", () => {
    handleEditCategory(modal, parent, category, onCategoryUpdated);
  });

  deleteCategoryButton.addEventListener("click", () => {
    handleDeleteCategory(modal, parent, category);
  });

  return modal;
}

function handleEditCategory(modal, parent, category, onCategoryUpdated) {
  const originalName = category.name;
  const name = modal.querySelector("input[placeholder='Category Name']").value;
  const icon = modal.querySelector(".emoji-root").innerHTML.toString();
  const color = modal
    .querySelector(".current-color")
    .style.backgroundColor.toString();

  console.log("Edit Category", name, icon, color);
  category.name = name;
  category.icon = icon;
  category.color = color;

  const categories = loadCategories();
  const index = categories.findIndex((c) => c.name === originalName);
  if (index !== -1) {
    categories[index] = category;
    localStorage.setItem("categories", JSON.stringify(categories));
    console.log(categories);
    const categoryElement = parent.querySelector(
      `.category[data-name="${originalName}"]`
    );
    if (categoryElement) {
      parent.replaceChild(
        getCategory(category.name, category.icon, category.color),
        categoryElement
      );
    }
    modal.style.display = "none";
    onCategoryUpdated(category); // Call the callback function with the updated category
  }

  return modal;
}

function handleDeleteCategory(modal, parent, category) {
  const categoriesDiv = document.getElementById("categories");
  const categories = loadCategories();
  const index = categories.findIndex((c) => c.name === category.name);
  if (index !== -1) {
    categories.splice(index, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    console.log(categories);
    const categoryElement = parent.querySelector(
      `.category[data-name="${category.name}"]`
    );
    if (categoryElement) {
      categoryElement.parentNode.removeChild(categoryElement);
    }
    modal.style.display = "none";
    categoriesDiv.innerHTML = "";
    displayCategories(categoriesDiv);
    const mainView = document.querySelector(".main-view");
    mainView.innerHTML = "";
    mainView.appendChild(landing());
    mainView.appendChild(successfulCategoryDeletion());
  }

  return modal;
}

function renderEditModal(category) {
  console.log("In the edit modal");

  const modal = document.createElement("div");
  modal.classList.add("categoryModal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const close = document.createElement("div");
  close.classList.add("close-button");
  close.innerHTML = "<i class='ph-bold ph-x'></i>";

  const h2 = document.createElement("h2");
  h2.textContent = "Edit Category";

  const nameInput = createInputContainer(
    "Category Name",
    createNameInput(category.name)
  );
  nameInput.classList.add("category-name-input");

  const iconInput = createInputContainer(
    "Icon",
    createIconInput(category.icon)
  );
  iconInput.classList.add("category-icon-input");

  const colorInput = createInputContainer(
    "Color",
    createColorInput(category.color)
  );
  colorInput.classList.add("category-color-input");

  const inputs = document.createElement("div");
  inputs.classList.add("add-category-modal-inputs");
  appendChildren(inputs, [nameInput, iconInput, colorInput]);

  const editButton = document.createElement("button");
  editButton.classList.add("edit-category", "primary");
  editButton.textContent = "Edit Category";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-category", "primary");
  deleteButton.textContent = "Delete Category";

  appendChildren(modalContent, [close, h2, inputs, editButton, deleteButton]);

  modal.appendChild(modalContent);

  return modal;
}

function createNameInput(initialValue) {
  return createElement("input", {
    class: "input-box",
    type: "text",
    placeholder: "Category Name",
    value: initialValue,
  });
}

function createIconInput(initialValue) {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const emojiRoot = document.createElement("div");
  emojiRoot.classList.add("emoji-root");
  emojiRoot.innerHTML = initialValue;
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

function createColorInput(initialValue) {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const currentColor = document.createElement("div");
  currentColor.classList.add("current-color");
  currentColor.style.backgroundColor = initialValue;

  // On click, show color picker
  currentColor.addEventListener("click", () => {
    let initialColor = currentColor.style.backgroundColor;
    colorPickerModal(currentColor, initialColor);
    console.log("Still good");
  });

  inputContainer.appendChild(currentColor);
  return inputContainer;
}

export default editCategoryModal;

function colorPickerModal(currentColorElement, initialColor) {
  const colorPickerModalWrapper = document.createElement("div");
  colorPickerModalWrapper.classList.add("color-picker-modal-wrapper");

  const colorPickerModal = document.createElement("div");
  colorPickerModal.classList.add("color-picker-modal");

  const close = document.createElement("div");
  close.classList.add("close-button");
  close.innerHTML = "<i class='ph-bold ph-x'></i>";

  close.addEventListener("click", () => {
    colorPickerModal.style.display = "none";
    colorPickerModalWrapper.style.display = "none";
  });
  colorPickerModal.appendChild(close);

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
    colorPickerModalWrapper.style.display = "none";
  });
  colorPickerModal.appendChild(submitButton);

  colorPickerModalWrapper.appendChild(colorPickerModal);
  document.body.appendChild(colorPickerModalWrapper);
}
