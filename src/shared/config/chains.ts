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
import { isProd } from './env';
import { Chain } from 'wagmi';

export const PROD_CHAINS: Chain[] = [mainnet, polygon, bsc, arbitrum];

export const DEV_CHAINS: Chain[] = [
  goerli,
  polygonMumbai,
  bscTestnet,
  arbitrumGoerli,
];

export const AVAILABLE_CHAINS = isProd() ? PROD_CHAINS : DEV_CHAINS;

export const DEFAULT_CHAIN = isProd() ? mainnet : goerli;
