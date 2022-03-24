import Users from '../model/userModel.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const isAuth = asyncWrapper(async (req, res, next) => {});

export default isAuth;
