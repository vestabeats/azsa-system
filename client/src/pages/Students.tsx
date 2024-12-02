import React, { useEffect, useState } from 'react';
import { FaCity } from "react-icons/fa";
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { useGetSideBarDataQuery } from '../redux/slices/api/userApiSlice';
import { city } from '../types/alltypes';
import { IoMdAdd } from 'react-icons/io';
import Button from '../components/Button';
import AddStudent from '../components/AddStudent';
import AddInactiveStudent from '../components/addInactiveStudent';
import { useSelector } from 'react-redux';

const Students: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const path = location.pathname.split("/")[1];
  const {data:sideData, isLoading,isError,refetch} = useGetSideBarDataQuery({isActive:path});
  useEffect(()=>{
   
    refetch()
  },[location])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !sideData || !sideData.data) {
    return <div>Error loading data</div>;
  }

  const cities: city[] = sideData.data.map((item: any) => ({
    name: item.name,
    total: item.total,
    icon: <FaCity />,
    link: `/studentscard/${item.name}/status/${path}`,
  }));

  return (
    <>
      <div className="h-full w-full flex flex-col sm:flex-row gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
        <h2 className='flex justify-center text-white text-3xl font-bold'>
          {path === "active" ? "Active Students by Wilaya" : "Inactive Students by Wilaya"}
        </h2>
        {user?.isAdmin &&
        <Button
        label='Add Student'
        icon={<IoMdAdd className='text-lg'/>}
        onClick={() => setOpen(true)}
        className='flex flex-row-reverse gap-1 p-2 mt-4 sm:mt-0 sm:ml-4 sm:w-auto w-max bg-white sm:bg-white hover:bg-green-400 hover:text-white font-medium items-center rounded-md focus:ring-4 focus:outline-none focus:ring-green-300'
/>}
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-4 mt-4'>
        {cities.map((stat, i) => (
          <div key={stat.name} className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
            <div className='h-full flex flex-1 flex-col justify-between'>
              <p className='text-base text-gray-600'>Total Students</p>
              <span className='text-2xl font-semibold'>{stat.total}</span>
              <span className='text-sm text-gray-400'>{stat.name}</span>
            </div>
            <div className='flex flex-col gap-4 p-1 justify-end items-end'>
              <div className={clsx("w-12 h-12 mt-[-0.55rem] rounded-full flex items-center justify-center text-black bg-white")}> 
                {stat.icon}
              </div>
              <Link to={stat.link} className='mt-3 text-black font-normal hover:bg-yellow-100 bg-yellow-200 rounded px-1'>
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
      {path === "active" ?
      <AddStudent open={open} setOpen={setOpen} userData={selected} setUserData={setSelected} refetch={refetch} />:
      <AddInactiveStudent open={open} setOpen={setOpen} refetch={refetch} />}
      </div>
    </>
  );
}

export default Students;
