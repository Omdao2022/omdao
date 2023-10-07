import { FC } from 'react';
import { Logo, Nav } from '../../../shared/ui';
import { Web3Button } from '@web3modal/react';
import { ButtonChangeLanguage } from './button-change-language';
import { useTranslation } from 'react-i18next';

export const Header: FC = () => {
  const { t } = useTranslation();
  return (
    <header className="flex items-center h-max py-2">
      <div className="container mx-auto gap-4 flex flex-col xl:flex-row justify-between items-center px-4">
        <Logo />
        <Nav />
        <div className="flex items-center justify-self-center gap-4 lg:justify-self-start">
          <ButtonChangeLanguage />
          <Web3Button label={t('common.connectWallet')} />
        </div>
      </div>
    </header>
  );
};
