import { Contract } from '@ethersproject/contracts';
import { makeAutoObservable } from 'mobx';
import { SwapStatus } from '../types';

import { formatUnits, parseUnits } from '@ethersproject/units';
import { BaseTokensFormSubmitData } from '../../base-tokens-form';
import { RootStore } from '../../../app/root-store';
import { ETokenSymbols } from '../../../shared/constants/blockchain';
import { BLOCKCHAIN } from '../../../shared/constants/blockchain/blockchain';

export class SwapFormStore {
  private _swapStatus: SwapStatus = SwapStatus.READY;

  constructor(
    private _rootStore: RootStore,
    private _tokenASymbol: ETokenSymbols,
    private _tokenBSymbol: ETokenSymbols
  ) {
    makeAutoObservable(this);
  }

  public onSwap = async ({
    sourceAmount,
    destinationAmount,
    isRearranged,
  }: BaseTokensFormSubmitData) => {
    this.swapStatus = SwapStatus.STARTING;

    if (isRearranged) {
      await this.sellOMD(sourceAmount);
    } else {
      await this.buyOMD(destinationAmount);
    }
  };

  private buyOMD = async (amount: string) => {
    try {
      const allowedAmount = await this.fetchAllowedAmount();

      if (allowedAmount !== 0 && allowedAmount < +amount) {
        await this.approveSwapAmount('0');
      }

      if (allowedAmount < +amount) {
        await this.approveSwapAmount(amount);
      }

      await this.buyToken(amount);
      this.swapStatus = SwapStatus.SUCCESS;
    } catch (e) {
      this.swapStatus = SwapStatus.ERROR;
      console.log(e);
    }
  };

  private fetchAllowedAmount = async (): Promise<number> => {
    if (!this._sourceContract.allowance) {
      return 0;
    }

    try {
      const signerAddress =
        await this._rootStore.signerStore.signer.getAddress();
      const decimals = await this._sourceContract.decimals();
      const allowanceAmount = await this._sourceContract.allowance(
        signerAddress,
        this._destinationContract.address
      );
      return +formatUnits(allowanceAmount, decimals);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  private approveSwapAmount = async (amount: string): Promise<void> => {
    this.swapStatus = SwapStatus.AWAITING_CONFIRM;

    try {
      const decimals = await this._sourceContract.decimals();

      const unit256Amount = parseUnits(amount, decimals);
      const approveTransaction = await this._sourceContract.approve(
        this._destinationContract.address,
        unit256Amount
      );
      this.swapStatus = SwapStatus.AWAITING_BLOCK_MINING;
      await approveTransaction.wait();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  private buyToken = async (amount: string): Promise<void> => {
    this.swapStatus = SwapStatus.AWAITING_CONFIRM;

    try {
      const decimals = await this._destinationContract.decimals();

      const unit256Amount = parseUnits(amount, decimals);
      const buyTransaction = await this._destinationContract.buyToken(
        unit256Amount
      );
      this.swapStatus = SwapStatus.AWAITING_BLOCK_MINING;
      await buyTransaction.wait();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  sellOMD = async (amount: string) => {
    this.swapStatus = SwapStatus.AWAITING_CONFIRM;

    try {
      const decimals = await this._sourceContract.decimals();

      const unit256Amount = parseUnits(amount, decimals);
      const sellTransaction = await this._destinationContract.sellToken(
        unit256Amount
      );
      this.swapStatus = SwapStatus.AWAITING_BLOCK_MINING;
      await sellTransaction.wait();
      this.swapStatus = SwapStatus.SUCCESS;
    } catch (e) {
      this.swapStatus = SwapStatus.ERROR;
      console.log(e);
    }
  };

  public get _sourceContract(): Contract {
    const token =
      BLOCKCHAIN[this._rootStore.chain.id].tokens[this._tokenASymbol];

    return new Contract(
      token.address,
      token.abi,
      this._rootStore.signerOrProvider
    );
  }

  public get _destinationContract(): Contract {
    const token =
      BLOCKCHAIN[this._rootStore.chain.id].tokens[this._tokenBSymbol];

    return new Contract(
      token.address,
      token.abi,
      this._rootStore.signerOrProvider
    );
  }

  public get destinationContract(): Contract {
    return this._destinationContract;
  }

  public get swapStatus(): SwapStatus {
    return this._swapStatus;
  }

  private set swapStatus(value: SwapStatus) {
    this._swapStatus = value;
  }

  public get isSwapping(): boolean {
    return [
      SwapStatus.STARTING,
      SwapStatus.AWAITING_CONFIRM,
      SwapStatus.AWAITING_BLOCK_MINING,
    ].includes(this._swapStatus);
  }
}
