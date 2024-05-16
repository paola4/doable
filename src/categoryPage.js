// Description: This file contains the logic for rendering the category page.

// TODO
// If they select 'Edit Task' button, open the task modal with the task details
import "./styles/category.css";

import {
  createElementWithClass,
  createElement,
  createElementWithContent,
} from "./helpers.js";

import createTaskCard from "./taskCard.js";
import renderTaskModal from "./taskModal.js";
import editCategoryModal from "./editCategoryModal.js";
import { renderTasks, renderTaskFullView } from "./tasksHelper.js";

function handleAddTaskButtonClick(category) {
  console.log("Add Task Button Clicked");
  const modal = renderTaskModal(category);
}

function handleTaskClick(category, e) {
  if (e.target.closest("input[type='checkbox']")) {
    return;
  }

  const taskCard = e.target.closest(".task-card");
  if (taskCard) {
    console.log("Task Card Clicked");
    const task = category.tasks.find(
      (t) => t.title === taskCard.querySelector("h3").textContent
    );
    renderTaskFullView(task, category);
  }
}

function categoryPage(category) {
  const page = createElement("div", { className: "category-page" });

  const heading = createElement("div", { className: "category-heading" }, page);

  const categoryHeadingGroup = createElement(
    "div",
    { className: "category-heading-group" },
    heading
  );

  const categoryHeadingTitle = createElement(
    "div",
    { className: "category-heading-title" },
    categoryHeadingGroup
  );

  const icon = createElement(
    "span",
    { innerHTML: category.icon },
    categoryHeadingTitle
  );

  const h2 = createElement(
    "h2",
    { textContent: category.name },
    categoryHeadingTitle
  );

  const editIcon = createElement(
    "button",
    { innerHTML: `<i class="ph-bold ph-pencil"></i>&nbsp;Edit` },
    categoryHeadingGroup
  );

  editIcon.addEventListener("click", () =>
    handleEditCategoryClick(category, h2)
  );

  const addTaskButton = createElement(
    "button",
    {
      className: "add-task",
      innerHTML: `<i class="ph-bold ph-plus"></i>&nbsp;Add Task`,
    },
    heading
  );
  // addTaskButton.classList.add("tertiary");

  addTaskButton.addEventListener("click", () =>
    handleAddTaskButtonClick(category)
  );

  const tasks = renderTasks(category);
  tasks.addEventListener("click", (e) => handleTaskClick(category, e));

  page.appendChild(tasks);
  return page;
}

export default categoryPage;

function handleEditCategoryClick(category, h2) {
  const modal = editCategoryModal(
    document.body,
    category,
    (updatedCategory) => {
      h2.textContent = updatedCategory.name;
    }
  );
  document.querySelector(".main-view").appendChild(modal);
}
