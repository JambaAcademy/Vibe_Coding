import { io } from 'socket.io-client';

let socket;
let token = localStorage.getItem('token');

function showAuthForm() {
  document.getElementById('auth').innerHTML = `
    <input id="username" placeholder="Username" class="border px-2 py-1 mr-2" />
    <input id="password" type="password" placeholder="Password" class="border px-2 py-1 mr-2" />
    <button id="login" class="bg-green-500 text-white px-2 py-1 mr-2">Login</button>
    <button id="register" class="bg-gray-500 text-white px-2 py-1">Register</button>
  `;
  document.getElementById('login').onclick = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      token = data.token;
      connectSocket();
      document.getElementById('auth').innerHTML = '';
    } else {
      alert('Login failed');
    }
  };
  document.getElementById('register').onclick = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      alert('Registered! Please login.');
    } else {
      alert('Registration failed');
    }
  };
}

function connectSocket() {
  socket = io('http://localhost:3001', {
    auth: { token }
  });
  socket.on('chat history', (messages) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => addMessage(msg));
  });
  socket.on('chat message', (msg) => {
    addMessage(msg);
  });
}

function addMessage(msg) {
  const messagesDiv = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'mb-2';
  div.innerHTML = `<span class="font-bold">${escapeHtml(msg.username)}</span>: <span>${escapeHtml(msg.content)}</span> <span class="text-xs text-gray-400">${new Date(msg.timestamp).toLocaleTimeString()}</span>`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

document.getElementById('chat-form').onsubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById('message-input');
  if (input.value && socket) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
};

if (!token) {
  showAuthForm();
} else {
  connectSocket();
}
