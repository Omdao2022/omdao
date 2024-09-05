import React, { FC, useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { tabAtom } from "../../../recoil/atom/tabAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Web3Sign } from "../../web3-sign";
import { useNavigate } from "react-router";

export const KycConfirmForm: FC = () => {
  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(false);
  const tabState = useRecoilValue(tabAtom);

  useEffect(() => {
    if (tabState.tabId == 2) handleExplosion();
  }, [tabState.tabId]);

  const handleExplosion = () => {
    setTimeout(() => {
      setIsExploding(true);
    }, 300);
    setTimeout(() => {
      setIsExploding(false);
    }, 2000); // Adjust duration as needed
  };

  return (
    <div className="flex flex-col justify-start gap-20 items-center h-full w-full relative px-28 py-20">
      <div className="flex flex-col w-full justify-start items-center">
        {isExploding && (
          <ConfettiExplosion
            particleCount={500} // Adjust particle count
            particleSize={5} // Adjust particle size
            duration={1000} // Adjust duration
            force={0.1} // Adjust explosion force
            width={800} // Adjust explosion width
            height={800} // Adjust explosion height
            colors={["#FFC700", "#FF0000", "#2E3191", "#41BB07", "#FFFFFF"]} // Customize colors
          />
        )}
      </div>
      <div className=" absolute flex flex-col justify-start gap-20  font-sans ">
        <div className="flex flex-col justify-start gap-10">
          <div className="flex flex-col justify-start gap-2">
            <h2 className=" font-sans text-center ">
              Congrats! Now you registered
            </h2>
            <p className="text-[#ffffff96] text-[20px] text-center">
              Please login using SIWE.
            </p>
          </div>
          <div className="w-full flex flex-row justify-center px-24">
            <Web3Sign />
          </div>
        </div>
        <div className="flex flex-col justify-start gap-6">
          <p className="text-white text-[24px] text-center font-medium">
            Subscribe to our Telegram channel and bot.
          </p>
          <div className="flex flex-col justify-center gap-4  px-24">
            <button
              onClick={() => navigate("https://t.me/omdao_en")}
              className="flex flex-row w-full py-2 justify-center items-center gap-6 bg-[#CB4D8C] rounded-lg"
            >
              <span className="w-5 h-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6993 3.85196L16.0586 16.3051C15.8593 17.1838 15.3399 17.4026 14.6018 16.9888L10.578 14.0238L8.63675 15.8913C8.42175 16.1063 8.24237 16.2857 7.828 16.2857L8.11738 12.1882L15.5743 5.45008C15.8986 5.16133 15.5036 5.00071 15.0705 5.29008L5.85175 11.0951L1.883 9.85258C1.01987 9.58321 1.00425 8.98946 2.063 8.57508L17.5861 2.59446C18.3049 2.32508 18.9336 2.75383 18.6993 3.85196Z"
                    fill="white"
                  />
                </svg>
              </span>
              <p className="flex text-[14px] w-40 ">Join Telegram Channel</p>
            </button>
            <button
              onClick={() => navigate("https://t.me/omdao_vc_bot")}
              className="flex flex-row w-full py-2 justify-center items-center gap-6 bg-[#CB4D8C] rounded-lg"
            >
              <span className="w-5 h-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6993 3.85196L16.0586 16.3051C15.8593 17.1838 15.3399 17.4026 14.6018 16.9888L10.578 14.0238L8.63675 15.8913C8.42175 16.1063 8.24237 16.2857 7.828 16.2857L8.11738 12.1882L15.5743 5.45008C15.8986 5.16133 15.5036 5.00071 15.0705 5.29008L5.85175 11.0951L1.883 9.85258C1.01987 9.58321 1.00425 8.98946 2.063 8.57508L17.5861 2.59446C18.3049 2.32508 18.9336 2.75383 18.6993 3.85196Z"
                    fill="white"
                  />
                </svg>
              </span>
              <p className="flex justify-center text-[14px] w-40">
                Join Telegram Bot
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
