import React, { FC, useState, useEffect } from "react";
import { providers } from "ethers";
import { SiweMessage } from "siwe";

export const Web3Sign: FC = () => {
  const scheme = window.location.protocol.slice(0, -1);
  const domain = window.location.host;
  const origin = window.location.origin;
  const provider = new providers.Web3Provider(window.ethereum);

  function createSiweMessage(address: string, statement: string): string {
    const message = new SiweMessage({
      scheme,
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
    });
    console.log("message for siwe=======>", message);
    return message.prepareMessage();
  }

  async function signInWithEthereum() {
    const signer = await provider.getSigner();
    const message = createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    console.log(await signer.signMessage(message));
  }

  function connectWallet() {
    provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));
  }

  return (
    <>
      <div>
        <button onClick={signInWithEthereum}>SIWE</button>
        <button onClick={connectWallet}>WalletCon</button>
      </div>
    </>
  );
};
