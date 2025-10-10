import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { createServer } from 'http';
import compression from 'compression';

import { logger } from './utils/logger.js';

const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const { PORT, CORS_ORIGIN, NODE_ENV } = process.env;

// Initialize express app
const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN || '*',
  })
);
app.use(compression());

// Serve static files from the client/public folder (one level up)
const staticPath = path.join(__dirname, '../client/public');
app.use(express.static(staticPath));

// Fallback for root to serve index.html (useful when visiting http://localhost:PORT/)
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

//health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', environment: NODE_ENV || 'development' });
  logger.info('Health check request received');
});

// Create HTTP server
const httpServer = createServer(app);

export { httpServer };
export { PORT };
