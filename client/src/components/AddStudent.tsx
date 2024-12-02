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
  userData: any;
  refetch: () => void;
  setUserData: (userData: any) => void;
}


const AddStudent: React.FC<AddInternProps> = ({ open, setOpen, userData, setUserData,refetch }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [sex, setSex] = useState(SEX[0]);
  const [year, setYear] = useState(YOS[0]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [assets, setAssets] = useState([]);
  const [wilaya, setWilaya] = useState(CITY[0]);
  const URLS:any = userData?.passportphoto?[...userData?.passportphoto]:[]

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

  const defaultValues = {
    surname: userData?.surname || "",
    firstname: userData?.firstname || "",
    dob: userData?.dob || "",
    email: userData?.email || "",
    university: userData?.university|| "",
    speciality: userData?.speciality|| "",
    startdate: userData?.startdate || "",
    enddate: userData?.enddate || "",
    program: userData?.program || "",
    degreetype:userData?.degreetype||"",
    mother: userData?.mother|| "",
    father: userData?.father|| "",
    homeadress:userData?.homeadress|| "",
    phonenumber:userData?.phonenumber|| "",
    passportnumber:userData?.passportnumber|| "",
    parentnumber:userData?.parentnumber || "" 
  };

  const cancelBtn = () => {
    setOpen(false);
    setUserData(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateMutation();

  useEffect(() => {
    if (userData) {
      reset({
        surname: userData?.surname || "",
        firstname: userData?.firstname || "",
        dob: userData?.dob || "",
        email: userData?.email || "",
        university: userData?.university|| "",
        speciality: userData?.speciality|| "",
        startdate: userData?.startdate || "",
        enddate: userData?.enddate || "",
        program: userData?.program|| "",
        degreetype:userData?.degreetype||"",
        mother: userData?.mother|| "",
        father: userData?.father|| "",
        homeadress:userData?.homeadress|| "",
        phonenumber:userData?.phonenumber|| "",
        passportnumber:userData?.passportnumber|| "",
        parentnumber:userData?.parentnumber|| ""

      });
    }
  }, [userData, reset]);

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
      if (userData) {
        const result = await updateUser({ ...data, sex, wilaya, _id: userData?._id, year,passportphoto:[...URLS,...uploadedFileURLs]});
       
          toast.success("updated successfully",{ className: 'toast-success' });
          setUserData(null)
          setAssets([])
       
       refetch();
       
        
      } else {
        const result = await addNewUser({ ...data, sex, wilaya, year,passportphoto:[...URLS,...uploadedFileURLs] });
         toast.success("New user added successfully",{ className: 'toast-success' });
         setUserData(null)
         setAssets([])
        refetch();
        
      }
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
        <form onSubmit={handleSubmit(handleOnSubmit)} className='gap-4 '>
          <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
            {userData ? "UPDATE PROFILE" : "ADD NEW STUDENT"}
          </Dialog.Title>
          <div className={clsx(`grid sm:grid-cols-3  gap-6`)}>
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
                placeholder='University'
                type='text'
                name='university'
                label='University'
                className='w-full rounded mb-4'
                register={register("university", { required: "University is required!" })}
                error={errors.university ? errors.university.message : ""}
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
                placeholder='eg.Computer Science'
                type='text'
                name='program'
                label='Program of Study'
                className='w-full rounded mb-4'
                register={register("program", { required: "Program is required!" })}
                error={errors.program ? errors.program.message : ""}
              />
               <Textbox
                placeholder='eg.Artificial intelligence'
                type='text'
                name='speciality'
                label='Speciality'
                className='w-full rounded mb-4'
                register={register("speciality", { required: "Speciality is required!" })}
                error={errors.speciality ? errors.speciality.message : ""}
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
                placeholder='eg:+263775645322'
                type='text'
                name='parentnumber'
                label='Parent/Guardian Phone Number'
                className='w-full rounded mb-6'
                register={register("parentnumber", { required: "Parent/Guardian Phonenumber is required!" })}
                error={errors.parentnumber ? errors.parentnumber.message : ""}
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
            {( isLoading || isUpdating  ) ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (uploading)?( <span className='text-sm py-2 text-red-500'>
          Uploading assets
        </span>): (
            <div className='py-6 gap-8 mt-6 gap-auto flex flex-col sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-green-600 px-8 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto'
                label='Submit'
              />
              <Button
                type='button'
                className='bg-gray-200 px-5 text-sm font-semibold text-red-600  hover:bg-gray-300 sm:w-auto'
                onClick={cancelBtn}
                label='Cancel'
              />
            </div>
           
          )}
            </div>
          </div>
         
        </form>
      </ModalWrapper>
    </>
  );
}

export default AddStudent;
