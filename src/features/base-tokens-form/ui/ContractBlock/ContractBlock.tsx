import { FC, useCallback } from 'react';
import classNames from 'classnames';

import { Input } from '../../../../shared/ui';
import { Token } from '../../../../entities';
import { useTranslation } from 'react-i18next';
import { RiArrowUpWideFill, RiArrowDownWideFill } from "react-icons/ri";

export interface ContractBlockProps {
  title: string;
  token: { symbol: string; image?: string; name: string; balance: string };
  amount: string;
  onChangeAmount?: (value: string) => void;
  readonlyAmount?: boolean;
  className?: string;
  exchangeRate?: string;
  maxCount?: string;
  onNextToken?: () => void;
  onPrevToken?: () => void;
}

export const ContractBlock: FC<ContractBlockProps> = ({
  token: { symbol, image, name, balance },
  amount,
  onChangeAmount,
  readonlyAmount = false,
  title,
  className,
  exchangeRate,
  maxCount,
  onNextToken,
  onPrevToken
}) => {
  const { t } = useTranslation();

  const handleChangeSwapAmount = useCallback(
    (value: string) => {
      onChangeAmount && onChangeAmount(value);
    },
    [onChangeAmount]
  );

  return (
    <div
      className={classNames(
        "grid grid-cols-1 gap-4 border rounded-md p-4",
        className
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>{title}</div>
        <div>
          {t("common.form.currentBalance")}: {balance}
        </div>
      </div>
      <div className={`grid ${onPrevToken?"grid-cols-3":"grid-cols-2"} items-center gap-4 align-top`}>
        <Token symbol={symbol} />
        {onPrevToken && <div className="flex flex-col">
          <button onClick={onPrevToken} className="w-10 bg-[#ffffff4f]">
            <span className="flex justify-center">
              <RiArrowUpWideFill />
            </span>
          </button>
          <button onClick={onNextToken} className="w-10 bg-[#ffffff4f]">
            <span className="flex justify-center">
              <RiArrowDownWideFill />
            </span>
          </button>
        </div>
        }
        <div className="flex flex-col justify-end space-y-2 ">
          <Input
            value={amount}
            onChange={handleChangeSwapAmount}
            readOnly={readonlyAmount}
          />
          {maxCount && (
            <p className="text-right">
              {t("common.form.max")}: {maxCount}
            </p>
          )}
        </div>
      </div>
      <div>{name}</div>
      {exchangeRate && (
        <div>
          {t("common.form.price")}: {exchangeRate}
        </div>
      )}
    </div>
  );
};
