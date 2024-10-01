import { listProjects } from '../components/sidebar';

export const PROJECTS_KEY = 'projects';
export const TASKS_KEY = 'tasks';


// Load projects from local storage
export function loadProjects() {
    try {
        const projects = localStorage.getItem(PROJECTS_KEY);
        return projects ? JSON.parse(projects) : [];
    } catch (error) {
        console.error('Error loading projects from localStorage:', error);
        return [];
    }
}

// Save a new project to local storage
export function saveProject(project) {
    listProjects();
    try {
        let projects = loadProjects();
        if (!Array.isArray(projects)) {
            projects = [];
        }
        projects.push(project); // Add the new project
        const projectsString = JSON.stringify(projects);
        localStorage.setItem(PROJECTS_KEY, projectsString);
    } catch (error) {
        console.error('Error saving projects to localStorage:', error);
    }
}

// Update a specific project in local storage (e.g., when adding tasks)
export function updateProject(updatedProject) {
    try {
        let projects = loadProjects();
        const projectIndex = projects.findIndex(project => project.name === updatedProject.name);
        if (projectIndex !== -1) {
            projects[projectIndex] = updatedProject; // Update the project
            const projectsString = JSON.stringify(projects);
            localStorage.setItem(PROJECTS_KEY, projectsString);
        }
    } catch (error) {
        console.error('Error updating project in localStorage:', error);
    }
}

// Load tasks from local storage
export function loadTasks() {
    try {
        const tasks = localStorage.getItem(TASKS_KEY);
        return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        return []; // Return an empty array in case of error
    }
}

// Save a task globally (not linked to a specific project)
export function saveTask(task) {
    try {
        let tasks = loadTasks();
        if (!Array.isArray(tasks)) {
            tasks = [];
        }
        if (task.project) {
            saveTaskToProject(task, task.project);
        }
        tasks.push(task);
        const tasksString = JSON.stringify(tasks);
        localStorage.setItem(TASKS_KEY, tasksString);
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}

// Save task to a specific project
export function saveTaskToProject(task, projectName) {
    try {
        const projects = loadProjects();
        const project = projects.find(p => p.name === projectName);

        if (project) {

            if (!Array.isArray(project.tasks)) {
                project.tasks = [];
            }
            project.tasks.push(task); // Add the task to the project's tasks
            updateProject(project); // Save the updated project
        } else {
            console.error(`Project with name "${projectName}" not found.`);
        }
    } catch (error) {
        console.error(`Error saving task to project "${projectName}":`, error);
    }
}