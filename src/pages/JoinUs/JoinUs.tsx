import React, { FC, useState } from 'react';
import { JoinUsForm } from '../../features/joinus-form';
import { KycForm } from '../../features/kyc-form';

export const JoinUs: FC = () => {
  const [currentScene, setCurrentScene] = useState<number>(0);

  
  
  const nextScene = () => {
    setCurrentScene((prev) => (prev + 1) % scenes.length);
  };
  
  const scenes = [<JoinUsForm nextScene={ nextScene } />, <KycForm />];

  return (
    <div className="lg:w-2/3 flex flex-col justify-center overflow-y-auto overflow-x-hidden m-auto bg-gray-400 bg-opacity-10 backdrop-blur-sm inset-0 rounded-xl pt-14 relative h-[75vh]">
      {scenes.map((scene, index) => (
        <div
          key={index}
          className={`absolute h-full inset-0 transition-transform duration-700 ease-in-out w-full ${
            index === currentScene
              ? "translate-x-0"
              : index < currentScene
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