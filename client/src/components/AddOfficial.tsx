import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loading";
import Button from "./Button";
import { toast } from 'sonner';

import { useRegisterMutation } from '../redux/slices/api/authApiSlice';
import { useUpdateMutation } from '../redux/slices/api/userApiSlice';




interface AddOfficialProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: any;
 
  setUserData: (userData: any) => void;
}

const AddOfficial: React.FC<AddOfficialProps> = ({ open, setOpen, userData, setUserData}) => {

 
 
  

 

  const defaultValues = {
    surname:userData?.surname || "",
   
    firstname: userData?.firstname || "",
    email: userData?.email || "",
    passportnumber: userData?.passportnumber || "",
    
    password: userData?.password || "",
  };

  const cancelBtn = () => {
    setOpen(false);
    setUserData(null);
   
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });

  useEffect(() => {
    if (userData) {
      reset({
        surname:userData?.surname || "",
   
        firstname: userData?.firstname || "",
        email: userData?.email || "",
        passportnumber: userData?.passportnumber || "",
        
        password: userData?.password || "",
      });
    }
  }, [userData, reset]);

  const [addOfficial, { isLoading }] = useRegisterMutation ();
  const [updateOfficial, { isLoading: isUpdating }] = useUpdateMutation();

  const handleOnSubmit = async (data: any) => {
   

 
   
    try {
      if (userData) {
        const result = await updateOfficial({ ...data, _id: userData._id });
        toast.success("Officialupdated successfully",{ className: 'toast-success' });
        setUserData(null);
       
       
        window.location.reload()
      } else {
        const result = await addOfficial({ ...data,isOfficials:true});
        toast.success("Official added successfully",{ className: 'toast-success' });
        setUserData(null);
       
       
        window.location.reload()
      }
      
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong",{ className: 'toast-error' });
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className='gap-4 flex flex-col justify-center w-full'>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          {userData ? "UPDATE OFFICIAL" : "ADD NEW OFFICIAL"}
        </Dialog.Title>
        <div className='grid grid-cols-1 sm:grid-cols-3  gap-6'>
        <Textbox
                placeholder='Surname'
                type='text'
                name='surname'
                label='Surname'
                className='w-full rounded mb-4'
                register={register("surname", { required: "Surname is required!" })}
                error={errors.surname ? errors.surname.message : ""}
              />
              <Textbox
                placeholder='FirstName'
                type='text'
                name='firstname'
                label='FirstName'
                className='w-full rounded mb-4'
                register={register("firstname", { required: "FirstName is required!" })}
                error={errors.firstname ? errors.firstname.message : ""}
              />
                 <Textbox
                placeholder='Email Address'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded mb-4'
                register={register("email", { required: "Email Address is required!" })}
                error={errors.email ? errors.email.message : ""}
              />
        <Textbox
            placeholder='Passportnumber'
            type='text'
            name='passportnumber'
            label='Passportnumber'
            className='w-full rounded mb-4'
            register={register("passportnumber", { required: "Passportnumber is required!" })}
            error={errors.passportnumber ? errors.passportnumber.message : ""}
          />
       
          <Textbox
            placeholder='Password'
            type='text'
            name='password'
            label='Password'
            className='w-full rounded mb-4'
            register={register("password", { required: "Password 1 is required!" })}
            error={errors.password ? errors.password.message : ""}
          />
        
        
        </div>
        
        {(isLoading || isUpdating ) ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='flex flex-row-reverse'>
          <div className="py-3 mt-2 sm:flex sm:flex-row space-y-4 sm:space-y-0">
            
            <Button
              type="button"
              className="bg-gray-300 px-5 mr-6 text-sm font-semibold text-red-600 hover:bg-gray-400 sm:w-auto"
              onClick={cancelBtn}
              label="Cancel"
            />
  
        <Button
              type="submit"
              className="bg-green-600  px-8 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto"
              label="Submit"
            />
          </div>
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddOfficial;
