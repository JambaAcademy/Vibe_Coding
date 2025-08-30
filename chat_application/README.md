# Real-Time Chat Application

A full-stack real-time chat application built with Node.js, Express, Socket.io, MongoDB, JWT authentication, rate limiting, input sanitization, and a responsive frontend using Tailwind CSS and Vite.

## Features
- **User Authentication:** Register and login with JWT-based authentication.
- **Real-Time Messaging:** Chat instantly with other users using Socket.io.
- **Message Persistence:** All messages are stored in MongoDB.
- **Rate Limiting:** Prevents spam by limiting requests per user/IP.
- **Input Sanitization:** Protects against XSS attacks using sanitize-html.
- **Responsive UI:** Built with Tailwind CSS for mobile and desktop.

## Project Structure
```
chat_application/
├── backend/         # Node.js/Express/Socket.io server
│   ├── server.js    # Main backend server code
│   └── package.json # Backend dependencies
├── frontend/        # Vite/Tailwind/Socket.io-client frontend
│   ├── index.html   # Main HTML file
│   ├── main.js      # Frontend logic
│   ├── tailwind.css # Tailwind CSS entry
│   └── package.json # Frontend dependencies
└── README.md        # This documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (running locally or remotely)

### 1. Clone the Repository
```
git clone <repo-url>
cd chat_application
```

### 2. Install Dependencies
#### Backend
```
cd backend
npm install
```
#### Frontend
```
cd ../frontend
npm install
```

### 3. Start MongoDB
- If installed as a service:
  ```powershell
  net start MongoDB
  ```
- If installed manually:
  ```powershell
  "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath="C:\data\db"
  ```

### 4. Run the Backend Server
```
cd backend
npm start
```
- The backend runs on [http://localhost:3001](http://localhost:3001)

### 5. Run the Frontend
```
cd frontend
npm run start
```
- The frontend runs on [http://localhost:3000](http://localhost:3000)

## Usage
1. Open [http://localhost:3000](http://localhost:3000) in two browser windows/tabs.
2. Register two users (e.g., `user1` and `user2`).
3. Login with each user in separate windows.
4. Send messages and see them appear in real time.

## Code Overview

### Backend (`server.js`)
- **Express** serves API endpoints for registration and login.
- **JWT** is used for authentication; tokens are required for Socket.io connections.
- **Socket.io** enables real-time messaging between clients.
- **MongoDB/Mongoose** stores users and messages.
- **Rate Limiting** via `express-rate-limit` middleware.
- **Input Sanitization** via `sanitize-html` before saving messages.

### Frontend (`main.js`)
- **Login/Register Form**: Handles authentication via API.
- **Socket.io Client**: Connects to backend with JWT token.
- **Chat UI**: Displays messages, sends new ones, and escapes HTML for safety.
- **Tailwind CSS**: Provides responsive styling.

## Security Notes
- Passwords are stored in plain text for demo purposes. **Hash passwords in production!**
- JWT secret should be stored securely (use environment variables).
- Rate limiting and input sanitization help prevent abuse and XSS.

## Customization
- Change MongoDB connection string in `server.js` if needed.
- Update JWT secret for production.
- Add more features (private messaging, avatars, etc.) as desired.

## Troubleshooting
- If you see `Cannot GET /`, the backend is running but has no root route. A welcome route is now included.
- If you see `EADDRINUSE`, stop any previous backend server before starting a new one.
- Ensure MongoDB is running before starting the backend.

## License
MIT
