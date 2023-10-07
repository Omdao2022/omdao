import { FC, useState } from 'react';
import { ReferralTransactionsStore } from '../model';
import { useNavigate, useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Button, Loader } from '../../../shared/ui';
import { ReferralTransactionsList } from './ReferralTransactionsList';
import { ETokenSymbols } from '../../../shared/constants/blockchain';
import { useChainId } from 'wagmi';
import { BLOCKCHAIN } from '../../../shared/constants/blockchain/blockchain';

export const ReferralTransactions: FC = observer(() => {
  const navigate = useNavigate();
  const chainId = useChainId();
  const { symbol = '', refcode = '' } = useParams();
  const [store] = useState(
    () => new ReferralTransactionsStore({ symbol, referal_code: refcode })
  );

  const { isFetchingTransactions, transactions, lastScannedBlockId } = store;

  return (
    <>
      <div className="space-y-4">
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <h1>
          Транзакции {BLOCKCHAIN[chainId].tokens[symbol as ETokenSymbols].title}
        </h1>
        {lastScannedBlockId !== -1 && (
          <p>Последний просканированный блок: {lastScannedBlockId}</p>
        )}
        {isFetchingTransactions ? (
          <Loader className="!h-48" />
        ) : (
          <ReferralTransactionsList transactions={transactions} />
        )}
        <Button onClick={() => navigate(-1)}>Назад</Button>{' '}
      </div>
    </>
  );
});
