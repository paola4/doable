// TO DO:
// [X] The app is made up of a main view, with a left sidebar. There is a header at the top of the page.
// [X] The main view is where the user will see the existing todo tasks for the selected category that they have previously created.
// [X] The left sidebar is where the user can see the different categories that they have created.
// [X] The user can switch between categories by clicking on them.
// [X] The user can add a new category by clicking the "+" button, in the sidebar
// [ ] The user can delete a category by hovering on each category and clicking the "x" button
// [X] The user can add a new todo task by clicking the "+" button in the main view
// [X] The user can delete a todo task by clicking the "x" button on each todo task
// [X] The user can mark a todo task as complete by clicking the checkbox on each todo task
// [X] The user can see the full version of the task (all details) by clicking on the task card
// [ ] The user can edit a todo task by clicking on the text of the todo task

import "./styles/main.css";
import { renderApp } from "./app";

document.addEventListener("DOMContentLoaded", renderApp);
