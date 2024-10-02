import { loadProjects, loadTasks } from '../utils/localStorage';
import createProjectForm from '../components/projectForm';
import createTaskForm from '../components/todoForm';
import { TASKS_KEY } from '../utils/localStorage';
import '../css/editTaskForm.css'


const sidebar = document.createElement('nav');
sidebar.classList.add('sidebar');

const ul = document.createElement('ul');
const navs = ['home', 'today', 'this week'];

for (let n of navs) {
    const li = document.createElement('li');
    li.innerText = n;
    li.addEventListener('click', () => handleNavClick(n));
    ul.appendChild(li);
}
sidebar.appendChild(ul);

const projectsSection = document.createElement('div');
projectsSection.classList.add('projects-section');
const projectsHeader = document.createElement('h2');
projectsHeader.innerText = 'Projects';
projectsSection.appendChild(projectsHeader);
const projectsUl = document.createElement('ul');

export function listProjects() {
    projectsUl.innerHTML = '';
    const projects = loadProjects();
    if (Array.isArray(projects)) {
        for (let n of projects) {
            const li = document.createElement('li');
            li.innerText = n.name;

            li.addEventListener('click', () => displayProjectTasks(n));

            li.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const confirmed = confirm(`Are you sure you want to delete the project "${n.name}"?`);
                if (confirmed) {
                    deleteProject(n);
                }
            });

            projectsUl.appendChild(li);
        }
    }
    projectsSection.appendChild(projectsUl);
    sidebar.appendChild(projectsSection);
}

// Delete project function
function deleteProject(project) {
    const projects = loadProjects().filter(p => p.name !== project.name);
    localStorage.setItem('projects', JSON.stringify(projects));
    listProjects();
}

listProjects();


// Add buttons for adding project and task
const btns = document.createElement('div');
btns.classList.add('btns');

const addProjectButton = document.createElement('button');
addProjectButton.classList.add('add-project-btn');
addProjectButton.innerText = 'Add Project';
addProjectButton.addEventListener('click', () => {
    contentWrapper.innerHTML = '';
    contentWrapper.appendChild(createProjectForm());
});

const addTaskButton = document.createElement('button');
addTaskButton.classList.add('add-task-btn');
addTaskButton.innerText = 'Add Task';
addTaskButton.addEventListener('click', () => {
    contentWrapper.innerHTML = '';
    contentWrapper.appendChild(createTaskForm());
});


btns.appendChild(addProjectButton);
btns.appendChild(addTaskButton);
sidebar.appendChild(btns);



export default sidebar;

const contentWrapper = document.getElementById('content-wrapper');
window.addEventListener('load', () => {
    handleNavClick('home');
});

function handleNavClick(nav) {
    contentWrapper.innerHTML = '';

    const title = document.createElement('h1');
    title.innerText = nav;
    contentWrapper.appendChild(title);

    if (nav === 'home') {
        displayAllTasks();
    } else if (nav === 'today') {
        displayTodayTasks();
    } else if (nav === 'this week') {
        displayThisWeekTasks();
    }
}


function displayTasks(tasks) {
    // Create a table element
    const table = document.createElement('table');
    table.classList.add('task-table');

    // Create a table header row
    const headerRow = document.createElement('tr');
    const headers = ['Title', 'Description', 'Due Date', 'Priority', 'Project', 'Completed', 'Actions'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.innerText = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create a table row for each task
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        // Add title cell
        const titleCell = document.createElement('td');
        titleCell.innerText = task.title;
        row.appendChild(titleCell);

        // Add description cell
        const descriptionCell = document.createElement('td');
        descriptionCell.innerText = task.description || 'No description';
        row.appendChild(descriptionCell);

        // Add due date cell (Convert to Date object if it's a string)
        const dueDateCell = document.createElement('td');
        const dueDate = new Date(task.dueDate); // Convert string to Date object
        dueDateCell.innerText = !isNaN(dueDate.getTime()) ? dueDate.toISOString().split('T')[0] : 'No due date'; // Check if it's a valid date
        row.appendChild(dueDateCell);

        // Add priority cell
        const priorityCell = document.createElement('td');
        priorityCell.innerText = task.priority || 'None';
        row.appendChild(priorityCell);

        // Add project cell
        const projectCell = document.createElement('td');
        projectCell.innerText = task.project || 'No project';
        row.appendChild(projectCell);

        // Add completed status cell
        const completedCell = document.createElement('td');
        completedCell.innerText = task.completed ? 'Yes' : 'No';
        row.appendChild(completedCell);

        // Add delete button cell
        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the row click event
            deleteTask(index);
        });
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        // Add event listener to row to allow editing
        row.addEventListener('click', () => handleRowClick(task, index));

        // Append the row to the table
        table.appendChild(row);
    });

    // Append the table to the content wrapper
    contentWrapper.appendChild(table);
}

