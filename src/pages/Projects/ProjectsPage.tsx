import { FC, useEffect } from 'react';
import { AllProjects } from '../../features/show-projects';
import { useTranslation } from 'react-i18next';
import { useAccount, useConnect } from 'wagmi';

export const ProjectsPage: FC = () => {
  const { t } = useTranslation();
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    const connectWallet = async () => {
      if (!isConnected) {
        console.log("Wallet connect error");
        await connect();
      }
    }
    connectWallet();
  }, [isConnected, connect, connectors])

  return (
    <>
      <h2 className="mb-4">{t('common.projects')}</h2>
      <AllProjects />
    </>
  );
};
