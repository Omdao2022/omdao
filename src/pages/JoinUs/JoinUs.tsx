import React, { FC } from 'react';
import { JoinUsForm } from '../../features/joinus-form';

export const JoinUs: FC = () => {
  return (
    <div className='lg:w-2/3 flex flex-row justify-center m-auto bg-gray-400 bg-opacity-10 backdrop-blur-sm inset-0 rounded-xl p-10'>
      <JoinUsForm/>
    </div>
  );
}