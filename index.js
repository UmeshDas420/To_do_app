// Select elements
const taskInput = document.getElementById('inputBox');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Add task to DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.className = 'check';
    checkbox.addEventListener('change', () => toggleComplete(text));

    const taskText = document.createElement('span');
    taskText.textContent = text;
    if (completed) li.classList.add('completed');

    const deleteButton = document.createElement('button');
    deleteButton.className = "show btn";
    const deleteImg = document.createElement('img');
    deleteImg.src = "cross.png";
    deleteButton.appendChild(deleteImg);
    deleteButton.addEventListener('click', () => {
        removeTask(text);
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Add task to local storage
function addTask() {
    const task = taskInput.value.trim();
    if (!task) return;

    addTaskToDOM(task);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
}

// Toggle task completion
function toggleComplete(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task =>
        task.text === taskText ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    refreshList();
}

// Remove task from local storage
function removeTask(taskToRemove) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.text !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

// Refresh task list
function refreshList() {
    taskList.innerHTML = '';
    loadTasks();
}

// Event listeners
addTaskButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);


function showDeleteBtn() {
    const len = document.getElementsByClassName("show").length;
    for (var i = 0; i <= len; i++) {
        if (document.getElementsByClassName("show")[i].style.visibility !== "visible") {
            document.getElementsByClassName("show")[i].style.visibility = "visible";
        } else {
            document.getElementsByClassName("show")[i].style.visibility = "hidden";
        }
    }
}
