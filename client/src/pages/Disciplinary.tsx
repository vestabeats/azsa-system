import React, { useEffect, useState } from 'react';
import { useGetConductQuery } from '../redux/slices/api/userApiSlice';
import Pagination from '../components/Pagination';

import { MdOutlineAddCircleOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import Button from '../components/Button';
import AddDiscipline from '../components/AddDiscipline';
import ViewReasons from '../components/ViewReasons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface User {
  _id: string;
  surname: string;
  sex: string;
  firstname: string;
  wilaya: string;
  year: string;
  program: string;
  passportnumber: string;
  isTrashed: boolean;
}

const Disciplinary: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetConductQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [records, setRecords] = useState<User[] | null>(null);
  const [nPage, setNPage] = useState<number | null>(null);
  const [open, setOpen]=useState(false);
  const [sId, setSId]=useState('');
  const [openR, setOpenR]=useState(false);
  const [rId, setRId]=useState('');

  useEffect(() => {
    if (!isLoading && data) {
      // Log the full data to see its structure
      console.log("Conduct Data:", data);

      // Ensure data.user is an array before proceeding
      const users = Array.isArray(data) ? data : [];

      setRecords(users.slice(firstIndex, lastIndex));
      setNPage(Math.ceil(users.length / recordsPerPage));
    }
  }, [isLoading, data, firstIndex, recordsPerPage]);

  const numbers = [...Array(nPage ? nPage + 1 : 1).keys()].slice(1);
  const addDiscc=(el:any)=>{
    setSId(el)
    setOpen(true)
  }
  const viewR=(el:any)=>{
    setRId(el)
    setOpenR(true)
  }

  const TableHeader: React.FC = () => (
    <thead className='border-b border-gray-300'>
      <tr className='bg-green-500 text-white w-full'>
        <th className='py-2 px-4 text-left'>Surname</th>
        <th className='py-2 px-4 text-left'>FirstName</th>
        <th className='py-2 px-4 text-left'>Wilaya</th>
        <th className='py-2 px-4 text-left'>Gender</th>
        <th className='py-2 px-4 text-left'>Year Of Study</th>
        <th className='py-2 px-4 text-left'>PassportNumber</th>
        <th className='py-2 px-4 text-left'>Program</th>
        <th className='py-2 px-4 text-left'>Details</th>
        {user?.isAdmin &&
        <th className='py-2 px-4 text-left'>Add</th>}
        <th className='py-2 px-4 text-left'>View</th>
      </tr>
    </thead>
  );

  const TableRow: React.FC<{ item: User }> = ({ item }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2 px-4'>
        <div className='flex items-center gap-2'>
          <p className='w-full line-clamp-2 text-base text-black'>
            {item?.surname}
          </p>
        </div>
      </td>
      <td className='py-2 capitalize px-4'>
        <div className={"flex gap-1 items-center"}>
          <span>{item?.firstname}</span>
        </div>
      </td>
      <td className='py-2 capitalize px-4 text-center md:text-start'>
        {item?.wilaya}
      </td>
      <td className='py-2 px-4 capitalize text-center md:text-start'>
        {item?.sex}
      </td>
      <td className='py-2 px-4 capitalize text-center md:text-start'>
        {item?.year}
      </td>
      <td className='py-2 px-4 capitalize text-center md:text-start'>
        {item?.passportnumber}
      </td>
      <td className='py-2 text-sm px-4'>{item?.program}</td>
      <td className='p-2'>
        <button
          onClick={() => navigate(`/studentdetails/${item?._id}`)}
          className='w-fit px-4 py-1 rounded-full text-white bg-green-600'>
          Open
        </button>
      </td>
      {user?.isAdmin &&
      <td className='flex flex-row p-2'>
       
      <Button label=""
                  onClick={()=>{addDiscc(item?._id)}}
                  icon={<MdOutlineAddCircleOutline  className='text-xl text-blue-600  ' />}
                />

                </td>
        }
                <td className=' p-2'>
      <Button label=""
                  onClick={()=>{viewR(item?._id)}}
                  icon={<MdOutlineRemoveRedEye className='text-xl text-green-600  ' />}
                />
                </td>
    </tr>
  );

  return (
    <>
      <div className="h-full w-full flex flex-col sm:flex-row gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 via-green-300 to-green-600">
        <h2 className='flex justify-center text-white text-3xl font-bold'>
          Disciplinary
        </h2>
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
      <AddDiscipline open={open} setOpen={setOpen} userId={sId}/>
      <ViewReasons open={openR} setOpen={setOpenR} id={rId}/>
    </>
  );
}

export default Disciplinary;
