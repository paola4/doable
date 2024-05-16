import { appendChildren } from "./helpers.js";
import landing from "./landing.js";

function successfulCategoryDeletion() {
  const mainView = document.querySelector(".main-view");
  const modal = document.createElement("div");
  modal.classList.add("categoryModal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content", "delete-category-success");

  const close = document.createElement("div");
  close.classList.add("close-button");
  close.innerHTML = "<i class='ph-bold ph-x'></i>";

  const h2 = document.createElement("h2");
  h2.textContent = "Category Deleted";

  const p = document.createElement("p");
  p.textContent = "The category has been successfully deleted.";

  const okButton = document.createElement("button");
  okButton.classList.add("ok");
  okButton.textContent = "OK";

  appendChildren(modalContent, [close, h2, p, okButton]);

  modal.appendChild(modalContent);

  handleOK(okButton, mainView, modal);
  handleClose(close, mainView, modal);

  return modal;
}
export default successfulCategoryDeletion;

function handleOK(button, parent, modal) {
  button.addEventListener("click", () => {
    showLanding(parent);
    closeModal(modal);
  });
}

function handleClose(button, parent, modal) {
  button.addEventListener("click", () => {
    showLanding(parent);
    closeModal(modal);
  });
}

function closeModal(modal) {
  modal.remove();
}

function showLanding(parent) {
  parent.innerHTML = "";
  parent.appendChild(landing());
}
