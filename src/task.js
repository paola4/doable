function createTask(title) {
  return {
    title: title,
    description: "",
    setDate: "",
    dueDate: "",
    priority: "",
    notes: "",
    checklist: [],
    completeStatus: false,
  };
}

export { createTask };
