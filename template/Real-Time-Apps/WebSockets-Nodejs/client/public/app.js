// Minimal client for the chat UI
(() => {
  // DOM refs
  const joinForm = document.getElementById("joinForm");
  const usernameInput = document.getElementById("username");
  const roomInput = document.getElementById("room");
  const joinBtn = document.getElementById("joinBtn");
  const leaveBtn = document.getElementById("leaveBtn");
  const roomInfo = document.getElementById("roomInfo");
  const roomNameEl = document.getElementById("roomName");

  const subtitle = document.getElementById("subtitle");
  const messagesEl = document.getElementById("messages");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const typingEl = document.getElementById("typing");

  let socket = null;
  let currentRoom = null;
  let username = null;
  let typingTimer = null;

  function appendMessage({ user, message, me }) {
    const li = document.createElement("li");
    li.className = "message" + (me ? " me" : "");
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = (user || "Anon") + " • " + new Date().toLocaleTimeString();
    const body = document.createElement("div");
    body.textContent = message;
    li.appendChild(meta);
    li.appendChild(body);
    messagesEl.appendChild(li);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setJoinedState(joined) {
    roomInfo.hidden = !joined;
    messageInput.disabled = !joined;
    sendBtn.disabled = !joined;
    if (!joined) {
      subtitle.textContent = "Join a room to start chatting";
      roomNameEl.textContent = "";
      currentRoom = null;
    }
  }

  function initSocket() {
    // Connect to the /chat namespace
    socket = io("/chat");

    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("user:join", ({ username: user }) => {
      appendMessage({ user: "System", message: `${user || "Someone"} joined the room` });
    });

    socket.on("user:leave", ({ username: user }) => {
      appendMessage({ user: "System", message: `${user || "Someone"} left the room` });
    });

    socket.on("message:receive", ({ user, message }) => {
      appendMessage({ user, message, me: false });
    });

    socket.on("typing:start", () => {
      typingEl.textContent = "Someone is typing...";
      typingEl.hidden = false;
    });

    socket.on("typing:stop", () => {
      typingEl.textContent = "";
      typingEl.hidden = true;
    });
  }

  function joinRoom(e) {
    if (e) e.preventDefault();
    username = usernameInput.value.trim();
    const room = roomInput.value.trim();
    if (!username || !room) return;

    if (!socket) initSocket();

    socket.emit("user:join", { username, room });
    currentRoom = room;
    roomNameEl.textContent = room;
    subtitle.textContent = `Room: ${room}`;
    setJoinedState(true);
    appendMessage({ user: "System", message: `You joined ${room}`, me: false });
  }

  function leaveRoom(e) {
    if (e) e.preventDefault();
    if (!socket || !currentRoom) return;
    socket.emit("user:leave", { username, room: currentRoom });
    appendMessage({ user: "System", message: `You left ${currentRoom}` });
    setJoinedState(false);
  }

  async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !socket || !currentRoom) return;
    // append local message
    appendMessage({ user: username, message: text, me: true });
    // send to server (with ack)
    socket.emit("message:send", { user: username, room: currentRoom, message: text }, (ack) => {
      if (!ack || !ack.success) {
        appendMessage({ user: "System", message: "Message failed to send" });
      }
    });
    messageInput.value = "";
    stopTyping();
  }

  function startTyping() {
    if (!socket || !currentRoom) return;
    socket.emit("typing:start", currentRoom);
    if (typingTimer) clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      stopTyping();
    }, 2000);
  }

  function stopTyping() {
    if (!socket || !currentRoom) return;
    socket.emit("typing:stop", currentRoom);
    if (typingTimer) {
      clearTimeout(typingTimer);
      typingTimer = null;
    }
  }

  // Event bindings
  joinForm.addEventListener("submit", joinRoom);
  leaveBtn.addEventListener("click", leaveRoom);

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      sendMessage();
    } else {
      startTyping();
    }
  });

  // Initialize UI state
  setJoinedState(false);
})();
