import { FC, useState } from 'react';

import { WagmiConfig } from 'wagmi';

import { appRouter } from '../router';
import { RouterProvider } from 'react-router';
import { Web3Modal } from '@web3modal/react';
import { WALLET_CONNECT_PROJECT_ID, I18NProvider } from '../shared/config';
import { RootStore } from './root-store';
import { RootStoreProvider } from './root-store-provider';
import { Loader } from '../shared/ui';
import { observer } from 'mobx-react-lite';

export const App: FC = observer(() => {
  const [rootStore] = useState(() => new RootStore());
  const { isAppInitialized, ethereumClient, wagmiConfig } = rootStore;

  return (
    <I18NProvider>
      <RootStoreProvider rootStore={rootStore}>
        {isAppInitialized ? (
          <>
            <WagmiConfig config={wagmiConfig}>
              <RouterProvider router={appRouter} />
            </WagmiConfig>
            <Web3Modal
              projectId={WALLET_CONNECT_PROJECT_ID}
              ethereumClient={ethereumClient}
              themeMode="dark"
              themeVariables={{
                '--w3m-accent-color': 'rgb(203,77,140)',
                '--w3m-background-color': 'rgb(203,77,140)',
              }}
              enableNetworkView={true}
            />
          </>
        ) : (
          <Loader />
        )}
      </RootStoreProvider>
    </I18NProvider>
  );
});
