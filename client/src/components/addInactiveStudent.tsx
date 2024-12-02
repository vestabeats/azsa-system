import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { app } from "../utils/firebase";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loading";
import Button from "./Button";
import SelectList from './SelectList';
import { useRegisterMutation } from '../redux/slices/api/authApiSlice';
import { useUpdateMutation } from '../redux/slices/api/userApiSlice';
import { toast } from 'sonner';
import { BiImages } from 'react-icons/bi';
import { setCredentials } from '../redux/slices/authSlice';
import clsx from 'clsx';

//const CITY = ["Bejaia", "Algiers", "Oran","Constantine","Blida","Setif","Annaba","Skidda","Sidi Belabes"];
const CITY = [
  "Algiers", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Sétif",
  "Sidi Bel Abbès", "Biskra", "Tébessa", "El Oued", "Skikda", "Tlemcen",
  "Tizi Ouzou", "Bejaia", "Médéa", "Mostaganem", "El Tarf", "Saïda",
  "Ouargla", "Laghouat", "Khenchela", "Jijel", "Tipaza", "Ghardaïa",
  "Mascara", "Adrar", "Chlef", "Relizane", "Bouira", "Bordj Bou Arreridj",
  "Tamanrasset", "Msila", "Boumerdès", "Aïn Defla", "Aïn Témouchent",
  "Bechar", "Naama", "Illizi", "El Bayadh", "Tindouf", "Tissemsilt", "El Oued",
  "Aïn Beida", "Souk Ahras", "Guelma", "El Ksar", "Djelfa", "Bordj Bou Arreridj",
  "Aïn El Melh", "Touggourt", "Reghaïa", "Zeralda", "Hassi Messaoud"
];
const YOS = ["French Year", "1st Year","2nd Year","3rd Year", "4th Year","5th Year", "6th Year","7th Year","Master 1","Master 2"];
const SEX = ["Male","Female"];
const uploadedFileURLs:any = [];

interface AddInternProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  
  refetch: () => void;
  
}


