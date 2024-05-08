// This is a menu with the different "to do" categories that the user created
// It is displayed on the left side of the screen
// It should be initiated with a single category "General" until the user adds their own additional ones
// The user can add a new category by clicking the "+" button
// The user can delete a category by hovering on each category and clicking the "x" button
// The user can switch between categories by clicking on them

import { add } from "lodash";
import renderModal from "./categoryModal";
import categoryPage from "./categoryPage";

function leftMenu() {
  const leftMenu = document.createElement("div");
  leftMenu.classList.add("left-menu");

  // Display Heading
  const heading = document.createElement("span");
  heading.classList.add("categories-heading");
  heading.textContent = "Categories";
  leftMenu.appendChild(heading);

  // Display categories
  const categories = document.createElement("div");

  // On first load only, create a default category called "General"
  if (loadCategories().length === 0) {
    const general = createCategory("General");
    general.icon = "📝";
    general.color = "rgb(255, 255, 255)";

    const categories = loadCategories();
    categories.push(general);
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  displayCategories(categories);
  leftMenu.appendChild(categories);

  // Display Add Category Button
  const addCategory = document.createElement("button");
  addCategory.classList.add("add-category");
  addCategory.textContent = "+";
  leftMenu.appendChild(addCategory);

  addNewCategory(addCategory, categories);
  checkCategoryClick(categories);
  // CHeck if a category has been clicked, and if so, display the tasks for that category in the main view
  //   categories.addEventListener("click", (e) => {
  //     const category = e.target.closest(".category");
  //     if (category) {
  //       console.log("Category clicked", category.textContent);
  //     }
  //   });

  return leftMenu;
}
export default leftMenu;

function checkCategoryClick(categories) {
  categories.addEventListener("click", (e) => {
    const category = e.target.closest(".category");
    if (category) {
      console.log("Category clicked", category.textContent);

      const mainView = document.querySelector(".main-view");
      mainView.innerHTML = "";
      // Get the category object from local storage, where the object's 'name' matches the current category id
      const categoryObject = loadCategories().find(
        (cat) => cat.name === category.id
      );
      console.log(categoryObject);
      const page = categoryPage(categoryObject);
      mainView.appendChild(page);
    }
  });
}

function addNewCategory(addButton, parent) {
  const addCategory = document.querySelector(".add-category");
  addButton.addEventListener("click", () => {
    console.log("Add new category");
    const modal = addCategoryModal(parent);
    document.body.appendChild(modal);
  });
}

// Display a modal to add a new category
// Users enter a name, and select an icon and color for the new category
function addCategoryModal(parent) {
  const modal = renderModal();

  const closeButton = modal.querySelector(".close");
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
// Display categories from local storage
function displayCategories(parent) {
  loadCategories().forEach((category) => {
    parent.appendChild(
      getCategory(category.name, category.icon, category.color)
    );
  });
}

// Load categories from local storage
function loadCategories() {
  const categories = JSON.parse(localStorage.getItem("categories"));
  if (categories) {
    return categories;
  }
  console.log(categories);
  return [];
}

// Create a new category
function getCategory(name, icon, color) {
  const category = document.createElement("div");
  category.classList.add("category");
  category.id = name;
  const categoryIcon = document.createElement("span");
  categoryIcon.innerHTML = icon;
  category.appendChild(categoryIcon);

  const categoryName = document.createElement("span");
  categoryName.textContent = name;
  category.appendChild(categoryName);
  return category;
}

// Create a new category object with a name, array of todo tasks, icon and color
function createCategory(name) {
  return {
    name,
    tasks: [],
    icon: "",
    color: "",
  };
}
