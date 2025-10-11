import { logger } from '../utils/logger.js';
import { joinRoom, leaveRoom } from './rooms.js';

export const registerHandlers = (io, socket) => {
  // --- Connection Events ---
  socket.on('user:join', ({ username, room }) => {
    if (!room) return;
    joinRoom(socket, room);
    socket.broadcast.to(room).emit('user:join', { username });
    logger.info(`${username || 'Unknown user'} joined room ${room}`);
  });

  socket.on('user:leave', ({ username, room }) => {
    if (!room) return;
    leaveRoom(socket, room);
    socket.broadcast.to(room).emit('user:leave', { username });
    logger.info(`${username || 'Unknown user'} left room ${room}`);
  });

  // --- Messaging Events ---
  socket.on('message:send', (data, ack) => {
    if (!data?.room || !data?.message) {
      if (ack) ack({ success: false, error: 'Invalid payload' });
      logger.warn('Invalid message:send payload', data);
      return;
    }

    // Broadcast to everyone else in the room
    socket.to(data.room).emit('message:receive', {
      user: data.user,
      message: data.message,
    });
    logger.info(`Message sent to room ${data.room} by user ${data.user || 'Anon'}`);

    // Acknowledge sender
    if (ack) ack({ success: true });
  });

  // --- Typing Indicators ---
  socket.on('typing:start', (room) => socket.to(room).emit('typing:start'));
  socket.on('typing:stop', (room) => socket.to(room).emit('typing:stop'));

  // --- Room Control ---
  socket.on('room:join', (room) => joinRoom(socket, room));
  socket.on('room:leave', (room) => leaveRoom(socket, room));
};
