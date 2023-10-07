import { FC } from 'react';
import classNames from 'classnames';
import { TokenAddButton } from './TokenAddButton';
import { useTranslation } from 'react-i18next';
import { ETokenSymbols } from '../../../shared/constants/blockchain';

export interface ITokenAddButtonsProps {
  className?: string;
}

export const TokenAddButtons: FC<ITokenAddButtonsProps> = ({ className }) => {
  const { t } = useTranslation();
  const isShowButtons = window.ethereum?.isMetaMask;

  return isShowButtons ? (
    <div className={classNames('grid gap-4 grid-cols-1 pb-4', className)}>
      <TokenAddButton
        className="w-full"
        text={t('common.addToken', {
          symbol: ETokenSymbols.OMD,
          walletName: 'MetaMask',
        })}
        tokenSymbol={ETokenSymbols.OMD}
      />
    </div>
  ) : (
    <></>
  );
};
