# Server — WebSockets (Node.js)

This folder contains the Express + Socket.IO server for the WebSockets template. It serves the static client from `../client/public` and exposes a `/health` endpoint.

Quick start

1. Install dependencies

```bash
cd server
npm install
```

2. Run in development

```bash
npm run dev
```

3. Run in production-like mode

```bash
npm start
```

Configuration

- `PORT` — server port (default: `3000`)
- `CORS_ORIGIN` — allowed origin for Socket.IO (default: `*` in dev)

Notes

- The server attaches Socket.IO and creates a `/chat` namespace. Events used by the client: `user:join`, `user:leave`, `message:send`, `message:receive`, `typing:start`, `typing:stop`.
- If you run the server behind a proxy or on multiple instances, consider using the Redis adapter for Socket.IO to synchronize rooms.
