// Description: This file contains the code for the left menu, which displays the categories and allows users to add new categories.

import "./styles/leftMenu.css";

import addCategoryModal from "./categoryModal";
import categoryPage from "./categoryPage";
import renderInstructions from "./instructions";
import {
  displayCategories,
  getCategory,
  loadCategories,
  createCategory,
} from "./categoryManager";

function leftMenu() {
  const userName = localStorage.getItem("userName") || "User";
  const menu = document.createElement("div");
  menu.classList.add("menu");
  const menuHeader = document.createElement("div");
  menuHeader.classList.add("menu-header");
  menuHeader.innerHTML = `
        <div class="logo">
        <i class="ph-bold ph-check-square"></i>
        <span>Doable</span>
    </div>
    `;
  const leftMenu = document.createElement("div");
  leftMenu.classList.add("left-menu");

  leftMenu.innerHTML = `
    <div class="top-menu">
      <span class="categories-heading">Categories</span>
      <div class="categories"></div>
      <button class="add-new-category "><i class="ph-bold ph-plus"></i>&nbsp;Add Category</button>
    </div>
  `;

  const userBanner = document.createElement("div");
  userBanner.classList.add("user-banner");
  userBanner.innerHTML = `
        <i class="ph-light ph-user-circle user-icon"></i>
        <span>${userName}'s Dashboard</span>`;

  menu.appendChild(menuHeader);
  menu.appendChild(leftMenu);
  menu.appendChild(userBanner);

  const categoriesDiv = leftMenu.querySelector(".categories");
  categoriesDiv.id = "categories";
  const addCategoryButton = leftMenu.querySelector(".add-new-category");
  const instructionsLink = leftMenu.querySelector(".link");

  displayCategories(categoriesDiv);
  addNewCategory(addCategoryButton, categoriesDiv);
  checkCategoryClick(categoriesDiv);

  return menu;
}
export default leftMenu;

function createLogo() {
  const logo = document.createElement("div");
  logo.classList.add("logo");
  const logoIcon = document.createElement("i");
  logoIcon.classList.add("ph-bold", "ph-check-square");
  logo.appendChild(logoIcon);
  const logoText = document.createElement("span");
  logoText.textContent = "Doable";
  logo.appendChild(logoText);
  return logo;
}
function checkCategoryClick(categories) {
  categories.addEventListener("click", (e) => {
    const category = e.target.closest(".category");
    if (category) {
      // Remove the 'category-selected' class from all categories
      const allCategories = categories.querySelectorAll(".category");
      allCategories.forEach((cat) => cat.classList.remove("category-selected"));

      // Add the 'category-selected' class to the clicked category
      category.classList.add("category-selected");

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
    document.querySelector(".main-view").appendChild(modal);
  });
}
