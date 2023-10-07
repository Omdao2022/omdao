import {
  arbitrum,
  arbitrumGoerli,
  bsc,
  bscTestnet,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
} from 'wagmi/chains';

import { GOERLI_TOKENS } from './goerli';
import { ITokenConstants, ETokenSymbols } from './common';
import { ETHEREUM_TOKENS } from './ethereum';
import { ETHEREUM_SWAP_CONTRACT_DATA } from './ethereum/swap-contract-data';
import { GOERLI_SWAP_CONTRACT_DATA } from './goerli/swap-contract-data';

interface IBlockchain {
  [key: number]: ChainConstants;
}

interface ChainConstants {
  tokens: {
    [key in ETokenSymbols]: ITokenConstants;
  };
  swapContract: any;
}

export const BLOCKCHAIN: IBlockchain = {
  [mainnet.id]: {
    tokens: ETHEREUM_TOKENS,
    swapContract: ETHEREUM_SWAP_CONTRACT_DATA,
  },
  [goerli.id]: {
    tokens: GOERLI_TOKENS,
    swapContract: GOERLI_SWAP_CONTRACT_DATA,
  },
  [arbitrum.id]: {
    tokens: GOERLI_TOKENS,
    swapContract: GOERLI_SWAP_CONTRACT_DATA,
  },
  [arbitrumGoerli.id]: {
    tokens: GOERLI_TOKENS,
    swapContract: GOERLI_SWAP_CONTRACT_DATA,
  },
  [bsc.id]: {
    tokens: GOERLI_TOKENS,
    swapContract: GOERLI_SWAP_CONTRACT_DATA,
  },
  [bscTestnet.id]: {
    tokens: GOERLI_TOKENS,
    swapContract: GOERLI_SWAP_CONTRACT_DATA,
  },
  [polygon.id]: {
    tokens: GOERLI_TOKENS,
    swapContract: GOERLI_SWAP_CONTRACT_DATA,
  },
  [polygonMumbai.id]: {
    tokens: GOERLI_TOKENS,
    swapContract: GOERLI_SWAP_CONTRACT_DATA,
  },
};
