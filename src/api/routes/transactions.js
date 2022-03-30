import express from 'express';

import {
  claimBonus,
  transferFunds,
  transactionDetails
} from '../controllers/transactions.js';

const transactionRoute = express.Router();

//*to claim airdrop amounts of token
transactionRoute.post('/claimBonus', claimBonus);

//* to transfer tokens

transactionRoute.post('/transferFunds', transferFunds);

//* to see transaction details
//!user can see onw transaction
//! admin can see all transaction

transactionRoute.get('/transactionDetails', transactionDetails);

export { transactionRoute };
