import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaDownload } from "react-icons/fa";
import { useDeleteAcademicsMutation, useGetProgramDataQuery } from '../redux/slices/api/academicsApiSlice';
import book from '../assets/book.png';
import axios from 'axios';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import ConfirmationDialog from './Dialogs';
import { toast } from 'sonner';

const ProgramDetails: React.FC = () => {
    const { user } = useSelector((state: any) => state.auth);
    const [selected, setSelected] = useState<any>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { program } = useParams();
    const { data } = useGetProgramDataQuery({ program: program });
    const [deleteT, { isLoading: isDeleting }] = useDeleteAcademicsMutation() 

  

      const deleteClick = (id: any) => {
        setSelected(id);
        setOpenDialog(true);
      };

      const deleteHandler = async () => {
        try {
          const result = await deleteT({ id: selected }).unwrap();
          
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
                `http://localhost:8800/api/academics/downloadfile/${id}`,
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
    return (
        <>
            <div className="h-full w-full flex flex-col sm:flex-row gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
                <h2 className='flex justify-center text-white text-3xl font-bold'>
                    {program} Repository
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {data?.programData.map((stat: any, index: any) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {user?.isCreator&&

                        <>
                        <div className={clsx("mt-4 rounded-full flex  justify-end mr-4 text-black")}>
                            <button className='text-xl text-red-600' onClick={() => deleteClick(stat?._id)}>
                            <MdDelete />
                            </button>
                        </div>
                       
                    </>
                    }
                        <div className='flex justify-center items-center p-4'>
                            <img src={book} alt="Program Icon" className="w-24 h-24 object-cover text-green-500"/>
                        </div>
                        <div className="p-4 flex justify-center">
                            <a className="text-lg font-semibold text-center text-green-500">University of {stat.university}</a>
                        </div>
                        <div className="gap-4 pb-4 pt-2 font-semibold flex justify-center items-center">
                            <span>{stat.level}</span>
                            <button onClick={() => handleDownload(stat._id)} className=' flex items-center text-black font-normal hover:bg-green-100 bg-green-200 rounded px-1'>
                                <FaDownload className='h-4 mr-1 cursor-pointer w-4 text-gray-800 hover:text-gray-500'/> Download
                            </button>
                        </div>
                        
                    </div>
                ))}
            </div>
            <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
        </>
    );
};

export default ProgramDetails;
