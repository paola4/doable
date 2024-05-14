function renderInstructions() {
  // Function to create and append elements
  function addInstructionSection(parent, containerId, title, instructions) {
    const container = document.createElement("div");
    container.id = containerId;

    // Create the section title
    const header = document.createElement("span");
    header.classList.add("section-title");
    header.textContent = title;
    container.appendChild(header);

    // Create and append each instruction step
    instructions.forEach((instruction) => {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = instruction;
      container.appendChild(paragraph);
    });

    // Append the section to the parent element
    parent.appendChild(container);
  }

  // Instructions for each section
  const instructions = [
    {
      id: "intro",
      title: "Getting Started with Doable",
      content: [
        "Doable is designed to help you keep your tasks organized and your day on track. Here’s how to use some of our key features:",
      ],
    },
    {
      id: "add-category",
      title: "Adding a New Task Category",
      content: [
        "Open the Doable app.",
        'Tap on "Add New Category" at the top or bottom of your screen.',
        "Enter a name for your new category (like Work, Home, Fitness) and choose a color if desired.",
        'Press "Save" to create your category.',
      ],
    },
    {
      id: "manage-tasks",
      title: "Managing Tasks",
      content: [
        "<strong>To Add a Task:</strong>",
        "Select the category under which you want to add a task.",
        'Tap on "Add Task," then type in your task details.',
        'Set a deadline and priority if needed, then hit "Save".',
        "<strong>To Delete a Task:</strong>",
        "Navigate to the task you wish to remove.",
        'Tap on the task, then select "Delete."',
        "Confirm your choice to remove the task permanently.",
        "<strong>To Mark a Task as Complete:</strong>",
        "Find the task in your list.",
        "Check the box next to the task name to mark it as completed.",
        "<strong>To Edit a Task:</strong>",
        "Select the task card you want to edit.",
        "Make any changes to the task details.",
        'Tap "Save" to update the task information.',
      ],
    },
  ];

  // Create the sections
  const parent = document.createElement("div");
  parent.classList.add("app-instructions");
  instructions.forEach((section) => {
    addInstructionSection(parent, section.id, section.title, section.content);
  });
  return parent;
}
export default renderInstructions;
