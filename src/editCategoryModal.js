import { createElement, appendChildren, createInputContainer } from "./helpers";
import { createPicker } from "picmo";
import iro from "@jaames/iro";
import { displayCategories, loadCategories } from "./categoryManager";
import { getCategory } from "./categoryManager";
import landing from "./landing";
import successfulCategoryDeletion from "./successfulCategoryDeletion";

function editCategoryModal(parent, category, onCategoryUpdated) {
  const modal = renderEditModal(category);

  const closeButton = modal.querySelector(".close");
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
      handleEditCategory(modal, parent, category);
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

  const close = document.createElement("span");
  close.classList.add("close");
  close.innerHTML = "&times;";

  const h2 = document.createElement("h2");
  h2.textContent = "Edit Category";

  const nameInput = createInputContainer(
    "Category Name",
    createNameInput(category.name)
  );
  const iconInput = createInputContainer(
    "Icon",
    createIconInput(category.icon)
  );
  const colorInput = createInputContainer(
    "Color",
    createColorInput(category.color)
  );

  const editButton = document.createElement("button");
  editButton.classList.add("edit-category");
  editButton.textContent = "Edit Category";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-category");
  deleteButton.textContent = "Delete Category";

  appendChildren(modalContent, [
    close,
    h2,
    nameInput,
    iconInput,
    colorInput,
    editButton,
    deleteButton,
  ]);

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

  const label = document.createElement("label");
  label.textContent = "Icon";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

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

function createColorInput(initialValue) {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const label = document.createElement("label");
  label.textContent = "Color";
  label.classList.add("input-label");
  inputContainer.appendChild(label);

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
