import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
//import AddTask from "./AddTask";
//import AddSubTask from "./AddSubTask";
import ConfirmatioDialog from "./Dialogs";
//import { useTrashTaskMutation } from "../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import AddAttestation from "./AddAttestation";
import { useDeleteAttestationMutation } from "../redux/slices/api/attestationApiSlice";
// Import this only if necessary
// import { useSelector } from "react-redux";

interface Attest {
  _id: string;
  title: string;
  attachments:any
  
  
  // Add any other relevant task properties here
}

interface TaskDialogProps {
  attest: Attest;
}

const AttestDialog: React.FC<TaskDialogProps> = ({ attest }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [adata,setadata]=useState("")

  // If using Redux selector, define types for the selector
  // const { fetchTaskData } = useSelector((state: any) => state.auth);
  
  const [deleteAttest] = useDeleteAttestationMutation()
  
  const navigate = useNavigate();

  const deleteClicks = () => {
    setOpenDialog(true);
  };

  const deleteHandler = async () => {
    try {
      await deleteAttest({id:attest._id});
      // If using Redux selector, call fetchTaskData or remove this if not applicable
     
      toast.success("Deleted successfully");
      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("Delete task error");
    }
  };

  const items = [
    {
      label: "Open",
      icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => {
        if (attest?.attachments?.length > 0) {
          window.open(attest.attachments[attest.attachments.length - 1], "_blank");
        }},
    },
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => editClick(attest),
    },
  ];
  const editClick=(e:any)=>{

    setOpenEdit(true)
    setadata(e)
  }

  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600'>
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
              <div className='px-1 py-1 space-y-2'>
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el.onClick}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={deleteClicks}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiDeleteBin6Line
                        className='mr-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddAttestation
        open={openEdit}
        setOpen={setOpenEdit}
        AData={adata}
        setAData={setadata}
       userId=""
        key={new Date().getTime()} // Ensure key is unique or remove if not needed
      />

     

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default AttestDialog;
