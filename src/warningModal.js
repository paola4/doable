import iconSVG from "./public/x-circle.svg";

export function showModal(message) {
  const modal = document.createElement("div");
  modal.classList.add("warning-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("warning-modal-content");

  const xIcon = document.createElement("div");
  xIcon.classList.add("warning-modal-x");
  xIcon.innerHTML = '<i class="ph ph-x"></i>';
  xIcon.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  const modalHeaderIcon = document.createElement("div");
  modalHeaderIcon.classList.add("warning-modal-header-icon");
  modalHeaderIcon.innerHTML = iconSVG;

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("warning-modal-text");

  const modalHeaderText = document.createElement("p");
  modalHeaderText.classList.add("title");
  modalHeaderText.textContent = "Error";
  modalHeader.appendChild(modalHeaderText);

  const modalMessage = document.createElement("p");
  modalMessage.textContent = message;
  modalHeader.appendChild(modalMessage);

  const closeButton = document.createElement("button");
  closeButton.classList.add("button1");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  modalContent.appendChild(xIcon);
  modalContent.appendChild(modalHeaderIcon);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}
