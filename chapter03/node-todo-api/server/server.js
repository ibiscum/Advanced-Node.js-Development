import express from 'express';
// import { json } from 'body-parser';

// Add express-rate-limit for rate limiting
import rateLimit from 'express-rate-limit';

import connectDB from './db/mongoose.js';
import todoRoutes from './routes/todoRoutes.js';
//var {User} = require('./models/user');

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

app.listen(3000, () => {
  console.log('Started on port 3000');
});

export default { app };
