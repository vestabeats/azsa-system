import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import Button from '../components/Button';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import clsx from 'clsx';
import { formatter } from '../utils';
import { useGetTranscriptQuery, useDeleteTranscriptMutation } from '../redux/slices/api/transcriptApiSlice';
import AddTranscript from '../components/AddTranscript';
import { toast } from 'sonner';
import ConfirmationDialog from '../components/Dialogs';

const Transcript = () => {
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data, isLoading, refetch } = useGetTranscriptQuery();
  const [deleteT, { isLoading: isDeleting }] = useDeleteTranscriptMutation();

  const deleteClick = (id: any) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = async () => {
    try {
      const result = await deleteT({ id: selected }).unwrap();
      refetch();
      toast.success(result?.message);
      setSelected(null);
      setOpenDialog(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete transcript");
    }
  };

  const editClick = (el: any) => {
    setSelected(el);
    setOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-full w-full flex flex-col sm:flex-row gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
        <h2 className='flex justify-center text-white text-3xl font-bold'>
          Academic Transcripts
        </h2>
        <Button
          onClick={() => setOpen(true)}
          label='Add Transcripts'
          icon={<IoMdAdd className='text-lg' />}
          className='flex flex-row-reverse gap-1 p-2 mt-4 sm:mt-0 sm:ml-4 sm:w-auto w-max bg-white sm:bg-white hover:bg-green-400 hover:text-white font-medium items-center rounded-md focus:ring-4 focus:outline-none focus:ring-green-300'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4  gap-5 p-4 mt-4'>
        {data?.transcript?.map((stat:any,i:any) => (
          <div key={stat._id} className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
            <div className='h-full flex flex-1 flex-col justify-between'>
              <p className='text-base text-gray-600'>{stat?.yearofstudy.toUpperCase()}</p>
              <span className='text-2xl font-semibold'>{stat?.finalmark}</span>
              <span className='text-sm text-gray-400'>{formatter(stat?.createdAt)}</span>
            </div>
            <div className='flex flex-col gap-2 p-1 justify-end items-end'>
              <div className={clsx("rounded-full flex items-center justify-center text-black bg-white")}>
                <button className='text-xl text-blue-600' onClick={() => editClick(stat)}>
                  <MdOutlineEdit />
                </button>
              </div>
              <div className={clsx("mt-2 rounded-full flex items-center justify-center text-black")}>
                <button className='text-xl text-red-600' onClick={() => deleteClick(stat?._id)}>
                  <MdDelete />
                </button>
              </div>
              <a
                href={stat?.attachments?.[stat?.attachments.length - 1]}
                target="_blank"
                rel="noopener noreferrer"
                className='mt-3 text-black font-normal hover:bg-yellow-100 bg-yellow-200 rounded px-1'
              >
                {stat?.attachments?.length > 0 ? "Open" : "Empty"}
              </a>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <AddTranscript
        open={open}
        setOpen={setOpen}
        userData={selected}
        setUserData={setSelected}
        refetch={refetch}
      />
    </>
  );
}

export default Transcript;
