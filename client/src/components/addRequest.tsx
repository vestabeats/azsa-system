import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import Button from './Button';
import ModalWrapper from './ModalWrapper';
import { toast } from 'sonner';
import {  useAddRequestMutation } from '../redux/slices/api/attestationApiSlice';
import SelectList from './SelectList';

interface AddRequestProps {
  open: boolean;
  setOpen: (open: boolean) => void;

}

interface FormData {
  title: string;
}

const AddRequest: React.FC<AddRequestProps> = ({ open, setOpen}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [addRequestA] = useAddRequestMutation();
  const VAL = ["Attestation de bourse", "Authorization","Confirmations"];
  const [value, setValue] = React.useState(VAL[0]);

  const handleOnSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await addRequestA({ ...data, title: value });
      toast.success("Attestation added successfully",{ className: 'toast-success' });
      reset(); // Reset form
      setOpen(false);
      window.location.reload()
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "An error occurred",{ className: 'toast-error' });
    }
  };

  const cancelBtn = () => {
    setOpen(false);
    reset();
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className='gap-4 flex flex-col justify-center w-full h-[50vh] '>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4 '>
        Request for a Document
        </Dialog.Title>
        <div className='mt-2 grid sm:grid-cols-2  gap-6'>
          <SelectList
            label='Select Document Type'
            lists={VAL}
            selected={value}
            setSelected={setValue}
          />
       
        <div className='mt-8  '>
          <div className='flex flex-row-reverse gap-6'>
        <Button
            type='submit'
            className='bg-green-600 text-sm font-semibold text-white hover:bg-green-700 px-8'
            label='Submit'
           
          />
          
          <Button
            type='button'
            className='bg-gray-300 px-5 text-sm font-semibold text-red-600 hover:bg-gray-400  sm:w-auto'
            onClick={cancelBtn}
            label='Cancel'
          />
          </div>
          
        </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddRequest;
