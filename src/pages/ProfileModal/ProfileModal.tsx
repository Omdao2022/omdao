import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/atom/userAtom";
import MyProfile from "./MyProfile";
import MyInvestments from "./MyInvestments";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [userState] = useRecoilState(userAtom);
  const [boardNum, setBoardNum] = useState(0);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 transition-opacity duration-500 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div className="bg-gray-700 rounded-lg p-6 pb-14">
        <div className="">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          >
            ×
          </button>
          <button
            onClick={() => setBoardNum(0)}
            style={boardNum === 0 ? { display: "none" } : {}}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 ml-4"
          >
            ←
          </button>
        </div>
        <div className="flex flex-col mx-10 w-[460px] h-[480px]">
          <div style={boardNum !== 0 ? { display: "none" } : {}}>
            <h1 className="text-3xl font-bold font-sans m-6 flex justify-center">
              Hi,&nbsp; <span>{userState.firstName + " " + userState.lastName}</span>
            </h1>

            <div className="flex justify-around mt-28">
              <button
                onClick={() => setBoardNum(1)}
                className="w-40 bg-[#4f75ad] text-sm font-medium rounded-lg p-[10px] hover:bg-[#4e528f] transation duration-150 ease-in-out active:scale-90"
              >
                My Profile
              </button>
              <button
                onClick={() => setBoardNum(2)}
                className="w-40 bg-[#4f75ad] text-sm font-medium rounded-lg p-[10px] hover:bg-[#4e528f] transation duration-150 ease-in-out active:scale-90"
              >
                My Investments
              </button>
            </div>
          </div>
          {boardNum === 1 && <MyProfile />}
          {boardNum === 2 && <MyInvestments />}
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
