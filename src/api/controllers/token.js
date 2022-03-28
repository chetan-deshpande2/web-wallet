import 'dotenv/config';
import jwt from 'jsonwebtoken';

const signupToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_ACC_ACTIVATE, {
    expiresIn: '20m'
  });
};

const loginToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACC_LOGIN, {
    expiresIn: '7days'
  });
};

export { signupToken, loginToken };
