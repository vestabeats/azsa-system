import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { formatter } from '../utils';
import { useGetAttestationQuery } from '../redux/slices/api/attestationApiSlice';
import axios from 'axios';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import AddDocs from '../components/AddDocs';
import { useDeleteDocsMutation, useGetDocsQuery } from '../redux/slices/api/docsApiSlice';
import clsx from 'clsx';
import { FaPassport ,FaCcVisa} from "react-icons/fa6";
import { IoDocumentSharp } from "react-icons/io5";
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import { toast } from 'sonner';
import ConfirmationDialog from '../components/Dialogs';
import AddRequest from '../components/addRequest';

const Attestation = () => {
  const { data, isLoading } = useGetAttestationQuery();
  const { data:docs, isLoading:loadDocs,refetch } = useGetDocsQuery();
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openrequest, setOpenRequest] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteDx, { isLoading: isDeleting }] = useDeleteDocsMutation();

  const deleteClick = (id: any) => {
    setSelected(id);
    setOpenDialog(true);
  };
  const editClick = (el: any) => {
    setSelected(el);
    setOpen(true);
  };
  const deleteHandler = async () => {
    try {
      const result = await deleteDx({ id: selected }).unwrap();
      refetch();
     toast.success(result?.message);
      setSelected(null);
      setOpenDialog(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete transcript");
    }
  };

  const handleDownload = async (id: string) => {
    try {
        const response = await axios.get(
            `http://localhost:8800/api/attestation/downloadattest/${id}`,
            { responseType: 'blob' }  // Ensure binary data is handled properly
        );

        // Create a URL for the file and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
        const link = document.createElement('a');
        link.href = url;
        link.download = response.headers['content-disposition']
            ? response.headers['content-disposition'].split('filename=')[1]
            : 'downloaded-file';  // Fallback filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
    }
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-full w-full flex flex-col sm:flex-row gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
        <h2 className='flex justify-center text-white text-3xl font-bold'>
          Documents
        </h2>
        <div className='flex flex-row gap-4'>
        <Button
           onClick={() => setOpenRequest(true)}
          label='Request'
          
          className='flex flex-row-reverse gap-2 p-2 mt-4 sm:mt-0 sm:ml-4 sm:w-auto w-max bg-white hover:bg-green-400 hover:text-white font-medium items-center rounded-md focus:ring-4 focus:outline-none focus:ring-green-300'
        />
        <Button
           onClick={() => setOpen(true)}
          label='Upload'
          icon={<IoMdAdd className='text-lg' />}
          className='flex flex-row-reverse gap-2 p-2 mt-4 sm:mt-0 sm:ml-4 sm:w-auto w-max bg-white hover:bg-green-400 hover:text-white font-medium items-center rounded-md focus:ring-4 focus:outline-none focus:ring-green-300'
        />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-4 mt-4'>
        {data?.attestation?.map((stat:any) => (
          <div key={stat._id} className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
            <div className='h-full flex flex-1 flex-col justify-between'>
              <p className='text-base text-gray-600'>{stat?.title.toUpperCase()}</p>
              <span className='text-sm text-gray-400'>{formatter(stat?.createdAt)}</span>
            </div>
            <div className='flex flex-col gap-4 p-1 justify-end items-end'>
              <a
                href={stat?.attachments?.[stat?.attachments.length - 1]}
                target="_blank"
                rel="noopener noreferrer"
                className=' text-black font-normal hover:bg-yellow-100 bg-yellow-200 rounded px-1'
              >
                {stat?.attachments?.length > 0 ? "Open" : "Pending Request"}
              </a>
              {stat?.attachments?.length > 0 && (
                <button
                onClick={() => handleDownload(stat._id)} 
                  className='mt-5 flex items-center text-black font-normal hover:bg-green-100 bg-green-200 rounded px-1'
                >
                  <FaDownload className='mr-1' /> Download
                </button>
              )}
            </div>
            
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-4 mt-4'>
        {docs?.docs?.map((stat:any) => (
         <div key={stat._id} className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
         <div className='h-full flex flex-1 flex-col justify-between'>
           <p className='text-base text-gray-600'>{stat?.title.toUpperCase()}</p>
           <span className='text-2xl font-semibold'>{stat?.title=="Passport"?<FaPassport/>:stat?.title=="Residence Permit"?<FaCcVisa/>:<IoDocumentSharp/>}</span>
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
      <AddDocs open={open} setOpen={setOpen} userData={selected} setUserData={setSelected}/>
      <AddRequest open={openrequest} setOpen={setOpenRequest}/>
    </>
  );
};

export default Attestation;
