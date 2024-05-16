function appendChildren(parent, children) {
  children.forEach((child) => parent.appendChild(child));
}

// DOM manipulation helper functions
function createElementWithClass(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

// function createElement(tagName, options = {}, parent) {
//   const element = document.createElement(tagName);
//   if (options.class) {
//     element.classList.add(options.class);
//   }
//   Object.assign(element, options);
//   if (parent) {
//     parent.appendChild(element);
//   }
//   return element;
// }

function createElement(tagName, options = {}, parent) {
  const element = document.createElement(tagName);
  if (options.class) {
    element.classList.add(...options.class.split(" "));
    delete options.class;
  }
  Object.assign(element, options);
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}

function createInputContainer(labelText, inputElement) {
  const inputContainer = createElement("div", { class: "input-container" });
  const label = createElement("label", {
    class: "input-label",
    textContent: labelText,
  });
  inputContainer.append(label, inputElement);
  return inputContainer;
}

function createElementWithContent(
  tag,
  content,
  parent,
  className = null,
  isHTML = false
) {
  const element = document.createElement(tag);
  if (isHTML) {
    element.innerHTML = content;
  } else {
    element.textContent = content;
  }
  if (className) element.classList.add(className);
  parent.appendChild(element);
  return element;
}

function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("taskModal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modal.appendChild(modalContent);

  return { modal, modalContent };
}

export {
  appendChildren,
  createElementWithClass,
  createElement,
  createElementWithContent,
  createModal,
  createInputContainer,
};
