export const joinRoom = (socket, room) => {
    if (room) {
        socket.join(room);
    }
}

export const leaveRoom = (socket, room) => {
    if (room) {
        socket.leave(room);
    }
}

export const listRooms = (io) => {
    return Array.from(io.sockets.adapter.rooms.keys());
}