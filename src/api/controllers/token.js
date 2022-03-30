import 'dotenv/config';
import jwt from 'jsonwebtoken';

const signupToken = (newUser) => {
  const token = jwt.sign(newUser, process.env.JWT_ACC_ACTIVATE, {
    expiresIn: '20m'
  });

  return token;
};

const loginToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACC_LOGIN, {
    expiresIn: '7days'
  });
};

export { signupToken, loginToken };
