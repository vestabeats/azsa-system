import React, { useState } from 'react';
import prog from "../assets/prog.png";
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import AddResource from '../components/AddResource';
import { useGetAcademicsQuery } from '../redux/slices/api/academicsApiSlice';
import { useSelector } from 'react-redux';

const Academics: React.FC = () => {
  const [selected, setSelected] = useState<any>(null);
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data, isLoading } = useGetAcademicsQuery();

  // Function to filter out duplicates
  const uniquePrograms = (programs: any[]) => {
    const seen = new Set();
    return programs.filter((item) => {
      const isDuplicate = seen.has(item.program);
      seen.add(item.program);
      return !isDuplicate;
    });
  };

  const programsList = data ? uniquePrograms(data.academics) : [];

  return (
    <>
      <div className="h-full w-full flex flex-col sm:flex-row gap-4 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 via-green-300 to-green-600">
        <h2 className='text-white text-3xl font-bold flex-grow'>
        Academic Repository
        </h2>
        {user?.isCreator &&
        <Button
          onClick={() => setOpen(true)}
          label='Add Resources'
          icon={<IoMdAdd className='text-lg' />}
          className='flex flex-row-reverse gap-2 p-2 mt-4 sm:mt-0 sm:ml-4 sm:w-auto w-max bg-white hover:bg-green-400 hover:text-white font-medium items-center rounded-md focus:ring-4 focus:outline-none focus:ring-green-300'
        />
}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {programsList.map((stat: any, index: any) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className='flex justify-center items-center p-4'>
              <a href={`/programdetails/${stat.program}`}>
              <img src={prog} alt="Program Icon" className="w-24 h-24 object-cover"/>
              </a>
            </div>
            <div className="p-4 flex justify-center">
              <a href={`/programdetails/${stat.program}`} className="text-lg font-semibold text-center hover:text-green-500">{stat.program}</a>
            </div>
          </div>
        ))}
      </div>
      <AddResource
        open={open}
        setOpen={setOpen}
        userData={selected}
        setUserData={setSelected}
      />
    </>
  );
};

export default Academics;
