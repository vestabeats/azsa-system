import React, { useState } from 'react'
import Button from '../components/Button'
import { IoMdAdd } from 'react-icons/io'
import { useSelector } from 'react-redux';
import AddOfficial from '../components/AddOfficial';
import OfficialsCard from '../components/OfficialsCard';

const Officials:React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>(null);
    const { user } = useSelector((state: any) => state.auth);
  return (
    <>
    <div className="h-full w-full flex flex-col sm:flex-row gap-4 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 via-green-300 to-green-600">
        <h2 className='text-white text-3xl font-bold flex-grow'>
        Officials
        </h2>
        {user?.isCreator | user?.isAdmin &&
        <Button
          onClick={() => setOpen(true)}
          label='Add Official'
          icon={<IoMdAdd className='text-lg' />}
          className='flex flex-row-reverse gap-2 p-2 mt-4 sm:mt-0 sm:ml-4 sm:w-auto w-max bg-white hover:bg-green-400 hover:text-white font-medium items-center rounded-md focus:ring-4 focus:outline-none focus:ring-green-300'
        />
}
      </div>
      <OfficialsCard/>

      <AddOfficial open={open} setOpen={setOpen} userData={selected} setUserData={setSelected} />
    </>
  )
}

export default Officials