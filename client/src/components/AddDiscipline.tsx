import React from 'react';
import { Dialog } from '@headlessui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from './Button';
import Loading from './Loading';
import ModalWrapper from './ModalWrapper';
import Textbox from './Textbox';
import { toast } from 'sonner';
import { useAddDisciplineMutation } from '../redux/slices/api/docsApiSlice';

interface AdminChangePasswordProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
}

interface FormData {
  
  reasons: string;
}

const AddDiscipline: React.FC<AdminChangePasswordProps> = ({ open, setOpen, userId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [addDisc, { isLoading }] = useAddDisciplineMutation();

  const handleOnSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addDisc({data, id:userId });
      console.log(res);
      toast.success("Added successfully");
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          Add Reasons
        </Dialog.Title>
        <div className='mt-2 flex flex-col gap-6'>
          
          
          <div>
            <label htmlFor='reasons' className='block text-sm font-medium text-gray-700'>
              Reasons
            </label>
            <textarea
              id='reasons'
              
              rows={4}
              placeholder='Enter reasons...'
              className='w-full rounded border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
              {...register('reasons', {
                required: 'Reasons are required!',
              })}
            />
            {errors.reasons && <span className='text-red-600'>{errors.reasons.message}</span>}
          </div>
        </div>
        {isLoading ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
            <Button
              type='submit'
              className='bg-green-600 px-8 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto'
              label='Submit'
            />
            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddDiscipline;
