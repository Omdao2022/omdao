import { makeAutoObservable, reaction } from 'mobx';
import { BaseTokenInfo } from '../types';

import { Address } from 'wagmi';
import { ETokenSymbols } from '../../../shared/constants/blockchain';
import { RootStore } from '../../../app/root-store';
import { BLOCKCHAIN } from '../../../shared/constants/blockchain/blockchain';

export class TokenStore {
  private _decimals = '';

  private _address: Address = '0x';

  private _name = '';

  constructor(private _symbol: ETokenSymbols, private _rootStore: RootStore) {
    makeAutoObservable(this);

    const token = BLOCKCHAIN[this._rootStore.chain.id].tokens[_symbol];

    this._name = token.name;
    this._decimals = token.decimal;
    this._address = token.address;
  }

  public get address(): Address {
    return this._address;
  }

  public get decimals(): string {
    return this._decimals;
  }

  public get name(): string {
    return this._name;
  }

  public get symbol(): string {
    return this._symbol;
  }

  public get baseTokenInfo(): BaseTokenInfo {
    return {
      name: this.name,
      symbol: this.symbol,
      decimals: this.decimals,
      address: this.address,
    };
  }

  updateTokenByChainReaction = reaction(
    () => this._rootStore.chain,
    (chain) => {
      const token = BLOCKCHAIN[chain.id].tokens[this._symbol];

      this._name = token.name;
      this._decimals = token.decimal;
      this._address = token.address;
    }
  );
}
