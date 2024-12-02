import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import Button from './Button';
import Loading from './Loading';
import ModalWrapper from './ModalWrapper';
import Textbox from './Textbox';
import { toast } from 'sonner';
import { useAddAttestationMutation, useUpdateAttestationMutation } from '../redux/slices/api/attestationApiSlice';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { app } from "../utils/firebase";
import { BiImages } from 'react-icons/bi';
import SelectList from './SelectList';

interface AddAttestationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
  AData: any; // Existing data for editing
  setAData: any;
}

interface FormData {
  title: string;
}

const AddAttestation: React.FC<AddAttestationProps> = ({ open, setOpen, userId, AData, setAData }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [addAttest] = useAddAttestationMutation();
  const [updateAttest] = useUpdateAttestationMutation();
  const [assets, setAssets] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const VAL =  ["Attestation de bourse", , "Authorization","Confirmations"];
  const [value, setValue] = useState(VAL[0]);


  useEffect(() => {
    if (AData) {
      reset({ title: AData.title || "" });
    }
  }, [AData, reset]);

  const uploadFile = async (file: File): Promise<string> => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => resolve(downloadURL))
            .catch((error) => reject(error));
        }
      );
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAssets(Array.from(e.target.files));
    }
  };

  const handleOnSubmit: SubmitHandler<FormData> = async (data) => {
    if (assets.length === 0) {
      toast.warning("Please include at least one attachment.");
      return;
    }

    setUploading(true);
    const uploadedFileURLs: string[] = [];

    for (const file of assets) {
      try {
        const downloadURL = await uploadFile(file);
        uploadedFileURLs.push(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file. Please try again.");
        setUploading(false);
        return;
      }
    }

    try {
      if (AData) {
        await updateAttest({ ...data,title: value, attachments: uploadedFileURLs, _id: AData?._id  });
        toast.success("Attestation updated successfully");
        setAData(null);
        window.location.reload()
      } else {
        await addAttest({ data: { title: value, attachments: uploadedFileURLs }, userId });
        toast.success("Attestation added successfully");
        window.location.reload()
      }
      reset(); // Reset form
      setOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const cancelBtn = () => {
    setOpen(false);
    setAData(null);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          {AData ? "Edit Documents" : "Add Documents"}
        </Dialog.Title>
        <div className='mt-2 flex flex-col gap-6'>
        <SelectList
          label='Select Document Type'
          lists={VAL}
          selected={value}
          setSelected={setValue}
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
        {(uploading) ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='flex flex-row-reverse '>
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

export default AddAttestation;
