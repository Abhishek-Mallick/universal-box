# WebSockets (Node.js) — Real-Time App Template

This template provides a small, opinionated starting point for real-time applications using Socket.IO. It includes a lightweight Express server, a Socket.IO setup with namespaces and rooms, and a small static frontend (HTML/CSS/JS) demonstrating a chat application.

Key features
- Express server with health endpoint and static asset serving
- Socket.IO setup with a `/chat` namespace and room helpers
- Minimal, responsive frontend (vanilla HTML/CSS/JS) showing join/leave, message broadcast, and typing indicators
- Notes on scaling and Redis adapter

Quick start
1. Install dependencies for the server:

```bash
cd server
npm install
```

2. Start the server (defaults to port 3000):

```bash
npm start
# or for development with auto-reload:
npm run dev
```

3. Open the app in your browser:

Visit `http://localhost:3000` and join a room. Open a second tab/window and join the same room to test real-time messaging.

Configuration
- `server/.env.example` documents environment variables used by the server. By default the server will listen on `PORT` or `3000`.
- `CORS_ORIGIN` can be set to restrict which origins may connect to the Socket.IO server.

Notes for contributors
- Keep the client static assets in `client/public` so the server can serve them.
- The Socket.IO server registers a `/chat` namespace; the client connects to that namespace and uses events like `user:join`, `message:send`, `message:receive`, `typing:start`, and `typing:stop`.

Scaling
- For multi-instance deployments you will want to enable the Socket.IO Redis adapter to share rooms/clients between processes. See the `socket.io` docs for an example.

License
- MIT
