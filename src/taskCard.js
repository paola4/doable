import { createElementWithClass, createElement } from "./helpers.js";
import { updateLocalStorage } from "./categoryManager.js";

function createTaskCard(task, category) {
  const taskCard = createElement("div", { className: "task-card" });

  const topRow = createElement("div", { className: "top-row" }, taskCard);
  const textContent = createElement(
    "div",
    { className: "text-content" },
    topRow
  );
  const title = createElement("h3", { textContent: task.title }, textContent);
  const description = createElement(
    "p",
    { textContent: task.description },
    textContent
  );

  const checkbox = createElement(
    "input",
    {
      className: "checkbox",
      type: "checkbox",
      checked: task.completeStatus,
    },
    topRow
  );

  checkbox.addEventListener("change", () => {
    task.completeStatus = !task.completeStatus;
    updateLocalStorage(category);
    statusText.textContent = task.completeStatus ? "Complete" : "Incomplete";
    status.className = "status-indicator"; // Reset classes
    status.classList.add(task.completeStatus ? "complete" : "incomplete");
  });

  topRow.appendChild(checkbox);
  taskCard.appendChild(topRow);

  const bottomRow = createElement("div", { className: "bottom-row" });
  const dueDate = createElement("p", { textContent: task.dueDate });
  bottomRow.appendChild(dueDate);

  const status = createElement("div", { className: "status-indicator" });
  const statusText = createElement("span", {
    textContent: task.completeStatus ? "Complete" : "Incomplete",
  });
  status.appendChild(statusText);

  if (task.completeStatus) {
    status.classList.add("complete");
  } else {
    status.classList.add("incomplete");
  }
  bottomRow.appendChild(status);

  taskCard.appendChild(bottomRow);

  return taskCard;
}

export default createTaskCard;