const AddInactiveStudent: React.FC<AddInternProps> = ({ open, setOpen,refetch }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [sex, setSex] = useState(SEX[0]);
  const [year, setYear] = useState(YOS[0]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [assets, setAssets] = useState([]);
  const [wilaya, setWilaya] = useState(CITY[0]);
  const URLS:any = []

  const uploadFile = async (file:any) => {
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can handle progress here if needed
          console.log("upLoading");
        },
        (error) => {
          // This is the error handler
          reject(error);
        },
        () => {
          // This is the completion handler
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

  const handleSelect = (e:any) => {
    setAssets(e.target.files);
  };



  const cancelBtn = () => {
    setOpen(false);
    
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({  });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateMutation();

  

  const handleOnSubmit = async (data: any) => {
    setUploading(true)
    for(const file of assets){
      
      try{
        await uploadFile(file)
      }catch(error){
        console.log("error uploading file")
        return
      }finally{
        setUploading(false)
      }
    }
    try {
    
        const result = await addNewUser({ ...data, sex,isActive:false, wilaya, year,passportphoto:[...URLS,...uploadedFileURLs] });
         toast.success("New user added successfully",{ className: 'toast-success' });
         
         setAssets([])
        refetch();
        
      
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong",{ className: 'toast-error' });
    }
  };

  const startdate = watch("startdate");
  const enddate = watch("enddate");

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className='gap-4 flex flex-col justify-center w-full mt-10'>
          <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
           ADD INACTIVE STUDENT
          </Dialog.Title>
          <div className={clsx(`grid grid-cols-3  gap-6`)}>
            <div className=''>
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
             
              <>
               <SelectList
                label='City'
                lists={CITY}
                selected={wilaya}
                setSelected={setWilaya}
              />
              <Textbox
                placeholder='Date of Birth'
                type='date'
                name='dob'
                label='Date of Birth'
                className='w-full rounded mb-4'
                register={register("dob", {
                  required: "Date Of Birth is required!",
                  validate: value => new Date(value) < new Date() || "Date of Birth must be in the past"
                })}
                error={errors.dob ? errors.dob.message : ""}
              /></>
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
                placeholder='Phone Number'
                type='number'
                name='phonenumber'
                label='Phone Number'
                className='w-full rounded mb-4'
                register={register("phonenumber", {
                  required: "User phone number is required!",
                  pattern: {
                    value: /^\d{10}$/, // Assuming 10-digit mobile numbers
                    message: "Please enter a valid 10-digit mobile phone number",
                  }
                })}
                error={errors.phonenumber ? errors.phonenumber.message : ""}
              />

             
               
            </div>
           
            <div className=''>
            
              <Textbox
                placeholder='Date of Entry'
                type='date'
                name='startdate'
                label='Date of Entry'
                className='w-full rounded mb-4'
                register={register("startdate", {
                  required: "Date of Entry is required!",
                  validate: value => !enddate || new Date(value) < new Date(enddate) || "Date of Entry must be before end date"
                })}
                error={errors.startdate ? errors.startdate.message : ""}
              />

              <Textbox
                placeholder='Date of Exit'
                type='date'
                name='enddate'
                label='Date of Exit'
                className='w-full rounded mb-4'
                register={register("enddate", {
                  required: "Date of Exit is required!",
                  validate: value => !startdate || new Date(value) > new Date(startdate) || "Date pf Exit must be after start date"
                })}
                error={errors.enddate ? errors.enddate.message : ""}
              />
              <SelectList
                label='Year of Study'
                lists={YOS}
                selected={year}
                setSelected={setYear}
              />
             
             
              <Textbox
                placeholder="Mother's FullName"
                type='text'
                name='mother'
                label="Mother's FullName"
                className='w-full rounded mb-4'
                register={register("mother", { required: "Mother's FullName is required!" })}
                error={errors.mother ? errors.mother.message : ""}
              />
              <Textbox
                placeholder="Father's FullName"
                type='text'
                name='father'
                label="Father's FullName"
                className='w-full rounded mb-4'
                register={register("father", { required: "Father's FullName is required!" })}
                error={errors.father ? errors.father.message : ""}
              />
               <Textbox
                placeholder='eg.software engineering'
                type='text'
                name='program'
                label='Program of Study'
                className='w-full rounded mb-4'
                register={register("program", { required: "Program is required!" })}
                error={errors.program ? errors.program.message : ""}
              />
             
            </div>
            <div>
            <Textbox
                placeholder="Passport Number"
                type='text'
                name='passportnumber'
                label="Passport Number"
                className='w-full rounded mb-4'
                register={register("passportnumber", { required: "Passport Number is required!" })}
                error={errors.father ? errors.father.message : ""}
              />
           
              <div className='mb-2'>
               <SelectList
                label='Gender'
                lists={SEX}
                selected={sex}
                setSelected={setSex}
                
              />
              </div>
              
              <>
                <Textbox
                placeholder='eg.bachelors degree'
                type='text'
                name='degreetype'
                label='Degree Type'
                className='w-full rounded mb-4'
                register={register("degreetype", { required: "Degree Type is required!" })}
                error={errors.degreetype ? errors.degreetype.message : ""}
              />
              <Textbox
                placeholder='AGB:12344ABC'
                type='text'
                name='bankaccount'
                label='Bank Account'
                className='w-full rounded mb-6'
                register={register("bankaccount", { required: "Bank Account is required!" })}
                error={errors.homeadress ? errors.homeadress.message : ""}
              />
              <Textbox
                placeholder='eg.256 pumula south bulawayo'
                type='text'
                name='homeadress'
                label='Home Adress'
                className='w-full rounded mb-6'
                register={register("homeadress", { required: "Home Adress is required!" })}
                error={errors.homeadress ? errors.homeadress.message : ""}
              />
              </>
              
               <div className="w-full flex items-center justify-center mt-2">
              <label
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                htmlFor="imgUpload"
              >
                <input
                  type="file"
                  className="hidden"
                  id="imgUpload"
                  onChange={(e) => handleSelect(e)}
                  accept=".jpg, .png,.pdf, .jpeg"
                  multiple={true}
                />
                <BiImages />
                <span>Add Passport Photo</span>
              </label>
            </div>
            </div>
          </div>
          {( isLoading || isUpdating  ) ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (uploading)?( <span className='text-sm py-2 text-red-500'>
          Uploading assets
        </span>): (
            <div className='py-3 mt-2 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-green-600 px-8 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto'
                label='Submit'
              />
              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={cancelBtn}
                label='Cancel'
              />
            </div>
           
          )}
        </form>
      </ModalWrapper>
    </>
  );
}

export default AddInactiveStudent;
