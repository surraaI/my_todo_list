import Task from '../task';
import { saveTask, loadProjects } from '../utils/localStorage';
import '../css/taskForm.css';
import { listProjects } from './sidebar';

export default function createTodoForm() {
    // Create form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    // Title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Task Title';
    titleInput.classList.add('input-field');

    // Description input
    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = 'Task Description';
    descriptionInput.classList.add('input-field', 'textarea');

    // Due date input
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.classList.add('input-field');

    // Priority input
    const priorityInput = document.createElement('select');
    const priorities = ['Low', 'Medium', 'High'];
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        priorityInput.appendChild(option);
    });
    priorityInput.classList.add('input-field');

    // Project dropdown
    const projectLabel = document.createElement('label');
    projectLabel.innerText = 'Project:';
    const projectSelect = document.createElement('select');
    projectSelect.classList.add('input-field');

    // Load existing projects and populate the dropdown
    const projects = loadProjects();
    const noneOption = document.createElement('option');
    noneOption.value = 'none';
    noneOption.textContent = 'No Project';
    projectSelect.appendChild(noneOption);

    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.name;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add Task';
    submitButton.classList.add('submit-btn');

    // Handle form submission
    submitButton.onclick = (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        const project = projectSelect.value !== 'none' ? projectSelect.value : null;

        if (!title || !dueDate) {
            alert('Title and Due Date are required.');
            return;
        }

        const newTask = new Task(title, description, dueDate, priority, project);
        saveTask(newTask);

        // Clear the form for the next input
        titleInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Low';
        projectSelect.value = 'none';
    };
    listProjects();

    // Append inputs and button to form container
    formContainer.appendChild(titleInput);
    formContainer.appendChild(descriptionInput);
    formContainer.appendChild(dueDateInput);
    formContainer.appendChild(priorityInput);
    formContainer.appendChild(projectLabel);
    formContainer.appendChild(projectSelect);
    formContainer.appendChild(submitButton);

    return formContainer;
}