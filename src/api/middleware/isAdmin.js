import User from '../models/userModel.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const isAdmin = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({ email });
  if (user.role !== 1) {
    return res.status(500).json({ msg: 'Access Denied' });
  }
  next();
});

export default isAdmin;
