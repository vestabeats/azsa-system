import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { app } from "../utils/firebase";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loading";
import Button from "./Button";
import SelectList from './SelectList';
import { toast } from 'sonner';
import { BiImages } from 'react-icons/bi';

import { useAddDocsMutation, useUpdateDocsMutation } from '../redux/slices/api/docsApiSlice';

const VAR =  ["Passport", "Residence Permit","Birth Certificate","A&O level certificates","National ID"];


const uploadedFileURLs: any = [];

interface AddResourceProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: any;
 
  setUserData: (userData: any) => void;
}

const AddDocs: React.FC<AddResourceProps> = ({ open, setOpen, userData, setUserData }) => {
  const [varsity, setVar] = useState(VAR[0]);


  const [uploading, setUploading] = useState<boolean>(false);
  const [assets, setAssets] = useState<File[]>([]);
  const URLS: any = userData?.attachments ? [...userData.attachments] : [];

  const uploadFile = async (file: File) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadedFileURLs.push(downloadURL);
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAssets(Array.from(e.target.files));
    }
  };

  const defaultValues = {
   
  };

  const cancelBtn = () => {
    setOpen(false);
    setUserData(null);
   
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });

 

  const [addDocs, { isLoading }] = useAddDocsMutation();
  const [updateDocs, { isLoading: isUpdating }] = useUpdateDocsMutation();

  const handleOnSubmit = async (data: any) => {
    if (assets.length === 0) {
      toast.error("Please include at least one attachment.",{ className: 'toast-error' });
      return;
    }

    setUploading(true);
    for (const file of assets) {
      try {
        await uploadFile(file);
      } catch (error) {
        console.log("Error uploading file");
        return;
      } finally {
        setUploading(false);
      }
    }
    try {
      if (userData) {
        const result = await updateDocs({ ...data,title:varsity, _id: userData._id, attachments: [...URLS, ...uploadedFileURLs] });
        toast.success("Transcript updated successfully",{ className: 'toast-success' });
        setUserData(null);
        setAssets([]);
       // refetch();
        window.location.reload()
      } else {
        const result = await addDocs({ ...data,title:varsity, attachments: [...URLS, ...uploadedFileURLs] });
        toast.success("Transcript added successfully",{ className: 'toast-success' });
        setUserData(null);
        setAssets([]);
        //refetch();
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
      <form onSubmit={handleSubmit(handleOnSubmit)} className='gap-4 flex flex-col justify-center w-full h-[50vh] '>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          ADD DOCUMENT
        </Dialog.Title>
        <div className='grid sm:grid-cols-2 gap-6'>
       
        <SelectList
          label='Select Document Type'
          lists={VAR}
          selected={varsity}
          setSelected={setVar}
        />
        
          
          <div className="w-full flex items-center justify-center mt-4">
          <label
            className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
            htmlFor="imgUpload"
          >
            <input
              type="file"
              className="hidden"
              id="imgUpload"
              onChange={handleSelect}
             
              multiple={true}
            />
            <BiImages />
            <span>Add Attachments</span>
          </label>
        </div>
        </div>
        
        {(isLoading || isUpdating || uploading) ? (
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

export default AddDocs;
