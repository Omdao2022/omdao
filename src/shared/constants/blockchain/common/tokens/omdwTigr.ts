import { ITokenConstants } from '../types';
import { WRAPPED_TOKEN_ABI } from '../abis';

export const COMMON_TIGR_DATA: Omit<ITokenConstants, 'address'> = {
  symbol: 'omdwTigr',
  abi: WRAPPED_TOKEN_ABI,
  decimal: '6',
  herf: 'https://selectedpublic.notion.site/Tiger-Trade-a081fd79e144442dbf133a83eba5fb68',
  name: 'OM DAO Wrapped Tigr',
  title: 'Tiger Trade',
};