function deleteTask(index) {
    const tasks = loadTasks();
    tasks.splice(index, 1); // Remove task at the specified index
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); // Save updated tasks to localStorage

    // Refresh the task list after deletion

    displayAllTasks();
}


function handleRowClick(task, index) {
    // Clear content wrapper to display the task edit form
    contentWrapper.innerHTML = '';

    // Create a form for editing the task
    const form = document.createElement('form');
    form.classList.add('edit-task-form');

    // Title input
    const titleLabel = document.createElement('label');
    titleLabel.innerText = 'Title:';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title;
    form.appendChild(titleLabel);
    form.appendChild(titleInput);

    // Description input
    const descriptionLabel = document.createElement('label');
    descriptionLabel.innerText = 'Description:';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = task.description || '';
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);

    // Due date input
    const dueDateLabel = document.createElement('label');
    dueDateLabel.innerText = 'Due Date:';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.value = task.dueDate;
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);

    // Priority input
    const priorityLabel = document.createElement('label');
    priorityLabel.innerText = 'Priority:';
    const priorityInput = document.createElement('select');
    const priorities = ['None', 'Low', 'Medium', 'High'];
    priorities.forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.innerText = p;
        if (p === task.priority) option.selected = true;
        priorityInput.appendChild(option);
    });
    form.appendChild(priorityLabel);
    form.appendChild(priorityInput);

    // Completed checkbox
    const completedLabel = document.createElement('label');
    completedLabel.innerText = 'Completed:';
    const completedInput = document.createElement('input');
    completedInput.type = 'checkbox';
    completedInput.checked = task.completed;
    form.appendChild(completedLabel);
    form.appendChild(completedInput);

    // Save button
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click', () => saveEditedTask(task, index, {
        title: titleInput.value,
        description: descriptionInput.value,
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        completed: completedInput.checked
    }));
    form.appendChild(saveButton);

    // Append the form to the content wrapper

    contentWrapper.appendChild(form);
}

function saveEditedTask(task, index, updatedTask) {
    contentWrapper.innerHTML = '';
    const tasks = loadTasks();
    tasks[index] = {...task, ...updatedTask }; // Update the task with the new data
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); // Save updated tasks to localStorage

    // Display updated tasks
    displayAllTasks();
}

function displayAllTasks() {
    contentWrapper.innerHTML = '';
    const tasks = loadTasks();
    console.log('Tasks:', tasks); // Debugging line
    displayTasks(tasks);
}

function displayTodayTasks() {
    contentWrapper.innerHTML = '';
    const tasks = loadTasks();

    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0]; // Get today's date as YYYY-MM-DD

    // Filter tasks where the due date matches today's date
    const todayTasks = tasks.filter(task => {
        const taskDueDate = new Date(task.dueDate); // Convert task due date to Date object
        const taskDueDateString = taskDueDate.toISOString().split('T')[0]; // Get the date part (YYYY-MM-DD)
        return taskDueDateString === todayDateString;
    });

    displayTasks(todayTasks); // Display today's tasks
}


function displayThisWeekTasks() {
    contentWrapper.innerHTML = '';
    const tasks = loadTasks();
    const thisWeekTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        const now = new Date();
        const diff = (taskDate - now) / (1000 * 60 * 60 * 24);
        return diff <= 7 && diff >= 0;
    });
    displayTasks(thisWeekTasks);
}


function displayProjectTasks(project) {
    contentWrapper.innerHTML = '';
    const title = document.createElement('h1');
    title.innerText = project.name;
    contentWrapper.appendChild(title);
    console.log('Project:', project.tasks); // Debugging step
    displayTasks(project.tasks);

}