import express from 'express';

// import authAdmin from '../middleware/authAdmin'

import {
  registerUser,
  emailVerification,
  loginUser
} from '../controllers/user.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);

userRoute.post('/email-activate', emailVerification);
userRoute.post('/login', loginUser);

// router.post('/updaterole', userController.updateUserRole)

export { userRoute };
