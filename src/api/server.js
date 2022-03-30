import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

// //! router import

import { userRoute } from './routes/user.js';
import { transactionRoute } from './routes/transactions.js';
// import notFound from './utils/notFound.js';
// import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

// !main routes

app.use('/api/v1', userRoute);
app.use('/api/v1', transactionRoute);
// app.use(notFound);
// app.use(errorHandler);

const port = process.env.PORT || 3002;
const url = process.env.MONGODB_URL;

const start = async () => {
  try {
    await mongoose.connect(url);
    app.listen(port);
    console.log('connected');
  } catch (error) {
    throw new Error("Couldn't connect");
  }
};

start();
