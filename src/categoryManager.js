// categoryManager.js
export function addCategory(name, color, icon) {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  categories.push({ name, color, icon, tasks: [] });
  localStorage.setItem("categories", JSON.stringify(categories));
}

export function loadCategories() {
  return JSON.parse(localStorage.getItem("categories")) || [];
}

export function updateLocalStorage(category) {
  const categories = loadCategories();
  const updatedCategories = categories.map((cat) => {
    if (cat.name === category.name) {
      return category;
    }
    return cat;
  });
  localStorage.setItem("categories", JSON.stringify(updatedCategories));
}

// Create a new category object with a name, array of todo tasks, icon and color
export function createCategory(name) {
  return {
    name,
    tasks: [],
    icon: "",
    color: "",
  };
}

// Create a new category
export function getCategory(name, icon, color) {
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

// Display categories from local storage
export function displayCategories(parent) {
  loadCategories().forEach((category) => {
    parent.appendChild(
      getCategory(category.name, category.icon, category.color)
    );
  });
}
