function mainView() {
  const mainView = document.createElement("div");
  mainView.classList.add("main-view");

  const page = document.createElement("div");
  page.classList.add("category-page");
  page.appendChild(getGreeting("Jane"));

  const mainViewContent = document.createElement("div");
  mainViewContent.classList.add("main-view-content");
  page.appendChild(mainViewContent);

  mainView.appendChild(page);
  return mainView;
}
export default mainView;

function getGreeting(name) {
  const greeting = document.createElement("h2");
  greeting.classList.add("greeting");
  greeting.innerHTML = `
    Hello, ${name}!
    <i class="ph-thin ph-hand-waving"></i>`;
  return greeting;
}
