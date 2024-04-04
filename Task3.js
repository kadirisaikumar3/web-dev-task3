document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    let input = document.getElementById('taskInput');
    if (input.value.trim() !== '') {
        let tasks = getTasks();
        tasks.push({ id: Date.now(), content: input.value, completed: false, priority: false });
        saveTasks(tasks);
        input.value = ''; // Clear input field
        loadTasks(); // Refresh the list
    }
}

function editTask(taskId, newContent) {
    let tasks = getTasks();
    let task = tasks.find(t => t.id === taskId);
    task.content = newContent;
    saveTasks(tasks);
    loadTasks(); // Refresh the list
}

function deleteTask(taskId) {
    let tasks = getTasks().filter(t => t.id !== taskId);
    saveTasks(tasks);
    loadTasks(); // Refresh the list
}

function toggleTask(taskId) {
    let tasks = getTasks();
    let task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    saveTasks(tasks);
    loadTasks(); // Refresh the list
}

function togglePriority(taskId) {
    let tasks = getTasks();
    let task = tasks.find(t => t.id === taskId);
    task.priority = !task.priority;
    saveTasks(tasks);
    loadTasks(); // Refresh the list
}

function getTasks() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasks();
    let tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = ''; // Clear current tasks list

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.content;
        li.className = task.completed ? 'completed' : '';
        li.className += task.priority ? ' priority' : '';

        // Toggle completion on click
        li.addEventListener('click', function() { toggleTask(task.id); });

        // Adding edit button
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() {
            let newContent = prompt("Edit task:", task.content);
            if (newContent) editTask(task.id, newContent);
        };
        li.appendChild(editBtn);

        // Adding delete button
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = function() { deleteTask(task.id); };
        li.appendChild(delBtn);

        // Adding priority toggle button
        let priorityBtn = document.createElement('button');
        priorityBtn.textContent = 'Toggle Priority';
        priorityBtn.onclick = function() { togglePriority(task.id); };
        li.appendChild(priorityBtn);

        tasksList.appendChild(li);
    });
}
