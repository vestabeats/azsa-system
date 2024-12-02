import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  MdDelete,
  MdOutlineRestore,
} from "react-icons/md";
import Title from "../components/Title";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ConfirmatioDialog from "../components/Dialogs";
import Pagination from "../components/Pagination";
import { useDeleteRestoreUserMutation, useGetAllStudentsQuery } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

interface User {
  _id: string;
  surname: string;
  sex:string;
  firstname: string;
  wilaya: string;
  year: string;
  program: string;
  passportnumber: string;
  isTrashed: boolean;
}

const Trash: React.FC = () => {
  const { searchvalue } = useSelector((state: any) => state.auth);
  const { data, isLoading, refetch } = useGetAllStudentsQuery({ wilaya:'', isTrashed:true, isActive:"",search:searchvalue });
  console.log("trashed",data)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [records, setRecords] = useState<User[] | null>(null);
  const [nPage, setNPage] = useState<number | null>(null);
  
  const [deleteRestoreTask] = useDeleteRestoreUserMutation();

  useEffect(() => {
    if (!isLoading && data) {
      const users = data.users || [];  // Assuming `data.users` is an array of users
      setRecords(users.slice(firstIndex, lastIndex));
      setNPage(Math.ceil(users.length / recordsPerPage));
    }
  }, [isLoading, data, firstIndex, recordsPerPage]);

  const numbers = [...Array(nPage ? nPage + 1 : 1).keys()].slice(1);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [type, setType] = useState<"delete" | "restore" | "deleteAll" | "restoreAll">("delete");
  const [selected, setSelected] = useState<string>("");

  const deleteRestoreHandler = async () => {
    try {
      let result;
      switch (type) {
        case "delete":
          result = await deleteRestoreTask({ id: selected, actionType: "delete" });
          break;
        case "restore":
          result = await deleteRestoreTask({ id: selected, actionType: "restore" });
          break;
        case "deleteAll":
          result = await deleteRestoreTask({ id: selected, actionType: "deleteAll" });
          break;
        case "restoreAll":
          result = await deleteRestoreTask({ id: selected, actionType: "restoreAll" });
          break;
        default:
          break;
      }
      toast.success(result?.data?.message);
      setTimeout(() => {
        setOpenDialog(false);
        refetch();
      });
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id: string) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id: string) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  if (isLoading) {
    return (
      <div className='py-5'>
        <Loading />
      </div>
    );
  }

  const TableHeader: React.FC = () => (
    <thead className='border-b border-gray-300'>
      <tr className='bg-green-500 text-white w-full  '>
        <th className='py-2 px-4 text-left'>Surname</th>
        <th className='py-2 px-4 text-left'>FirstName</th>
        <th className='py-2 px-4 text-left '>Wilaya</th>
        <th className='py-2 px-4 text-left'>Gender</th>
        <th className='py-2 px-4 text-left'>Year Of Study</th>
        <th className='py-2 px-4 text-left'>PassportNumber</th>
        <th className='py-2 px-4 text-left '>Program</th>
        <th className='py-2 px-4 text-left line-clamp-1 '>Action</th>
      </tr>
    </thead>
  );

  const TableRow: React.FC<{ item: User }> = ({ item }) => (
    <tr className='border-b border-gray-200  text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2  px-4 '>
        <div className='flex items-center gap-2'>
          
          <p className='w-full line-clamp-2 text-base text-black'>
            {item?.surname}
          </p>
        </div>
      </td>
      <td className='py-2 capitalize px-4 t'>
        <div className={"flex gap-1 items-center"}>
          <span className=''>{item?.firstname}</span>
        </div>
      </td>
      <td className='py-2 capitalize  px-4 text-center md:text-start'>
        {item?.wilaya}
      </td>
      <td className='py-2  px-4 capitalize text-center md:text-start'>
        {item?.sex}
      </td>
      <td className='py-2  px-4 capitalize text-center md:text-start'>
        {item?.year}
      </td>
      <td className='py-2  px-4 capitalize text-center md:text-start'>
        {item?.passportnumber}
      </td>
      <td className='py-2 text-sm  px-4 '>{item?.program}</td>
      <td className='py-2 flex gap-1 justify-center '><Button
          label=""
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          label=""
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Trashed Students'  />
          <div className='flex gap-2 md:gap-4 items-center'>
            <Button
              label='Restore All'
              icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={() => restoreAllClick()}
            />
            <Button
              label='Delete All'
              icon={<MdDelete className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={() => deleteAllClick()}
            />
          </div>
        </div>
        <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='mb-5 min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
              <TableHeader />
              <tbody>
                {records?.map((tk, id) => (
                  <TableRow key={id} item={tk} />
                ))}
              </tbody>
            </table>
            <Pagination
              numbers={numbers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              nPage={nPage}
            />
          </div>
        </div>
      </div>
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={deleteRestoreHandler}
      />
    </>
  );
};

export default Trash;
