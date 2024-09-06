import { ETokenSymbols } from "../../shared/constants/blockchain";
import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useRootStore } from "../../app/use-root-store";
import { useAccount } from "wagmi";
import { BaseTokensForm } from "../../features/base-tokens-form";
import { TokenAddButton } from "../../features/add-token-to-metamask";
import { BaseOMDProjectStore } from "./base-omd-project-form-store";

export interface IBaseProjectFormProps {
  symbol: ETokenSymbols;
}

export const BaseOMDProjectForm: FC<IBaseProjectFormProps> = observer(
  ({ symbol }) => {
    const { t } = useTranslation();
    const rootStore = useRootStore();
    const account = useAccount();
    const { refCode } = useRootStore();
    const [sourceToken, setSourceToken] = useState<ETokenSymbols>(
      ETokenSymbols.USDT
    );
    const [store] = useState(
      () =>
        new BaseOMDProjectStore({
          rootStore,
          refCode,
          accountAddress: account.address,
          symbol,
        })
    );

    console.log("here the swap page????");

    const {
      isLoading,
      onSubmit,
      calculateDestinationAmount,
      swapStatus,
      maxCount,
      getupdateMaxCount,
    } = store;

    const onNextToken = () => {
      if (sourceToken == ETokenSymbols.OMD) setSourceToken(ETokenSymbols.USDT);
      else setSourceToken(ETokenSymbols.OMD);
    };

    const onPrevToken = () => {
      if (sourceToken == ETokenSymbols.OMD) setSourceToken(ETokenSymbols.USDT);
      else setSourceToken(ETokenSymbols.OMD);
    };

    return (
      <>
        <BaseTokensForm
          title={t("common.purchaseToken", { symbol })}
          onSubmit={onSubmit}
          sourceContractSymbol={sourceToken}
          destinationContractSymbol={symbol}
          calculateDestinationAmount={calculateDestinationAmount}
          swapStatus={swapStatus}
          isLoading={isLoading}
          maxCount={maxCount}
          getupdateMaxCount={getupdateMaxCount}
          onNextToken={onNextToken}
          onPrevToken={onPrevToken}
        />
        <TokenAddButton
          className="w-full"
          text={t("common.addToken", {
            symbol,
            walletName: "MetaMask",
          })}
          tokenSymbol={symbol}
        />
      </>
    );
  }
);
