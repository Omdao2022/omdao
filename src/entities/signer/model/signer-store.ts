import { makeAutoObservable } from 'mobx';
import {
  watchNetwork,
  getNetwork,
  watchWalletClient,
  WalletClient,
} from '@wagmi/core';
import { JsonRpcSigner } from '@ethersproject/providers';
import { getEthersSigner } from '../../../shared/lib';

export class SignerStore {
  private _signer: JsonRpcSigner | null = null;

  private _isInitialized = false;

  private _unWatchSigner: (() => void) | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  protected init = () => {
    try {
      const network = getNetwork();
      if (network.chain?.id) {
        this.reInitSignerWatcher(network.chain?.id);
      }

      watchNetwork((network) => {
        if (network.chain?.id) {
          this.reInitSignerWatcher(network.chain?.id);
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      this._isInitialized = true;
    }
  };

  private reInitSignerWatcher = (chainId: number) => {
    if (this._unWatchSigner) {
      this._unWatchSigner();
    }

    this._unWatchSigner = watchWalletClient({ chainId }, this.onChangeSigner);
  };

  private onChangeSigner = async (data: WalletClient | null) => {
    const signer = (await getEthersSigner({ chainId: data?.chain.id })) ?? null;
    this._signer = signer;
  };

  get signer(): JsonRpcSigner {
    if (!this._signer) {
      throw Error('Signer не существует');
    }

    return this._signer;
  }

  get hasSigner(): boolean {
    return !!this._signer;
  }
}
