import { ETokenSymbols } from '../../shared/constants/blockchain';
import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useRootStore } from '../../app/use-root-store';
import { useAccount } from 'wagmi';
import { BaseTokensForm } from '../../features/base-tokens-form';
import { TokenAddButton } from '../../features/add-token-to-metamask';
import { BaseOMDProjectStore } from './base-omd-project-form-store';

export interface IBaseProjectFormProps {
  symbol: ETokenSymbols;
}

export const BaseOMDProjectForm: FC<IBaseProjectFormProps> = observer(
  ({ symbol }) => {
    const { t } = useTranslation();
    const rootStore = useRootStore();
    const account = useAccount();
    const { refCode } = useRootStore();
    const [store] = useState(
      () =>
        new BaseOMDProjectStore({
          rootStore,
          refCode,
          accountAddress: account.address,
          symbol,
        })
    );

    const {
      isLoading,
      onSubmit,
      calculateDestinationAmount,
      swapStatus,
      maxCount,
      getupdateMaxCount,
    } = store;

    return (
      <>
        <BaseTokensForm
          title={t('common.purchaseToken', { symbol })}
          onSubmit={onSubmit}
          sourceContractSymbol={ETokenSymbols.OMD}
          destinationContractSymbol={symbol}
          calculateDestinationAmount={calculateDestinationAmount}
          swapStatus={swapStatus}
          isLoading={isLoading}
          maxCount={maxCount}
          getupdateMaxCount={getupdateMaxCount}
        />
        <TokenAddButton
          className="w-full"
          text={t('common.addToken', {
            symbol,
            walletName: 'MetaMask',
          })}
          tokenSymbol={symbol}
        />
      </>
    );
  }
);
