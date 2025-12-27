import express from 'express';

// Add express-rate-limit for rate limiting
import rateLimit from 'express-rate-limit';

import connectDB from './db/mongoose.js';
import todoRoutes from './routes/todoRoutes.js';
import mongoose from 'mongoose';

connectDB();

var app = express();

// Set up rate limiter: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiter to all requests
app.use(limiter);

app.use(express.json());

app.use('/api', todoRoutes);

const server = app.listen(3000, () => {
  console.log('Started on port 3000');
});

// Graceful shutdown logic
const shutdown = async () => {
  console.log('Shutdown initiated...');
  try {
    server.close(() => console.log('HTTP server closed.'));
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
};

// Listen for termination signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


export default server;
