// Creates a navigation bar
// This is a functional component
// It returns a navigation bar element

function navBar() {
  const nav = document.createElement("nav");
  nav.classList.add("nav");

  //   const logo = document.createElement("div");
  //   logo.classList.add("logo");
  //   const logoIcon = document.createElement("i");
  //   logoIcon.classList.add("ph-bold", "ph-check-square");
  //   logo.appendChild(logoIcon);
  //   const logoText = document.createElement("span");
  //   logoText.textContent = "Doable";
  //   logo.appendChild(logoText);

  //   nav.appendChild(logo);

  const links = document.createElement("div");
  links.classList.add("links");

  const home = document.createElement("span");
  home.innerHTML = `<a href="./">Home</a>`;
  links.appendChild(home);

  const about = document.createElement("span");
  about.textContent = "About";
  links.appendChild(about);

  const contact = document.createElement("span");
  contact.textContent = "Contact";
  links.appendChild(contact);

  nav.appendChild(links);

  return nav;
}
export default navBar;
