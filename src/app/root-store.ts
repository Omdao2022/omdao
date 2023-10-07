import { makeAutoObservable } from 'mobx';
import { SignerStore } from '../entities/signer';
import { ProviderStore } from '../entities/provider';
import { Chain, Config, configureChains, createConfig } from 'wagmi';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import {
  AVAILABLE_CHAINS,
  DEFAULT_CHAIN,
  WALLET_CONNECT_PROJECT_ID,
} from '../shared/config';
import { JsonRpcSigner, Provider } from '@ethersproject/providers';
import { watchNetwork } from '@wagmi/core';

export class RootStore {
  private _signerStore: SignerStore | undefined;

  private _providerStore: ProviderStore | undefined;

  private _wagmiConfig: Config | undefined;

  private _ethereumClient: EthereumClient | undefined;

  private _isAppInitialized = false;

  private _refCode: string | undefined;

  private _chain: Chain | null = null;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  protected init = () => {
    try {
      this.createClients();
      this.initStores();
      this.checkRefCode();

      watchNetwork((network) => {
        this._chain = network.chain ?? null;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this._isAppInitialized = true;
    }
  };

  protected initStores = () => {
    const { publicClient } = this.wagmiConfig;

    this._signerStore = new SignerStore();
    this._providerStore = new ProviderStore(publicClient);
  };

  protected createClients = () => {
    const { publicClient, webSocketPublicClient } = configureChains(
      AVAILABLE_CHAINS,
      [w3mProvider({ projectId: WALLET_CONNECT_PROJECT_ID })]
    );

    const wagmiConfig = createConfig({
      autoConnect: true,
      publicClient,
      webSocketPublicClient,
      connectors: w3mConnectors({
        projectId: WALLET_CONNECT_PROJECT_ID,
        chains: AVAILABLE_CHAINS,
      }),
    }) as Config;

    const ethereumClient = new EthereumClient(wagmiConfig, AVAILABLE_CHAINS);

    this._wagmiConfig = wagmiConfig;
    this._ethereumClient = ethereumClient;
  };

  public checkRefCode = () => {
    const refCode = localStorage.getItem('refCode');

    if (refCode) {
      this._refCode = refCode;
    }
  };

  public updateRefCode = (newRefCode: string | undefined) => {
    if (newRefCode) {
      localStorage.setItem('refCode', newRefCode);
    } else {
      localStorage.removeItem('refCode');
    }

    this._refCode = newRefCode;
  };

  public get refCode(): string | undefined {
    return this._refCode;
  }

  public get signerStore(): SignerStore {
    if (!this._signerStore) {
      throw Error('SignerStore не существует');
    }

    return this._signerStore;
  }

  public get providerStore(): ProviderStore {
    if (!this._providerStore) {
      throw Error('ProviderStore не существует');
    }
    return this._providerStore;
  }

  public get ethereumClient(): EthereumClient {
    if (!this._ethereumClient) {
      throw Error('EthereumClient не существует');
    }

    return this._ethereumClient;
  }

  public get wagmiConfig(): Config {
    if (!this._wagmiConfig) {
      throw Error('WagmiClient не существует');
    }

    return this._wagmiConfig;
  }

  public get signerOrProvider(): JsonRpcSigner | Provider | undefined {
    if (this.signerStore.hasSigner) {
      return this.signerStore.signer;
    }
    if (this.providerStore.hasProvider) {
      return this.providerStore.provider;
    }

    return undefined;
  }

  public get isAppInitialized(): boolean {
    return this._isAppInitialized && this.providerStore.hasProvider;
  }

  public get chain(): Chain {
    return this._chain ?? DEFAULT_CHAIN;
  }
}
