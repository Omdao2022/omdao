import React, { FC, useState, useEffect } from "react";
import { providers } from "ethers";
import { SiweMessage } from "siwe";
import { userAtom } from "../../../recoil/atom/userAtom";
import { useRecoilState } from "recoil";
import { redirect } from "react-router";
import { useNavigate } from "react-router";
import { showToast } from "../../../helper/ToastNotify";
import { useAccount } from "wagmi";


export const Web3Sign: FC = () => {
  const scheme = window.location.protocol.slice(0, -1);
  const domain = window.location.host;
  const origin = window.location.origin;
  const provider = new providers.Web3Provider(window.ethereum);

  const BACKEND_ADDR = "http://localhost:5000/api";

  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const { address: walletAddress } = useAccount();

  async function createSiweMessage(
    address: string,
    statement: string
  ): Promise<string> {
    const res = await fetch(`${BACKEND_ADDR}/getNonce`, {
      credentials: "include",
    });

    const result = await res.json();

    const message = new SiweMessage({
      scheme,
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      nonce: result.nonce
    });

    console.log("message for siwe=======>", message);
    return message.prepareMessage();
  }
  async function signInWithEthereum() {
    const signer = await provider.getSigner();
    const message = await createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    const signature = await signer.signMessage(message);

    const res = await fetch(`${BACKEND_ADDR}/verifySignature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, signature, walletAddress }),
      credentials: "include",
    });

    const result = await res.text();
    if (result) {
      localStorage.setItem('userToken', result);
      setUserInfo({ ...userInfo, joined: true });
      showToast("success", "Signature verified. Logged in");
      navigate("/projects");
    }

  }

  function connectWallet() {
    provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));
  }

  return (
    <>
      <div>
        <button
          className="flex flex-row gap-2 items-center bg-[#CB4D8C] text-sm font-medium rounded-lg p-[10px] hover:bg-[#D05F98] transation duration-150 ease-in-out active:scale-90"
          onClick={signInWithEthereum}
        >
          SIWE
        </button>
      </div>
    </>
  );
};
