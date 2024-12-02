import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import { IoMdAdd } from 'react-icons/io';
import AddStudent from './AddStudent';
import { useDeleteUserMutation,  useGetOfficialsQuery, useUserActionMutation } from '../redux/slices/api/userApiSlice';
import { MdDelete, MdOutlineEdit, MdOutlineLock,MdAttachFile } from 'react-icons/md';
import Loading from './Loading';
import { getInitials } from '../utils';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { toast } from 'sonner';
import ConfirmationDialog, { UserAction } from './Dialogs';
import AdminChangePassword from './AdminChangePassword';
import AddAttestation from './AddAttestation';

const OfficialsCard: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
 
  const [deleteUser] = useDeleteUserMutation();
  const [openAction, setOpenAction] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [changP, setChangP] = useState("");
  const [userAction] = useUserActionMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAtt, setOpenAtt] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [selectStu, setSelectStu] = useState<any>(null);
 

  // Fetch students data
  const { data, isLoading, refetch } = useGetOfficialsQuery();

  useEffect(()=>{
   
    refetch()
  },[location])

  const setChangePassword = (el: any) => {
    setChangP(el);
    setOpenPass(true);
  }

  const deleteClick = (id: any) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = async () => {
    try {
      const result = await deleteUser(selected);
      refetch();
      toast.success(result?.data.message);
      setSelected(null);
      setTimeout(() => {
        setOpenDialog(false);
      }, 50);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const editClick = (el: any) => {
    setSelected(el);
    setOpen(true);
  };
  const addAttClick = (el: any) => {
    setSelectStu(el);
    setOpenAtt(true);
  };

  const userActionHandler = async () => {
    try {
      const result = await userAction({ isActive: !selected?.isActive, id: selected?._id });
      refetch();
      toast.success(result?.data?.message, { className: 'toast-success' });
      setSelected(null);
      setTimeout(() => {
        setOpenAction(false);
      }, 500);
    } catch (error: any) {
      toast.error(error, { className: 'toast-error' });
    }
  };

  const userStatusClick = (el: any) => {
    setSelected(el);
    setOpenAction(true);
  };

  // Handle loading and empty states
  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (!data || data.length === 0) {
    return <div>No Officials found.</div>;
  }

  return (
    <>
     
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {data?.officials?.map((student: any) => (
          <div key={student?._id} className="w-full m-4 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              {student?.passportphoto?.[0] ?
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={student.passportphoto?.[student.passportphoto.length - 1]}
                  alt="Student"
                /> : <div className='w-14 h-14 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-green-600'>
                  <span className='text-white font-semibold'>
                    {getInitials(student?.surname)}
                  </span>
                </div>}
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{student?.firstname} {student?.surname}</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">{student?.program}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{student?.degreetype}</span>
              <div className="flex mt-4 md:mt-6">
               
                {user?.isAdmin &&
                <>
                 <button
                  onClick={() => userStatusClick(student)}
                  disabled={!user?.isAdmin}
                  className={clsx(
                    "w-fit px-4 py-1 rounded-full",
                    student?.isActive ? "bg-blue-200" : "bg-yellow-100"
                  )}
                >
                  {student?.isActive ? "Active" : "Disabled"}
                </button>
               
                <Button label=""
                  onClick={() => setChangePassword(student?._id)}
                  icon={<MdOutlineLock className='text-xl text-gray-600 ' />}
                />
                </>
}
              </div>
              <div className="flex mt-4 md:mt-6">
               
                {user?.isAdmin &&
                <>
                <Button label=""
                  onClick={() => deleteClick(student._id)}
                  icon={<MdDelete className='text-xl text-red-600 ' />}
                />
                <Button label=""
                  onClick={() => editClick(student)}
                  icon={<MdOutlineEdit className='text-xl text-blue-600  ' />}
                />
                  <Button label=""
                  onClick={() => addAttClick(student?._id)}
                  icon={<MdAttachFile className='text-xl text-gray-600  ' />}
                />
                </>
}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
      <AddAttestation open={openAtt} setOpen={setOpenAtt} userId={selectStu} AData="" setAData=""/>
      <AdminChangePassword open={openPass} setOpen={setOpenPass} userId={changP} />
      <AddStudent open={open} setOpen={setOpen} userData={selected} setUserData={setSelected} refetch={refetch} />
    </>
  );
};

export default OfficialsCard;
