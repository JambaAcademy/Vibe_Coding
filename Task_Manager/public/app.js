const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

// Sci-fi sound effect
const beep = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124b7b2b7c.mp3');

function fetchTasks() {
    fetch('/api/tasks')
        .then(res => res.json())
        .then(tasks => {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                li.innerHTML = `
                    <span class="task-text${task.completed ? ' completed' : ''}">${task.text}</span>
                    <div class="task-actions">
                        <button onclick="completeTask('${task.id}', ${!task.completed})">
                            ${task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onclick="deleteTask('${task.id}')">Delete</button>
                        <button onclick="editTaskPrompt('${task.id}', '${task.text.replace(/'/g, "\\'")}')">Edit</button>
                    </div>
                `;
                if (task.completed) {
                    li.querySelector('.task-text').style.animation = 'glow 1.2s infinite alternate';
                }
                taskList.appendChild(li);
            });
        });
}

// Add glow animation for completed tasks
const style = document.createElement('style');
style.innerHTML = `
@keyframes glow {
    from { text-shadow: 0 0 8px #007cf0, 0 0 2px #00ffe7; }
    to { text-shadow: 0 0 18px #00ffe7, 0 0 8px #007cf0; }
}
`;
document.head.appendChild(style);

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;
    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    }).then(() => {
        taskInput.value = '';
        beep.play();
        fetchTasks();
    });
});

window.completeTask = function(id, completed) {
    fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    }).then(() => {
        beep.play();
        fetchTasks();
    });
};

window.deleteTask = function(id) {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
        .then(fetchTasks);
};

window.editTaskPrompt = function(id, oldText) {
    const newText = prompt('Edit task:', oldText);
    if (newText && newText.trim() !== oldText) {
        fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText.trim() })
        }).then(fetchTasks);
    }
};

fetchTasks();
