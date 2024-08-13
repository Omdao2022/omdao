import { FC } from 'react';
import { FiUsers } from "react-icons/fi";

import { useNavigate } from 'react-router-dom';


export const BtnJoinUs: FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/joinus');
  }

  return (
    <button onClick={handleNavigate} className="flex flex-row gap-2 items-center bg-[#CB4D8C] text-sm font-medium rounded-lg p-[10px] hover:bg-[#D05F98] transation duration-150 ease-in-out active:scale-90">
      <FiUsers className=' text-lg'/>
      Join Us
    </button>
  );
}