import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';



const app = express();

app.use(express.json());



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
