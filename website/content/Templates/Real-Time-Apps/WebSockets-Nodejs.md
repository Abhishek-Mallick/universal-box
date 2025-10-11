## Introduction
This template provides the foundation for a real-time application using WebSockets (Socket.IO). It features a simple chat application where multiple users can communicate in real time. The setup includes both server-side and client-side code, showcasing how to broadcast and receive messages.

## Screenshots
<img width="1149" height="838" alt="Screen Shot 2025-10-11 at 11 08 28 AM" src="https://github.com/user-attachments/assets/6b266bb7-c2f8-485f-96ca-7f140a4f25e6" />




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
