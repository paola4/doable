import "./styles/main.css";
import _ from "lodash";
import mainView from "./mainView";
import leftMenu from "./leftMenu";

// This app is made up of a main view, with a left sidebar.
// The main view is where the user will see the existing todo tasks for the selected category that they have previously created.
// The left sidebar is where the user can see the different categories that they have created.
// The user can switch between categories by clicking on them.
// The user can add a new category by clicking the "+" button, in the sidebar
// The user can delete a category by hovering on each category and clicking the "x" button
// The user can add a new todo task by clicking the "+" button in the main view
// The user can delete a todo task by clicking the "x" button on each todo task
// The user can mark a todo task as complete by clicking the checkbox on each todo task
// The user can edit a todo task by clicking on the text of the todo task

renderContent();

function renderContent() {
  const content = document.getElementById("content");
  content.appendChild(app());
}

function app() {
  const app = document.createElement("div");
  app.classList.add("app");
  app.appendChild(leftMenu());
  app.appendChild(mainView());
  return app;
}
