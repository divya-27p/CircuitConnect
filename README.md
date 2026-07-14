# CircuitConnect - Engineering Collaboration Platform

### Introduction
This repository contains **CircuitConnect**, a real-time engineering collaboration platform built with the **MERN Stack**. The application enables engineering students and developers to communicate through private discussions, create Engineering Hubs for team collaboration, and exchange ideas in real time. It is designed with a modern, responsive interface and supports both light and dark themes.

---

### Features

1. **JWT Authentication**
- Secure user authentication using JSON Web Tokens (JWT).
- Protected routes and authenticated sessions.
- Secure login and registration system.

2. **Private Discussions**
- Start one-to-one discussions with other engineers.
- Real-time messaging using Socket.IO.
- Instant message delivery with typing indicators.

3. **Engineering Hubs**
- Create Engineering Hubs for team collaboration.
- Invite multiple engineers to participate.
- Share ideas and discuss projects within dedicated hubs.

4. **Real-Time Communication**
- Instant message delivery.
- Live online/offline engineer status.
- Real-time typing notifications.
- Read/unread message tracking.
- Hub join/leave notifications.

5. **Modern User Interface**
- Responsive design for desktop and mobile.
- Beautiful Light & Dark Mode.
- Soft Pink & Lavender themed interface.
- Clean and intuitive user experience.

---

### Technologies

- Database - MongoDB
- Backend - Node.js & Express.js
- Frontend - React.js
- Styling - Styled Components
- Real-time Communication - Socket.IO
- Authentication - JWT

---

### How to Use

1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

2. Go into the project folder

```bash
cd CircuitConnect
```

3. Open two terminals

---

### Server Setup

4. Navigate to the server directory

```bash
cd server
npm install
```

5. Create a `.env` file

```env
MONGO_URI=YOUR_MONGODB_URI
CLIENT_URL=http://localhost:5173

ACCESS_TOKEN_SECRET=YOUR_ACCESS_SECRET
REFRESH_TOKEN_SECRET=YOUR_REFRESH_SECRET
COOKIE_SIGNATURE=YOUR_COOKIE_SIGNATURE
```

6. Start the server

```bash
npm start
```

If you see:

```
App is listening on PORT XXXX
DB connection Success
```

the backend is running successfully.

---

### Client Setup

7. Navigate to the client directory

```bash
cd client
npm install
```

8. Create a `.env` file

```env
VITE_AVATAR_KEY=YOUR_AVATAR_API_KEY
VITE_SERVER_URL=http://localhost:5000
```

9. Start the frontend

```bash
npm run dev
```

---

### Future Improvements

- AI-powered engineer recommendations
- Skill-based engineer search
- Project showcase section
- File sharing within Engineering Hubs
- GitHub profile integration
- Notifications dashboard

---

## Thank You

If you found this project helpful, consider giving it a ⭐ on GitHub.