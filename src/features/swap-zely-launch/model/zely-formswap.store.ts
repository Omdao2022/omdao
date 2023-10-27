import { makeAutoObservable } from 'mobx';
import { Contract } from '@ethersproject/contracts';
import { BaseTokensFormSubmitData } from '../../base-tokens-form';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { formatBytes32String } from '@ethersproject/strings';

import { SwapStatus } from '../../swap-tokens';
import { RootStore } from '../../../app/root-store';

import { ETokenSymbols } from '../../../shared/constants/blockchain';
import { BLOCKCHAIN } from '../../../shared/constants/blockchain/blockchain';

export class ZELYFormSwapStore {
  private _exchangeRate = 0;

  private _isInitialized = false;

  private _swapStatus: SwapStatus = SwapStatus.READY;

  private _refcode = 'base';

  private _accountAddress = '0x0000000000000000000000000000000000000000';

  private _maxCount = '0';

  constructor(
    private _rootStore: RootStore,
    refCode: string | undefined,
    accountAddress: string | undefined
  ) {
    makeAutoObservable(this);

    this._refcode = refCode ? refCode : 'base';
    this._accountAddress = accountAddress
      ? accountAddress
      : '0x0000000000000000000000000000000000000000';

    this.init();
  }

  private init = async (): Promise<void> => {
    try {
      const bytes32Symbol = formatBytes32String(ETokenSymbols.Zely);

      const bigNumber = await this.swapContract.mySwapPrice(bytes32Symbol);

      this._exchangeRate = +formatUnits(bigNumber, '6');

      const bytes32SymbolTO = await this.swapContract.getSwapPair(
        bytes32Symbol
      );

      const maxCount = await this.swapContract.getSwapTokensUnlocked(
        bytes32SymbolTO,
        this._accountAddress
      );

      this._maxCount = formatUnits(
        maxCount,
        await this.sourceContract.decimals()
      );
    } catch (e) {
      console.log(e);
    } finally {
      this._isInitialized = true;
    }
  };

  public onSubmit = async ({ sourceAmount }: BaseTokensFormSubmitData) => {
    this._swapStatus = SwapStatus.STARTING;

    try {
      const decimals = await this.sourceContract.decimals();
      const unit256Amount = parseUnits(sourceAmount, decimals);

      this._swapStatus = SwapStatus.AWAITING_CONFIRM;
      const approveTransaction = await this.sourceContract.approve(
        this.swapContract.address,
        unit256Amount
      );

      this._swapStatus = SwapStatus.AWAITING_BLOCK_MINING;
      await approveTransaction.wait();

      this._swapStatus = SwapStatus.AWAITING_CONFIRM;
      const bytes32Symbol = formatBytes32String(ETokenSymbols.ARA);

      const swapTransaction = await this.swapContract.swapToken(
        bytes32Symbol,
        unit256Amount
      );

      this._swapStatus = SwapStatus.AWAITING_BLOCK_MINING;
      await swapTransaction.wait();

      this._swapStatus = SwapStatus.SUCCESS;
    } catch (e) {
      this._swapStatus = SwapStatus.ERROR;
      console.log(e);
    }
  };

  public calculateDestinationAmount = (sourceAmount: string): string => {
    return this._exchangeRate.toString() === '0'
      ? '0'
      : (+sourceAmount / this._exchangeRate).toString();
  };

  public get sourceContract(): Contract {
    const token =
      BLOCKCHAIN[this._rootStore.chain.id].tokens[ETokenSymbols.Zely];

    return new Contract(
      token.address,
      token.abi,
      this._rootStore.signerOrProvider
    );
  }

  public get destinationContract(): Contract {
    const token =
      BLOCKCHAIN[this._rootStore.chain.id].tokens[ETokenSymbols.OMD];

    return new Contract(
      token.address,
      token.abi,
      this._rootStore.signerOrProvider
    );
  }

  public get swapContract(): Contract {
    const swapContract = BLOCKCHAIN[this._rootStore.chain.id].swapContract;

    return new Contract(
      swapContract.address,
      swapContract.abi,
      this._rootStore.signerOrProvider
    );
  }

  public get isLoading(): boolean {
    return (
      !this._isInitialized ||
      [
        SwapStatus.STARTING,
        SwapStatus.AWAITING_CONFIRM,
        SwapStatus.AWAITING_BLOCK_MINING,
      ].includes(this._swapStatus)
    );
  }

  public get swapStatus(): SwapStatus {
    return this._swapStatus;
  }

  public get maxCount(): string {
    return this._maxCount;
  }

  public getupdateMaxCount = async () => {
    const maxCount = await this.swapContract.getSwapTokensUnlocked(
      formatBytes32String(ETokenSymbols.OMD),
      this._accountAddress
    );

    const maxsCount = formatUnits(
      maxCount,
      await this.sourceContract.decimals()
    );

    return maxsCount;
  };
}
