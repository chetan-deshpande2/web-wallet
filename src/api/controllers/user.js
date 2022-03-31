import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import { createCustomError } from '../utils/appError.js';
import { signupToken, loginToken } from '../helpers/token.js';
import sendMail from '../utils/mail.js';

//! create new User

const registerUser = asyncWrapper(async (error, req, res, next) => {
  const { name, email, password, privateKey, mnemonics, publicKey } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return next(createCustomError(error.message, 404));
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  let newUser = {
    name,
    email,
    password: hashedPassword,
    privateKey,
    isVerified: false,
    isAdmin: false,
    publicKey
  };

  const saveUser = new User(newUser);
  await saveUser.save();

  const createToken = signupToken(newUser);
  console.log(createToken);

  const url = `${process.env.CLIENT_URL}/user/activate/${createToken}`;
  sendMail(email, url);
  const message = 'Registration Success !!Please activate email';
  res.status(200).json({ message, data: newUser });
});

const emailVerification = asyncWrapper(async (req, res, next) => {
  let { token, email } = req.body;
  let user = jwt.verify(token, process.env.JWT_ACC_ACTIVATE);

  const check = await User.findOne({ email });

  const id = check._id;
  user = {
    isVerified: true
  };

  await User.findOneAndUpdate({ _id: id }, { $set: user });

  res.status(200).json({ msg: 'Account activated Successfully' });
});

const loginUser = asyncWrapper(async (error, req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(createCustomError('user not found', 404));
  }
  const emailMatch = await bcrypt.compare(password, user.password);

  if (!emailMatch) {
    return next(createCustomError(error.message, 404));
  }
  const userData = await getUserInfo(email);
  if (!userData) {
    return next(createCustomError(error.message, 404));
  }

  res.json(userData);
});

const getUserInfo = async (email) => {
  const user = await User.findOne({ email: email }, 'email ');
  return user;
};

const updateUserRole = asyncWrapper(async (req, res, next) => {
  const { role, id } = req.body;
  const user = await User.findOneAndUpdate({ _id: id }, { role });
  if (!user) {
    return next(createCustomError('unable to update user', 404));
  }
  res.status(200).json({ msg: 'role updated' });
});

export { registerUser, emailVerification, loginUser };
