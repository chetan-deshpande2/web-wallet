import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionHash: {
    type: String,
    required: true,
    trim: true
  },
  transactionStatus: {
    type: String,
    required: true
  },
  sendersAddress: {
    type: String,
    required: true
  },
  receiverAddress: {
    type: String,
    required: true
  },
  amount: Number
});

const Transactions = mongoose.model('Transactions', transactionSchema);
