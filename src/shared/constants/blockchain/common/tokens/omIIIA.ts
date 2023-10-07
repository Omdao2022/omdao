import { ITokenConstants } from '../types';
import { WRAPPED_TOKEN_ABI } from '../abis';

export const COMMON_IIIA_DATA: Omit<ITokenConstants, 'address'> = {
  symbol: 'omIIIA',
  abi: WRAPPED_TOKEN_ABI,
  decimal: '6',
  herf: 'https://t.me/c/1802432571/571',
  name: 'OM DAO Wrapped IIIA',
  title: 'Web3Auth',
};
