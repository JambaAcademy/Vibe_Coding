const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());
app.use(express.static('public'));

// Helper to read/write tasks
function readTasks() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(readTasks());
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: Date.now().toString(),
        text: req.body.text,
        completed: false
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.json(newTask);
});

// Update a task (mark complete or edit)
app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const idx = tasks.findIndex(t => t.id === req.params.id);
    if (idx === -1) return res.status(404).send('Task not found');
    tasks[idx] = { ...tasks[idx], ...req.body };
    writeTasks(tasks);
    res.json(tasks[idx]);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    let tasks = readTasks();
    tasks = tasks.filter(t => t.id !== req.params.id);
    writeTasks(tasks);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
