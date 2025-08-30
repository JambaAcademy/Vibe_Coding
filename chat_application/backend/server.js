const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const sanitizeHtml = require('sanitize-html');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

// Root route for health check or welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Chat Application Backend!');
});

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5, // limit each IP to 5 requests per second
});
app.use(limiter);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String, // In production, hash passwords!
});
const User = mongoose.model('User', UserSchema);

const MessageSchema = new mongoose.Schema({
  username: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', MessageSchema);

const JWT_SECRET = 'your_jwt_secret';

// Auth routes
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const user = new User({ username, password });
  await user.save();
  res.json({ success: true });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Socket.io authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error('Authentication error'));
    socket.username = decoded.username;
    next();
  });
});

io.on('connection', async (socket) => {
  // Send previous messages
  const messages = await Message.find().sort({ timestamp: 1 }).limit(100);
  socket.emit('chat history', messages);

  socket.on('chat message', async (msg) => {
    // Sanitize input
    const cleanMsg = sanitizeHtml(msg);
    const message = new Message({ username: socket.username, content: cleanMsg });
    await message.save();
    io.emit('chat message', { username: socket.username, content: cleanMsg, timestamp: message.timestamp });
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
