import { ITokenConstants } from '../types';
import { USDT_ABI } from '../abis';

export const COMMON_USDT_DATA: Omit<ITokenConstants, 'address'> = {
  symbol: 'USDT',
  abi: USDT_ABI,
  decimal: '6',
  herf: 'https://tether.to',
  name: 'Tether USD',
  title: 'Tether',
};
