import { FC } from 'react';
import { Button, Panel } from '../../../shared/ui';
import { Token } from '../../../entities';
import { useNavigate } from 'react-router';
import { IReferralProject } from '../../../entities/referral-project';
import { ETokenSymbols } from '../../../shared/constants/blockchain';
import { useChainId } from 'wagmi';
import { BLOCKCHAIN } from '../../../shared/constants/blockchain/blockchain';

export interface IReferralProjectProps {
  project: IReferralProject;
}

export const ReferralProject: FC<IReferralProjectProps> = ({
  project: { symbol, amount },
}) => {
  const navigate = useNavigate();

  const chainId = useChainId();
  const onClickShowTransactions = () => {
    navigate(`${symbol}`);
  };

  return (
    <Panel className="space-y-4 flex flex-col justify-center items-center">
      <Token
        symbol={symbol}
        title={BLOCKCHAIN[chainId].tokens[symbol as ETokenSymbols].title}
      />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 items-center w-full">
        <p className="mr-4">Сумма: {parseInt(amount, 10)}$</p>
        <Button onClick={onClickShowTransactions}>Транзакции</Button>
      </div>
    </Panel>
  );
};
