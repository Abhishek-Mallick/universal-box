import { httpServer, PORT } from './app.js';
import { logger } from './utils/logger.js';
import { initSocket } from './socket/index.js';

const io = initSocket(httpServer, process.env.CORS_ORIGIN || '*');

httpServer.listen(PORT || 3000, () => {
  logger.info(`Server is running on port ${PORT || 3000}`);
});
