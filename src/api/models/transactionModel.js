import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    transactionHash: {
      type: String,
      required: true,
      trim: true
    },
    sendersAddress: {
      type: String,
      required: true
    },
    receiverAddress: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Transactions = mongoose.model('Transactions', transactionSchema);

export default Transactions;
