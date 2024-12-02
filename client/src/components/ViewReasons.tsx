import React from 'react';
import { Dialog } from '@headlessui/react';
import Loading from './Loading';
import ModalWrapper from './ModalWrapper';
import { useGetDisciplineQuery } from '../redux/slices/api/docsApiSlice';

interface AdminChangePasswordProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const ViewReasons: React.FC<AdminChangePasswordProps> = ({ open, setOpen, id }) => {
  const { data, isLoading, error } = useGetDisciplineQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ModalWrapper open={open} setOpen={setOpen}>
        <p className="text-red-500">Failed to load data.</p>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
        Reasons
      </Dialog.Title>
      <div className='mt-2 flex flex-col gap-6'>
        {data && data.length > 0 ? (
          data.map((item, i) => (
            <p key={i}><span className='bg-gray-500 rounded-full px-1 text-white text-center'>{i+1}</span> {item.reasons}</p>
          ))
        ) : (
          <p>No reasons found.</p>
        )}
      </div>
    </ModalWrapper>
  );
};

export default ViewReasons;
