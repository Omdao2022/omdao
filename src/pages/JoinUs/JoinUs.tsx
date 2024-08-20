import React, { FC, useState } from 'react';
import { JoinUsForm } from '../../features/joinus-form';
import { KycForm } from '../../features/kyc-form';
import { KycConfirmForm } from '../../features/kyc-confirm-form';
import { tabAtom } from '../../recoil/atom/tabAtom';
import { useRecoilState } from 'recoil';

export const JoinUs: FC = () => {
  const [tabState, setTabState] = useRecoilState(tabAtom);

  
  
  const nextScene = () => {
    setTabState((oldState) => { console.log(oldState); console.log({ tabId: (oldState.tabId + 1) % scenes.length }); return { tabId: (oldState.tabId + 1) % scenes.length }; });
    
  };
  
  const scenes = [<JoinUsForm nextScene={nextScene} />, <KycForm nextScene={ nextScene } />, <KycConfirmForm/>];

  return (
    <div className="lg:w-2/3 flex flex-col justify-center overflow-y-auto overflow-x-hidden m-auto bg-gray-400 bg-opacity-10 backdrop-blur-sm inset-0 rounded-xl pt-14 relative h-[75vh]">
      {scenes.map((scene, index) => (
        <div
          key={index}
          className={`absolute h-full inset-0 transition-transform duration-700 ease-in-out w-full ${
            index === tabState.tabId
              ? "translate-x-0"
              : index < tabState.tabId
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          {scene}
        </div>
      ))}
      {/* <button
        onClick={nextScene}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow"
      >
        Next
      </button> */}
    </div>
  );
}