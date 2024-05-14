// Handles structure and initialization of main application layout

import navBar from "./navBar";
import leftMenu from "./leftMenu";
import mainView from "./mainView";

export function renderApp() {
  const content = document.getElementById("content");
  const appElement = document.createElement("div");
  appElement.classList.add("app");
  appElement.appendChild(createMainArea());

  content.appendChild(appElement);
}

function createMainArea() {
  const mainArea = document.createElement("div");
  mainArea.classList.add("app-content");
  mainArea.appendChild(leftMenu());
  mainArea.appendChild(mainView());

  return mainArea;
}
