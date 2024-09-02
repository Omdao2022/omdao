import { FC, useEffect, useState } from 'react';

import { WagmiConfig } from 'wagmi';

import { appRouter } from '../router';
import { RouterProvider } from 'react-router';
import { Web3Modal } from '@web3modal/react';
import { WALLET_CONNECT_PROJECT_ID, I18NProvider } from '../shared/config';
import { RootStore } from './root-store';
import { RootStoreProvider } from './root-store-provider';
import { Loader } from '../shared/ui';
import { observer } from 'mobx-react-lite';
import { useRecoilState } from 'recoil';
// import jwt_decode from "jwt-decode";
import { userAtom } from '../recoil/atom/userAtom';
interface DecodedToken {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  country: string;
  location: string;
  address: string;
  zipcode: string;
  kycPassed: boolean;
  // Add any other fields that are in your JWT
}

export const App: FC = observer(() => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const [rootStore] = useState(() => new RootStore());
  const { isAppInitialized, ethereumClient, wagmiConfig } = rootStore;
  
  const token = localStorage.getItem('token');
  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const decoded: DecodedToken = jwt_decode(token);
  //       // Update the user state with the decoded data
  //       setUserState({
  //         firstName: decoded.firstName,
  //         lastName: decoded.lastName,
  //         email: decoded.email,
  //         birthday: new Date(decoded.birthday),
  //         country: decoded.country,
  //         location: decoded.location,
  //         address: decoded.address,
  //         zipcode: decoded.zipcode,
  //         kycPassed: decoded.kycPassed,
  //         joined: true,
  //       });
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //     }
  //   }
  // }, [token, setUserState]);

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
