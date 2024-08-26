import React, { FC, useState } from "react";
import {
  FiUsers,
  FiMapPin,
  FiNavigation,
  FiMail,
  FiCalendar,
  FiUserCheck,
  FiVoicemail,
} from "react-icons/fi";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/atom/userAtom";
import TokenList from "../../features/user-holding-tokens/ui/UserHolding";

// interface userData {
//   firstName: string;
//   lastName: string;
//   birthday: Date;
//   email: string;
//   country: string;
//   location: string;
//   address: string;
//   zipcode: string;
// }

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [userState] = useRecoilState(userAtom);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 ">
      <div className="bg-gray-700 rounded-lg p-6 pb-14">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col mx-10">
          <h1 className="text-2xl font-bold m-6 flex justify-center">
            Your Information
          </h1>
          <div className="flex flex-col justify-center">
            <div className="my-2 flex justify-between">
              <div className="w-[50%]">
                <h6>Name</h6>
                <div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
                  <FiUsers />
                  &nbsp;| &nbsp;{" "}
                  <span>{userState.firstName + " " + userState.lastName}</span>
                </div>
              </div>
              <div className="w-[50%] ml-4">
                <h6>Birthday</h6>
                <div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
                  <FiCalendar />
                  &nbsp;| &nbsp;{" "}
                  <span>
                    {userState.birthday
                      .toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                  </span>
                </div>
              </div>
            </div>
            <div className="my-2">
              <h6>Email</h6>
              <div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
                <FiMail />
                &nbsp;| &nbsp; <span>{userState.email}</span>
              </div>
            </div>
            <div className="my-2">
              <h6>Location</h6>
              <div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
                <FiMapPin />
                &nbsp;| &nbsp;{" "}
                <span>
                  {userState.address +
                    " / " +
                    userState.location +
                    ". " +
                    userState.country}
                </span>
              </div>
            </div>
            <div className="my-2">
              <h6>Zipcode</h6>
              <div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
                <FiVoicemail className="mt-1" />
                &nbsp;| &nbsp; <span>{userState.zipcode}</span>
              </div>
            </div>
          </div>

          <TokenList />
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
