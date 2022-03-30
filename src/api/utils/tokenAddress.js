import 'dotenv/config';
import { ethers } from 'ethers';
import { tokenABI } from '../abis/tokenABI.js';

const tokenAddress = '0x6C032B526c2F304d4cd946658a3E9c39C5aDb4ee';
const provider = new ethers.providers.JsonRpcProvider(
  ` https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RUI}`
);

const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

export { contract };
