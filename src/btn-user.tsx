import { FC, useState } from 'react';
import ProfileModal from './pages/ProfileModal/ProfileModal';
import { useRecoilState } from 'recoil';
import { userAtom } from './recoil/atom/userAtom';
import UserImg from './user.png'

export const BtnUser: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userState] = useRecoilState(userAtom);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className="flex flex-row gap-2 items-center bg-[#4066adc5] text-sm font-medium rounded-lg p-[10px] hover:bg-[#5979b4c5] transation duration-150 ease-in-out active:scale-90">
        <img src={UserImg} alt="UserImg"  className='h-5 w-5'/>
        {userState.firstName + ' ' + userState.lastName[0]}
      </button>
      <ProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}