import React, { FC, useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { tabAtom } from "../../../recoil/atom/tabAtom";
import { useRecoilState, useRecoilValue } from "recoil";


export const KycConfirmForm: FC = () => {
  const [isExploding, setIsExploding] = useState(false);
  const tabState = useRecoilValue(tabAtom);

  useEffect(() => {
    if (tabState.tabId == 2) handleExplosion();
  }, [tabState.tabId])

  const handleExplosion = () => {
    setTimeout(() => {
      
      setIsExploding(true);
    }, 400);
    setTimeout(() => {
      setIsExploding(false);
    }, 3000); // Adjust duration as needed
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full relative">
      <div className="flex flex-col h-full w-full justify-start items-center">
        {isExploding && (
          <ConfettiExplosion
            particleCount={500} // Adjust particle count
            particleSize={5} // Adjust particle size
            duration={2000} // Adjust duration
            force={0.1} // Adjust explosion force
            width={800} // Adjust explosion width
            height={800} // Adjust explosion height
            colors={["#FFC700", "#FF0000", "#2E3191", "#41BB07", "#FFFFFF"]} // Customize colors
          />
        )}
      </div>
      <div className=" absolute text-center  font-sans ">
        <h2 className=" font-sans">Congrats! Now you registered</h2>
        <p>There will be message sign step.</p>
      </div>
    </div>
  );
};
