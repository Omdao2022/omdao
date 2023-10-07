import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './TokenAddButton.module.scss';
import { TokenAddButtonStore } from '../../model';
import { observer } from 'mobx-react-lite';
import { Button, ButtonProps } from '../../../../shared/ui';
import { ETokenSymbols } from '../../../../shared/constants/blockchain';
import { useRootStore } from '../../../../app/use-root-store';

export interface TokenAddButtonProps extends ButtonProps {
  className?: string;
  text: string;
  tokenSymbol: ETokenSymbols;
}

/**
 * Использовать только если есть window.ethereum.
 * Например, установлено расширение metamask
 */
export const TokenAddButton: FC<TokenAddButtonProps> = observer(
  ({ className, tokenSymbol, text, ...otherProps }) => {
    const rootStore = useRootStore();
    const [{ addToken }] = useState(
      () => new TokenAddButtonStore(tokenSymbol, window.ethereum, rootStore)
    );

    return (
      <Button
        onClick={addToken}
        className={classNames(styles.tokenAddButton, className)}
        {...otherProps}
      >
        {text}
      </Button>
    );
  }
);
