import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import styles from './BaseTokensForm.module.scss';
import { observer } from 'mobx-react-lite';
import { SourceContract } from '../SourceContract';
import { DestinationContract } from '../DestinationContract';
import { BaseContractInfo, BaseTokensFormSubmitData } from '../../types';
import { Button, Loader, Arrow } from '../../../../shared/ui';

import { useAccount, useBalance, useChainId, useContractRead } from 'wagmi';
import { Web3Button } from '@web3modal/react';
import { useTranslation } from 'react-i18next';
import { OperationStatus } from '../../../../shared/types';
import { SwapStatus } from '../../../swap-tokens';
import { ETokenSymbols } from '../../../../shared/constants/blockchain';
import { BLOCKCHAIN } from '../../../../shared/constants/blockchain/blockchain';

export interface BaseTokensFormProps {
  title: string;
  onSubmit: (data: BaseTokensFormSubmitData) => Promise<void>;
  sourceContractSymbol: ETokenSymbols;
  destinationContractSymbol: ETokenSymbols;
  isLoading: boolean;
  swapStatus?: OperationStatus | SwapStatus;
  className?: string;
  calculateDestinationAmount?: (
    sourceAmount: string,
    isRearranged: boolean
  ) => string;
  canRearrangeContracts?: boolean;
  disableSubmitButton?: boolean;
  disabledText?: string;
  maxCount?: string;
  getupdateMaxCount?: () => Promise<any>;
  mode?: 'swap';
}

