import Users from '../model/userModel.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const isAuth = asyncWrapper(async (req, res, next) => {
  const user = await Users.findOne({ _email });
  if (user.isVerified !== true) {
    return res.status(500).json({ msg: 'pls verify your account' });
  }
  next();
});

export default isAuth;
