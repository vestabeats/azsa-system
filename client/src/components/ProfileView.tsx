import React, { useState } from 'react';
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useNavigate } from 'react-router-dom';
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import { getInitials } from '../utils';
import { useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';

interface UserData {
  surname: string;
  firstname: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

interface ProfileViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: UserData | any;
}

const ProfileView: React.FC<ProfileViewProps> = ({ open, setOpen, userData }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [selected,setSelected]=useState(user)
  const [openP,setOpenP]=useState(false)
  const closeDialog = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const switchPro = () => {
    setOpenP(true);
    //navigate("/update-profile");
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
        <Dialog.Title as='h3' className=''>
        {user?.passportphoto?.length!==0? (
            <img
              className="w-16 h-16 mb-3 rounded-full mt-3 shadow-lg"
              src={user.passportphoto?.[user.passportphoto.length-1]}
              alt="Student"
            />):(
          <p
            className={clsx(
              "p-3 rounded-full text-white bg-green-600"
            )}
          >
            {getInitials(userData?.surname)}
          </p>)}
        </Dialog.Title>
        <div className='grid grid-cols-2 gap-6'>
          <p className='text-center text-gray-500'>
            Full Name :
          </p>
          <p className='text-center text-gray-500'>
            {userData?.firstname?.toUpperCase()} {userData?.surname?.toUpperCase()}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <p className='text-center text-gray-500'>
            Passport Number :
          </p>
          <p className='text-center text-gray-500'>{userData?.passportnumber}</p>
        </div>
        {!userData?.isAdmin || !user?.isOfficials || !user?.isOfficial &&
        <div className='grid grid-cols-2 gap-14'>
          <p className='text-center text-gray-500'>
            Wilaya :
          </p>
          <p className='text-center text-gray-500'>
            {userData?.wilaya}
          </p>
        </div>}
        <div className='bg-gray-50 py-3 flex flex-row-reverse gap-4'>
          
            <Button
              type='button'
              className={clsx(
                "px-8 text-sm font-semibold text-green-600 sm:w-auto border hover:bg-green-600 hover:text-white"
              )}
              onClick={switchPro}
              label="Update Profile"
            />
        
          <Button
            type='button'
            className='bg-white px-8 text-sm font-semibold hover:bg-red-600 hover:text-white text-gray-900 sm:w-auto border'
            onClick={closeDialog}
            label='Cancel'
          />
        </div>
      </div>
      <UpdateProfile open={openP} setOpen={setOpenP} userData={selected} setUserData={setSelected} />
    </ModalWrapper>
  );
};

export default ProfileView;
