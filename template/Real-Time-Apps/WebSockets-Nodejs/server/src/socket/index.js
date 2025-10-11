import { Server } from 'socket.io';
import { logger } from '../utils/logger.js';
import { registerHandlers } from './events.js';

function initSocket(httpServer, CORS_ORIGIN) {
  //Attach SOCKET.IO to the existing HTTP server
  const io = new Server(httpServer, { cors: { origin: CORS_ORIGIN } });

  //Default Namespace
  const defaultNamespace = io.of('/');

  //Cusom Namespace /chat
  const chatNamespace = io.of('/chat');

  //Register events for each namespace
  [defaultNamespace, chatNamespace].forEach((namespace) => {
    namespace.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id} to namespace: ${namespace.name}`);
      registerHandlers(namespace, socket);

      socket.on('disconnect', (reason) => {
        logger.info(
          `Socket disconnected: ${socket.id} from namespace: ${namespace.name}. Reason: ${reason}`
        );
      });
    });
  });

  logger.info('Socket.IO initialized with namespaces: / and /chat');
  return io;
}

export { initSocket };
