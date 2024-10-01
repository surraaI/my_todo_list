import { loadTasks, TASKS_KEY } from '../utils/localStorage';


const contentWrapper = document.getElementById('content-wrapper');
export default function displayTasks(tasks) {
    // Create a table element
    const table = document.createElement('table');
    table.classList.add('task-table');

    // Create a table header row

    const headerRow = document.createElement('tr');
    const headers = ['Title', 'Description', 'Due Date', 'Priority', 'Project', 'Completed'];
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

        // Add event listener to row to allow editing
        row.addEventListener('click', () => handleRowClick(task, index));

        // Append the row to the table
        table.appendChild(row);
    });

    // Append the table to the content wrapper
    contentWrapper.appendChild(table);
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
    const tasks = loadTasks();
    tasks[index] = {...task, ...updatedTask }; // Update the task with the new data
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); // Save updated tasks to localStorage

    // Display updated tasks
    displayAllTasks();
}

function displayAllTasks() {
    const tasks = loadTasks();
    console.log('Tasks:', tasks); // Debugging line
    displayTasks(tasks);
}

function displayTodayTasks() {
    const tasks = loadTasks();
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => task.dueDate === today);
    displayTasks(todayTasks);
}

function displayThisWeekTasks() {
    const tasks = loadTasks();
    const thisWeekTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        const now = new Date();
        const diff = (taskDate - now) / (1000 * 60 * 60 * 24);
        return diff <= 7 && diff >= 0;
    });
    displayTasks(thisWeekTasks);
}


function displayProjects() {
    const projects = loadProjects();
    const ul = document.createElement('ul');
    projects.forEach(project => {
        const li = document.createElement('li');
        li.innerText = project.name;
        li.addEventListener('click', () => displayProjectTasks(project));
        ul.appendChild(li);
    });
    contentWrapper.appendChild(ul);
}

function displayProjectTasks(project) {
    contentWrapper.innerHTML = '';
    const title = document.createElement('h1');
    title.innerText = project.name;
    contentWrapper.appendChild(title);

    const ul = document.createElement('ul');
    project.tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerText = `${task.name} (Due: ${task.dueDate})`;
        ul.appendChild(li);
    });
    contentWrapper.appendChild(ul);
}