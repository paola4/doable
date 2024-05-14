function landing(username) {
  const instructions = document.createElement("div");
  instructions.classList.add("instructions");
  if (!username) {
    return instructions;
  }
  instructions.innerHTML = `
    <p>Access your tasks and let's get started.</p>`;
  return instructions;
}
export default landing;
