import express from 'express';

import {
  claimBonus,
  transferFunds,
  transactionDetails
} from '../controllers/transactions.js';
import isAdmin from '../middleware/isAdmin.js';
import isAuth from '../middleware/isAuth.js';

const transactionRoute = express.Router();

//*to claim airdrop amounts of token
transactionRoute.post('/claimBonus', isAuth, claimBonus);

//* to transfer tokens

transactionRoute.post('/transferFunds', isAuth, transferFunds);

//* to see transaction details
//!user can see onw transaction
//! admin can see all transaction

transactionRoute.get('/transactionDetails', isAdmin, transactionDetails);

export { transactionRoute };
