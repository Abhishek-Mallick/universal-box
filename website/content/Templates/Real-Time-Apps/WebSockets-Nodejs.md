---
title: "WebSockets — Node.js"
description: "A small real-time chat template using Node.js, Express and Socket.IO. Includes a simple frontend and server with rooms and typing indicators."
tags: ["real-time", "websockets", "socket.io", "nodejs"]
---

# WebSockets — Node.js

This template provides the foundation for a real-time application using WebSockets (Socket.IO). It features a simple chat application where multiple users can communicate in real time. The setup includes both server-side and client-side code, showcasing how to broadcast and receive messages.

## Key Features

- Server Setup: Express.js server with Socket.IO attached and a health endpoint
- Client Interface: Vanilla HTML/CSS/JavaScript frontend (located in `client/public`)
- Real-Time Communication: Message broadcasting, user join/leave notifications
- Rooms & Namespaces: Demonstrates Socket.IO rooms and the `/chat` namespace
- Typing indicators: `typing:start` / `typing:stop` events to show when users are typing

## Tech stack

- Node.js
- Express
- Socket.IO
- HTML, CSS, JavaScript (frontend)

## Quick start

1. Install server dependencies

```bash
cd template/Real-Time-Apps/WebSockets-Nodejs/server
npm install
```

2. Start server

```bash
npm start
```

3. Visit the app

Open `http://localhost:3000` in a browser, join a room, and test with multiple tabs.

## Events (summary)

- `user:join` — payload `{ username, room }` — server joins socket to room and broadcasts `user:join` to other clients
- `user:leave` — payload `{ username, room }` — server removes socket from room and broadcasts `user:leave`
- `message:send` — payload `{ user, room, message }`, ack callback — server emits `message:receive` to room
- `message:receive` — payload `{ user, message }` — sent to clients when a message arrives
- `typing:start` / `typing:stop` — payload `room` — show typing indicator in room

## Configuration

- `PORT` — server port (default: `3000`)
- `CORS_ORIGIN` — allowed CORS origin for Socket.IO connections

## Notes

- For multi-instance deployments add the Socket.IO Redis adapter to share rooms between processes.
- The client loads the Socket.IO client script from `/socket.io/socket.io.js` (served by the server).

## Contributing

Please open issues or PRs if you find bugs or want to add features like authentication, persistence, or production deployment examples.
