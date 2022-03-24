import bcrypt from 'bcrypt';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

import User from '../model/userModel.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { createCustomError } from '../utils/appError.js';
import { signpToken, loginToken } from './token.js';

//! create new User

const registerUser = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'User Already Exits' });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  //   const wallet = ethers.w;
  const newUser = {
    name,
    email,
    password: hashedPassword,
    privateKey,
    isVerified: false,
    isAdmin: false
  };

  await newUser.save();
  const url = `${process.env.CLIENT_URL}/user/activate/${activateToken}`;
  await sendMail(user.email, url);
  const message = 'Registration Success !!Please activate email''
  res
    .status(200)
    .json({ message,data:newUser  });
});

const emailVerification   = asyncWrapper(async(req,res,next)=>{
    const { token } = req.body
    const user  = jwt.verify(token,process.env.JWT_ACC_ACTIVATE)
  const 

  const check = await User.findOne({ email })
  if (check) {
    return res.status(400).json({ msg: 'User Already Exits' })
  }
  const id= check._id;
     user = {
        isVerified :true
    }

    await User.findOneAndUpdate({_id:id},{$set:user})

      res.status(200).json({ msg: 'Account activaed Sucessfully' })
})


const loginUser = asyncWrapper(async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return next(createCustomError('user not found', 404))
    }
    const emailMatch = await bcrypt.compare(password, user.password)
  
    if (!emailMatch) {
      return next(createCustomError('password does not match', 404))
    }    
const userData = await getUserInfo(email)
  if (!userData) {
    return next(createCustomError('User not found', 404))
  }
  res.json(userData)

})


// const updateUserRole = asyncWrapper(async (req, res, next) => {
//     const { role, id } = req.body
//     const user = await User.findOneAndUpdate({ _id: id }, { role })
//     if (!user) {
//       return next(createCustomError('unable to update user', 404))
//     }
//     res.json({ msg: 'role updated' })
//   })


export { registerUser,emailVerification,loginUser}