import User from '../models/userModel.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const isAuth = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({ _email });
  if (user.isVerified !== true) {
    return res.status(500).json({ msg: 'pls verify your account' });
  }
  next();
});

export default isAuth;
