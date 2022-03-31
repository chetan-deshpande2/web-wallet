import 'dotenv/config';
import { ethers } from 'ethers';

import asyncWrapper from '../utils/asyncWrapper.js';
// import { createCustomError } from '../utils/appError.js';
import User from '../models/userModel.js';
import Transactions from '../models/transactionModel.js';
import { contract } from '../middleware/tokenAddress.js';
import { transactionSuccessMail } from '../utils/transactionMail.js';

const account1 = process.env.ADMIN_ACCOUNT;

const provider = new ethers.providers.JsonRpcProvider(
  ` https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RUI}`
);
const privateKey = process.env.PRIVATE_KEY_ACCOUNT1;

const wallet = new ethers.Wallet(privateKey, provider);
const walletConnect = await contract.connect(wallet);

const claimBonus = asyncWrapper(async (req, res, next) => {
  let { address, user } = req.body;
  const amount = '100000000000000000000';
  const balance = await contract.balanceOf(address);
  console.log(ethers.utils.formatEther(balance));
  user = User.findOne({ email });

  if ((user.reward = false)) {
    user.reward == true;
    await user.save();
    const tx = await walletConnect.transfer(address, amount);
    await tx.wait();
    console.log(tx);
    const transaction = new Transactions({
      transactionHash: tx.hash,
      sendersAddress: account1,
      receiverAddress: address,
      amount: amount
    });
    await transaction.save();
    res.json({
      msg: 'Bonus amount transferred successfully',
      transactionDetails: transaction
    });
  }
  res.status(400).json({ msg: `Bonus Already claimed` });
});

const transferFunds = asyncWrapper(async (req, res, next) => {
  const { sendersAddress, receiverAddress, amount, email } = req.body;
  const user = await User.findOne({ email });

  const wallet = new ethers.Wallet(user.privateKey, provider);
  const walletConnect = await contract.connect(wallet);
  const tx = await walletConnect.transfer(receiverAddress, amount);
  await tx.wait();
  console.log(tx);
  const balanceOfReceiver = await contract.balanceOf(receiverAddress);
  console.success(
    'balance of receiver',
    ethers.utils.formatEther(balanceOfReceiver)
  );

  const transaction = new Transactions({
    transactionHash: tx.hash,
    sendersAddress: sendersAddress,
    receiverAddress: receiverAddress,
    amount: amount
  });

  await transaction.save();
  await transactionSuccessMail(email, tx);

  res.json(tx);
});

const transactionDetails = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.isAdmin === true) {
    const allTrx = await Transactions.find({});
    res.status(200).json({ result: allTrx });
  }
});

export { claimBonus, transferFunds, transactionDetails };
