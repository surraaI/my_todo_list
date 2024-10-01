class Task {
    constructor(title, description, dueDate, priority = null, project = null) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.completed = false;
        this.priority = priority;
        this.project = project;
        this.steps = [];
    }

    addStep(step) {
        this.steps.push(step);
    }

    markAsCompleted() {
        this.completed = true;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    updateDescription(newDescription) {
        this.description = newDescription;
    }

    updateDueDate(newDueDate) {
        this.dueDate = new Date(newDueDate);
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    updateProject(newProject) {
        this.project = newProject;
    }
}

export default Task;