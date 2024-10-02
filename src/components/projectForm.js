import Project from '../project';
import { saveProject } from '../utils/localStorage';
import { listProjects } from './sidebar';

export default function createProjectForm() {
    // Create form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    // Title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Project Title';
    titleInput.classList.add('input-field');

    // Description input
    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = 'Project Description';
    descriptionInput.classList.add('input-field', 'textarea');


    // Submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add Project';
    submitButton.classList.add('submit-btn');

    // Handle form submission
    submitButton.onclick = (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!title) {
            alert('Title is required.');
            return;
        }

        // Create a new Task instance
        const newProject = new Project(title, description);
        // save the new task to local storage
        saveProject(newProject);
        listProjects()



        console.log('New Task Created:', newProject);
        titleInput.value = '';
        descriptionInput.value = '';
    };

    // Append inputs and button to form container
    formContainer.appendChild(titleInput);
    formContainer.appendChild(descriptionInput);
    formContainer.appendChild(submitButton);

    return formContainer;
}