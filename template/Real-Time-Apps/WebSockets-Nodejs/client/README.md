# Client — WebSockets (static frontend)

This folder holds the static frontend for the chat demo located at `client/public`.

How to use

- The simplest way to run the client is to start the server (it serves `client/public` automatically):

```bash
cd server
npm start
# then open http://localhost:3000
```

- You can also open `client/public/index.html` directly in a browser, but Socket.IO client needs to connect to the server (same origin or CORS allowed) for real-time behavior.

Files of interest

- `client/public/index.html` — the page
- `client/public/style.css` — styles
- `client/public/app.js` — client Socket.IO logic
