import { makeAutoObservable } from 'mobx';
import { Ethereum, TokenStore } from '../../../entities';
import { ETokenSymbols } from '../../../shared/constants/blockchain';
import { RootStore } from '../../../app/root-store';

export class TokenAddButtonStore {
  private readonly _baseTokenInfo: TokenStore;

  constructor(
    private _tokenSymbol: ETokenSymbols,
    private readonly _ethereum: Ethereum,
    private readonly _rootStore: RootStore
  ) {
    makeAutoObservable(this);
    this._baseTokenInfo = new TokenStore(_tokenSymbol, _rootStore);
  }

  public addToken = () => {
    try {
      this._ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: this.baseTokenInfo.address,
            symbol: this.baseTokenInfo.symbol,
            decimals: this.baseTokenInfo.decimals,
            image: '',
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  private get baseTokenInfo(): TokenStore {
    return this._baseTokenInfo;
  }
}