export const BaseTokensForm: FC<BaseTokensFormProps> = observer(
  ({
    title,
    sourceContractSymbol,
    destinationContractSymbol,
    className,
    isLoading,
    swapStatus,
    onSubmit,
    calculateDestinationAmount,
    canRearrangeContracts,
    disableSubmitButton,
    disabledText,
    maxCount,
    getupdateMaxCount,
    mode = 'swap',
  }) => {
    const { t } = useTranslation();

    const loadingText = t(`common.${mode}Status.${swapStatus}`);
    const { data: sd } = useBaseTokenInfo(sourceContractSymbol, true);

    const { data: dd } = useBaseTokenInfo(destinationContractSymbol, true);

    const { isConnected } = useAccount();

    const [sourceData, setSourceData] = useState<BaseContractInfo>();

    const [destinationData, setDestinationData] = useState<BaseContractInfo>();

    const [sourceAmount, setSourceAmount] = useState('0');

    const [isRearranged, setIsRearranged] = useState(false);

    const [maxiCount, setMaxiCount] = useState(maxCount);

    useEffect(() => {
      setSourceData(sd);
    }, [sd]);

    useEffect(() => {
      setDestinationData(dd);
    }, [dd]);

    useEffect(() => {
      updateMaxCount();
    }, [sd, dd]);

    const updateMaxCount = async () => {
      if (getupdateMaxCount) {
        const updCount = await getupdateMaxCount();
        setMaxiCount(await updCount);
      }
    };

    function rearrangeData() {
      setSourceData(destinationData);
      setDestinationData(sourceData);
      setIsRearranged((prevState) => !prevState);
    }

    const onChangeSwapAmount = useCallback(
      (value: string) => {
        const validatePattern = /(^\d*\.?\d{0,6}$)/u;
        const isValid = validatePattern.test(value);

        if (isValid) {
          const isStartWithDot = value.startsWith('.');

          if (isStartWithDot) {
            const pattern = /^\.(?<float>\d{0,6})$/;

            const newSourceAmount = value.replace(pattern, (...props) => {
              const groups = props.pop();
              let result = '0.';

              if (groups.float !== undefined) {
                result += groups.float;
              }

              return result;
            });

            setSourceAmount(newSourceAmount);
          } else {
            const pattern = /(?<int>\d+)(?<dot>\.?)(?<float>\d{0,6})/;

            const newSourceAmount = value.replace(pattern, (...props) => {
              const groups = props.pop();
              let result = '';

              if (groups.int !== undefined) {
                result += Number(groups.int).toString();
              }

              if (groups.dot !== undefined) {
                result += groups.dot;
              }

              if (groups.float !== undefined) {
                result += groups.float;
              }

              return result;
            });

            setSourceAmount(newSourceAmount);
          }
        }
      },
      [setSourceAmount]
    );

    const destinationAmount = useMemo(() => {
      return calculateDestinationAmount
        ? calculateDestinationAmount(sourceAmount, isRearranged)
        : sourceAmount;
    }, [sourceAmount, calculateDestinationAmount, isRearranged]);

    const destinationExchangeRate = () => {
      let destinationAmountForOneToken = '1';

      if (calculateDestinationAmount) {
        const processedValue = calculateDestinationAmount('1', isRearranged);

        if (processedValue !== '0') {
          destinationAmountForOneToken = processedValue;
        }
      }

      const value = (1 / +destinationAmountForOneToken).toFixed(3);

      const symbol = isRearranged
        ? destinationContractSymbol
        : sourceContractSymbol;

      return `${value} ${symbol}`;
    };

    const sourceMaxCount = useMemo(() => {
      let destinationAmountForOneToken = '1';

      if (calculateDestinationAmount) {
        const processedValue = calculateDestinationAmount('1', isRearranged);

        if (processedValue !== '0') {
          destinationAmountForOneToken = (1 / +processedValue).toString();
        }
      }

      return maxiCount
        ? (+maxiCount * +destinationAmountForOneToken).toFixed(6)
        : undefined;
    }, [maxiCount, calculateDestinationAmount, isRearranged]);

    const isDataFetched = sourceData && destinationData;

    const isButtonSubmitDisabled =
      !sourceAmount ||
      Number(sourceAmount) < 1 ||
      !sourceData ||
      Number(sourceData.balance) < Number(sourceAmount) ||
      Number(sourceMaxCount) < Number(sourceAmount);

    const onSubmitForm = useCallback(async () => {
      await onSubmit({ sourceAmount, destinationAmount, isRearranged });
    }, [onSubmit, sourceAmount, destinationAmount, isRearranged]);

    return (
      <div className="grid grid-cols-1 gap-4 w-full h-max">
        <h2>{title}</h2>
        {isDataFetched ? (
          <>
            {isLoading ? (
              <Loader text={loadingText} />
            ) : (
              <>
                <SourceContract
                  fullContractInfo={sourceData}
                  amount={sourceAmount}
                  onChangeAmount={onChangeSwapAmount}
                  maxCount={sourceMaxCount}
                />
                {canRearrangeContracts && (
                  <Arrow
                    onClick={rearrangeData}
                    className={styles.buttonRearrange}
                  />
                )}
                <DestinationContract
                  fullContractInfo={destinationData}
                  amount={destinationAmount}
                  exchangeRate={destinationExchangeRate()}
                  maxCount={maxiCount}
                />
                {isConnected ? (
                  <Button
                    type="button"
                    onClick={onSubmitForm}
                    disabled={isButtonSubmitDisabled || disableSubmitButton}
                    title={disabledText}
                  >
                    Совершить сделку
                  </Button>
                ) : (
                  <div className="flex justify-center items-center">
                    <Web3Button label={t('common.connectWallet')} />
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
);

const useBaseTokenInfo = (
  tokenSymbol: ETokenSymbols,
  watch = false
): { data: BaseContractInfo | undefined; isLoading: boolean } => {
  const chainId = useChainId();
  const [result, setResult] = useState<BaseContractInfo>();
  const { address } = useAccount();
  const token = BLOCKCHAIN[chainId].tokens[tokenSymbol];
  const {
    data: balance,
    isLoading: isLoadingBalance,
    error: balanceError,
  } = useBalance({
    address,
    token: token.address,
    watch,
  });

  const {
    data: name,
    isLoading: isLoadingName,
    error,
  } = useContractRead({
    address: token.address,
    abi: token.abi,
    functionName: 'name',
  });

  useEffect(() => {
    if (isLoadingBalance || isLoadingName) {
      return;
    }

    fetchData();

    async function fetchData() {
      const image = await import(
        `../../../../app/images/tokens/${tokenSymbol.toLowerCase()}.webp`
      )
        .then((module) => module.default)
        .catch();

      setResult({
        name: name as unknown as string,
        decimals: balance ? balance.decimals.toString() : '0',
        symbol: tokenSymbol,
        balance: balance ? balance.formatted : '0',
        image,
      });
    }
  }, [isLoadingBalance, isLoadingName, balance]);

  return {
    data: result,
    isLoading: isLoadingBalance || isLoadingName,
  };
};
