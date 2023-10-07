import { makeAutoObservable } from 'mobx';
import { getNetwork, watchNetwork, watchPublicClient } from '@wagmi/core';
import { PublicClient } from 'wagmi';
import { getEthersProvider } from '../../../shared/lib';
import { Provider } from '@ethersproject/providers';

export class ProviderStore {
  private _provider: null | Provider = null;

  private _isInitialized = false;

  private _unWatchProvider: (() => void) | undefined = undefined;

  constructor(defaultProvider: PublicClient) {
    makeAutoObservable(this);
    this._provider = getEthersProvider({ chainId: defaultProvider.chain.id });
    this.init();
  }

  protected init = () => {
    try {
      const network = getNetwork();
      if (network.chain?.id) {
        this.reInitProviderWatcher(network.chain.id);
      }

      watchNetwork((net) => {
        if (net.chain?.id) {
          this.reInitProviderWatcher(net.chain?.id);
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      this._isInitialized = true;
    }
  };

  private reInitProviderWatcher = (chainId: number) => {
    if (this._unWatchProvider) {
      this._unWatchProvider();
    }

    this._unWatchProvider = watchPublicClient(
      { chainId },
      this.onChangeProvider
    );
  };

  private onChangeProvider = (data: PublicClient) => {
    const provider = getEthersProvider({ chainId: data.chain.id });
    this._provider = provider;
  };

  get provider(): Provider {
    if (!this._provider) {
      throw Error('Provider не существует');
    }

    return this._provider;
  }

  get hasProvider(): boolean {
    return !!this._provider;
  }
}
