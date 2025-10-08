import { Server } from "socket.io";


function initSocket(httpServer, CORS_ORIGIN ) {
    //Attach SOCKET.IO to the existing HTTP server
    const io = new Server(httpServer,{
        cors: {
            origin: CORS_ORIGIN, // Allow the same origin as the express CORS
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    return io;
}

export { initSocket };

