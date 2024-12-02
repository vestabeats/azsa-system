import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
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
import { useAddTranscriptMutation, useUpdateTranscriptMutation } from '../redux/slices/api/transcriptApiSlice';

const YOS = ["French Year", "1st Year","2nd Year","3rd Year", "4th Year","5th Year", "6th Year","7th Year","Master 1","Master 2"];
const uploadedFileURLs: any = [];

interface AddStudentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: any;
  refetch: () => void;
  setUserData: (userData: any) => void;
}

const AddTranscript: React.FC<AddStudentProps> = ({ open, setOpen, userData, setUserData, refetch }) => {
  const [year, setYear] = useState(YOS[0]);
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
    studyprogram:userData?.studyprogram || "",
    yearofstudy: userData?.yearofstudy || "",
    semester1: userData?.semester1 || "",
    semester2: userData?.semester2 || "",
    
    finalmark: userData?.finalmark || "",
  };

  const cancelBtn = () => {
    setOpen(false);
    setUserData(null);
   
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });

  useEffect(() => {
    if (userData) {
      reset({
        studyprogram:userData.studyprogram || "",
        yearofstudy: userData.yearofstudy || "",
        semester1: userData.semester1 || "",
        semester2: userData.semester2 || "",
        
        finalmark: userData.finalmark || "",
      });
    }
  }, [userData, reset]);

  const [addTranscript, { isLoading }] = useAddTranscriptMutation();
  const [updateTranscript, { isLoading: isUpdating }] = useUpdateTranscriptMutation();

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
        const result = await updateTranscript({ ...data,yearofstudy:year, _id: userData._id, attachments: [...URLS, ...uploadedFileURLs] });
        toast.success("Transcript updated successfully",{ className: 'toast-success' });
        setUserData(null);
        setAssets([]);
        refetch();
        window.location.reload()
      } else {
        const result = await addTranscript({ ...data,yearofstudy:year, attachments: [...URLS, ...uploadedFileURLs] });
        toast.success("Transcript added successfully",{ className: 'toast-success' });
        setUserData(null);
        setAssets([]);
        refetch();
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
          {userData ? "UPDATE TRANSCRIPT" : "ADD NEW TRANSCRIPT"}
        </Dialog.Title>
        <div className='grid grid-cols-1 sm:grid-cols-3  gap-6'>
        <Textbox
            placeholder='Program'
            type='text'
            name='studyprogram'
            label='Program'
            className='w-full rounded mb-4'
            register={register("studyprogram", { required: "Program is required!" })}
            error={errors.studyprogram ? errors.studyprogram.message : ""}
          />
        <SelectList
          label='Year of Study'
          lists={YOS}
          selected={year}
          setSelected={setYear}
        />
          <Textbox
            placeholder='Semester 1'
            type='text'
            name='semester1'
            label='Semester 1'
            className='w-full rounded mb-4'
            register={register("semester1", { required: "Semester 1 is required!" })}
            error={errors.semester1 ? errors.semester1.message : ""}
          />
          <Textbox
            placeholder='Semester 2'
            type='text'
            name='semester2'
            label='Semester 2'
            className='w-full rounded mb-4'
            register={register("semester2", { required: "Semester 2 is required!" })}
            error={errors.semester2 ? errors.semester2.message : ""}
          />
          <Textbox
            placeholder='Final Mark'
            type='text'
            name='finalmark'
            label='Final Mark'
            className='w-full rounded mb-4'
            register={register("finalmark", { required: "Final Mark is required!" })}
            error={errors.finalmark ? errors.finalmark.message : ""}
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
              accept=".jpg, .png,.pdf, .jpeg"
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

export default AddTranscript;
