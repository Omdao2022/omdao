import { FC, useState } from 'react';

import { SwapFormStore } from '../../model';
import { observer } from 'mobx-react-lite';
import { BaseTokensForm } from '../../../base-tokens-form';
import { useSearchParams } from 'react-router-dom';
import { calculateSwapDestinationAmount } from '../../lib';
import { useRootStore } from '../../../../app/use-root-store';
import { useTranslation } from 'react-i18next';
import { ETokenSymbols } from '../../../../shared/constants/blockchain';

export const SwapForm: FC = observer(() => {
  const { t } = useTranslation();
  const rootStore = useRootStore();

  const [params] = useSearchParams([
    ['tokenA', ETokenSymbols.USDT],
    ['tokenB', ETokenSymbols.OMD],
  ]);

  const tokenASymbol = params.get('tokenA') as ETokenSymbols;
  const tokenBSymbol = params.get('tokenB') as ETokenSymbols;

  const [{ onSwap, swapStatus, isSwapping }] = useState(
    () => new SwapFormStore(rootStore, tokenASymbol, tokenBSymbol)
  );

  return (
    <BaseTokensForm
      title={t('common.swapTokens')}
      onSubmit={onSwap}
      sourceContractSymbol={tokenASymbol}
      destinationContractSymbol={tokenBSymbol}
      isLoading={isSwapping}
      swapStatus={swapStatus}
      calculateDestinationAmount={calculateSwapDestinationAmount}
      canRearrangeContracts
    />
  );
});
