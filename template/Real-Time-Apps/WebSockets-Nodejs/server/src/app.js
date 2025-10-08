import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import compression from 'compression';

const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}


const {PORT, CORS_ORIGIN, NODE_ENV} = process.env;

// Initialize express app
const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN || "*",
  })
);
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, "../../client/public")));

// Create HTTP server
const httpServer = createServer(app);


export {httpServer};
