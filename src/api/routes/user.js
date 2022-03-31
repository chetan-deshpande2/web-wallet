import express from 'express';

// import authAdmin from '../middleware/authAdmin'

import {
  registerUser,
  emailVerification,
  loginUser
} from '../controllers/user.js';
import isAuth from '../middleware/isAuth.js';

const userRoute = express.Router();

//* to register user
userRoute.post('/register', registerUser);

//* to verify user

userRoute.post('/email-activate', emailVerification);

//* to login user
userRoute.post('/login', isAuth, loginUser);

// router.post('/updaterole', userController.updateUserRole)

export { userRoute };
