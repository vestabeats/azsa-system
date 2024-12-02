import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

import { MdOutlineSearch } from 'react-icons/md'
import NotificationPanel from './NotificationPanel';
import UserAvatar from './UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar, setSearchValue  } from '../redux/slices/authSlice';



const Navbar:React.FC = () => {
  const dispatch = useDispatch()
  const {searchvalue,user}=useSelector((state:any)=>state.auth)

  return (
    <div className='flex justify-between items-center  bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
          <div className='flex gap-4'>
        <button
            onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-gray-500 block md:hidden'
        >
            <RxHamburgerMenu />
        
        </button>
       {user?.isAdmin | user?.isOfficials | user?.isCreator&&
        <div className='w-64 2xl:w-[400px] flex items-center py-1 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
          <MdOutlineSearch className='text-gray-500 text-xl ' />

          <input
           value={searchvalue}
           onChange={(e) => {
            dispatch(setSearchValue(e.target.value));
           }}
            type='text'
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800 border-none  focus:ring-[[#f3f4f6]] focus:border-none'
          />
        </div>}


        </div>
        <div className='flex gap-2 items-center'>
         <NotificationPanel/>

       <UserAvatar/>
      </div>
    </div>
  )
}

export default Navbar