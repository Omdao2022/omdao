import React, { useState, useRef, useEffect } from 'react';
import ProfileModal from '../../../pages/ProfileModal/ProfileModal';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../../recoil/atom/userAtom';
import UserImg from './user.png'

const BtnUser: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [userState, setUserState] = useRecoilState(userAtom);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setIsOpen(false);

    // Handle specific actions based on the selected option
    if (option === 'User Profile') {
      openModal();
    } else if (option === 'Log Out') {
      localStorage.removeItem('token');
      setUserState({
                firstName: '',
                lastName: '',
                email: '',
                birthday: new Date(),
                country: '',
                location: '',
                address: '',
                zipcode: '',
                kycPassed: false,
                joined: false,
              });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          className="flex flex-row gap-2 items-center bg-[#4066adc5] text-sm font-medium rounded-lg p-[10px] hover:bg-[#5979b4c5] transation duration-150 ease-in-out active:scale-90"
        >
          <img src={UserImg} alt="UserImg" className='h-5 w-5' />
          {userState.firstName + ' ' + userState.lastName[0]}
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => handleOptionClick('User Profile')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
            >
              My Info
            </button>
            <button
              onClick={() => handleOptionClick('Log Out')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
      <ProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default BtnUser;