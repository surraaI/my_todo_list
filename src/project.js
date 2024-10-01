class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskTitle) {
        this.tasks = this.tasks.filter(task => task.title !== taskTitle);
    }

    getTasks() {
        return this.tasks;
    }

    getProgress() {
        const completedTasks = this.tasks.filter(task => task.completed).length;
        return `Completed ${completedTasks} out of ${this.tasks.length} tasks`;
    }
}

export default Project;