import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import azsa from '../assets/azsa.png'
import { useDeleteUserMutation, useGetAllUserHistoryQuery, useStudentConductMutation, useUserActionMutation } from '../redux/slices/api/userApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate } from '../redux/slices/authSlice';
import { ImCross } from "react-icons/im";
import { FaUsers } from 'react-icons/fa';
import clsx from 'clsx';
import { toast } from 'sonner';
import ConfirmationDialog, { UserAction } from '../components/Dialogs';
import { Switch, Select, RadioGroup } from '@headlessui/react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import AddStudent from '../components/AddStudent';
import { FaCheck } from "react-icons/fa6";

interface User {
  _id: string;
  surname: string;
  firstname: string;
  wilaya: string;
  year: string;
  startdate: string;
  enddate: string;
  isActive: boolean;
  passportnumber: string;
  conduct:boolean;
  isAdmin:boolean
}

const History: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const { startDate, endDate, searchvalue, user } = useSelector((state: any) => state.auth);
  const [selectedOption, setSelectedOption] = useState('all');
  const [selectedUniv, setSelectedUniv] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [activeSwitch, setActiveSwitch] = useState(null); // Track which switch is active
  const { data, isLoading, refetch } = useGetAllUserHistoryQuery({ start: startDate, end: endDate, search: searchvalue,sex:selectedOption,univ:selectedUniv,yos:selectedYear,status:activeSwitch });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const firstIndex = lastIndex - recordsPerPage;
  const [records, setRecords] = useState<User[] | null>(null);
  const [nPage, setnPage] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(false);
  const [conduc, setConduc] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();
  const [conductChange]=useStudentConductMutation();
  const editClick = (el: any) => {
    setSelect(el);
    setOpen(true);
  };

  const handleSwitchChange = (switchName:any) => {
    setActiveSwitch(activeSwitch === switchName ? null : switchName);
  };
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

  const userConductHandler = async () => {
    try {
      const result = await conductChange({ conduct: !conduc?.conduct, id: conduc?._id });
      refetch();
      toast.success(result?.data?.message, { className: 'toast-success' });
      setSelected(null);
      setTimeout(() => {
        setOpenC(false);
      }, 50);
    } catch (error: any) {
      toast.error(error, { className: 'toast-error' });
    }
  };

  const userConductClick = (el: any) => {
    setConduc(el);
    setOpenC(true);
  };

  const userStatusClick = (el: any) => {
    setSelected(el);
    setOpenAction(true);
  };

  useEffect(() => {
    refetch();
    if (!isLoading && data && Array.isArray(data)) {
      setRecords(data.slice(firstIndex, lastIndex));
      setnPage(Math.ceil(data.length / recordsPerPage));
    }
  }, [isLoading, data, firstIndex, location, recordsPerPage, refetch]);

  const numbers = [...Array(nPage ? nPage + 1 : 0).keys()].slice(1);

  if (isLoading) {
    return (
      <div className='py-5'>
        <Loading />
      </div>
    );
  }

  const Card: React.FC = () => (
    <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
      <div className='h-full flex flex-1 flex-col justify-between'>
        <p className='text-base text-gray-600'>Total Students</p>
        <span className='text-2xl font-semibold'>{data?.length}</span>
        <p className='text-base text-gray-600'>
          {startDate && endDate
            ? `Students from ${startDate} to ${endDate}`
            : startDate
            ? `Students Started In ${startDate}`
            : endDate
            ? `Students Finished In ${endDate}`
            : 'From All The Years'}
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
        <FaUsers size={24} />
      </div>
    </div>
  );

  const TableHeader: React.FC = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-white bg-green-500 text-left'>
        <th className='py-2 px-4 text-left'>Surname</th>
        <th className='py-2 px-4 text-left'>First Name</th>
        <th className='py-2 px-4 text-left'>Passport Number</th>
        <th className='py-2 px-4 text-left'>Wilaya</th>
        <th className='py-2 px-4 text-left'>Year of Study</th>
        
        <th className='py-2 px-4 text-left'>Status</th>
        <th className='py-2 px-4 text-left'>Details</th>
        <th className='py-2 px-4 text-left'>Conduct</th>
        {user?.isAdmin &&
        <th className='py-2 px-4 text-left'>Actions</th>}
      </tr>
    </thead>
  );

  const TableRow: React.FC<{ users: User }> = ({ users }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2 px-4'>{users?.surname}</td>
      <td className='p-2 px-4'>{users?.firstname}</td>
      <td className='p-2 px-4'>{users?.passportnumber}</td>
      <td className='p-2 px-4'>{users?.wilaya}</td>
      <td className='p-2 px-4'>{users?.year}</td>
      {/* <td className='p-2 px-4'>{formatter(user?.startdate)}</td>
      <td className='p-2 px-4'>{formatter(user?.enddate)}</td>*/}
      <td className='p-2 px-4'>
        <button
          onClick={() => userStatusClick(users)}
          disabled={!user?.isAdmin}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            users?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {users?.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className='p-2'>
        <button
          onClick={() => navigate(`/studentdetails/${users?._id}`)}
          className='w-fit px-4 py-1 rounded-full text-white bg-green-600'>
          Open
        </button>
      </td>
      <td className='p-2 pl-6'>
      <button 
              onClick={() => userConductClick(users)}
              disabled={!user?.isAdmin}    
      >{users?.conduct?<FaCheck className='text-xl text-green-600 ' />:<ImCross className='text-xl text-red-600 ' />}
      </button>

      </td>
      {user?.isAdmin &&
      <td className='flex flex-row p-2'>
      
    
      <Button label=""
                  onClick={() => editClick(users)}
                  icon={<MdOutlineEdit className='text-xl text-blue-600  ' />}
                />
     
      
      <Button label=""
                  onClick={() => deleteClick(users?._id)}
                  icon={<MdDelete className='text-xl text-red-600 ' />}
                />
                 </td>
           
      }
                

      
    </tr>
  );

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      dispatch(setStartDate(value));
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      dispatch(setEndDate(value));
    }
  };

  return (
    <>
    <div className='flex justify-between bg-white '>
    <a href="/dashboard" className="flex items-center p-4">
            <img src={azsa} className="mr-3 h-8 sm:h-12" alt="AZSA Logo" />
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
            <span className='text-3xl text-black font-bold'>A<span className='text-green-600'>Z</span ><span className=''>S</span><span className="text-yellow-600">A</span></span>
            </span>
          </a>
          <div className='w-3/5 pr-2'>
    <Navbar/>
    </div>
    </div>
    <div className='flex'>
      
      {/*Left side */}
      <div className='w-1/5 p-4'>
        <div className='bg-white p-4 shadow-md rounded'>
          <h3 className='text-lg font-bold mb-4'>Filter Options</h3>

          <div className='mb-4 '>
            <label className='block text-sm font-medium text-gray-700'>Status</label>
            <div className='flex items-center'>
        <Switch
          checked={activeSwitch === 'switch1'}
          onChange={() => handleSwitchChange('switch1')}
          className={`${
            activeSwitch === 'switch1' ? 'bg-green-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className='sr-only'>Toggle Active</span>
          <span
            className={`${
              activeSwitch === 'switch1' ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
        <span className='ml-3 text-sm text-gray-700'>Active</span>
      </div>

      <div className='flex items-center'>
        <Switch
          checked={activeSwitch === 'switch2'}
          onChange={() => handleSwitchChange('switch2')}
          className={`${
            activeSwitch === 'switch2' ? 'bg-green-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className='sr-only'>Toggle Inactive</span>
          <span
            className={`${
              activeSwitch === 'switch2' ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
        <span className='ml-3 text-sm text-gray-700'>Inactive</span>
      </div>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <RadioGroup
              value={selectedOption}
              onChange={setSelectedOption}
              className='mt-2'
            >
               <RadioGroup.Option value='all' className='flex items-center'>
                {({ checked }) => (
                  <div className='flex items-center'>
                    <div
                      className={clsx(
                        'h-4 w-4 mr-2 rounded-full border border-gray-400',
                        checked ? 'bg-green-600' : ''
                      )}
                    >
                      {checked && (
                        <div className='h-2 w-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    <span className='text-sm text-gray-700'>All</span>
                  </div>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value='Male' className='flex items-center'>
                {({ checked }) => (
                  <div className='flex items-center'>
                    <div
                      className={clsx(
                        'h-4 w-4 mr-2 rounded-full border border-gray-400',
                        checked ? 'bg-green-600' : ''
                      )}
                    >
                      {checked && (
                        <div className='h-2 w-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    <span className='text-sm text-gray-700'>Male</span>
                  </div>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value='Female' className='flex items-center'>
                {({ checked }) => (
                  <div className='flex items-center'>
                    <div
                      className={clsx(
                        'h-4 w-4 mr-2 rounded-full border border-gray-400',
                        checked ? 'bg-green-600' : ''
                      )}
                    >
                      {checked && (
                        <div className='h-2 w-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    <span className='text-sm text-gray-700'>Female</span>
                  </div>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Year of Study</label>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className='mt-2 block w-full border-gray-300 rounded-md'
            >
              <option value='all'>All</option>
              
                {YOS.map((y,i)=>(
                   <option value={y} key={i}>{y}</option>
                ))}
              
             
              
            </Select>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>University</label>
            <Select
              value={selectedUniv}
              onChange={(e) => setSelectedUniv(e.target.value)}
              className='mt-2 block w-full border-gray-300 rounded-md'
            >
              <option value='all'>All</option>
              
              {CITY.map((y,i)=>(
                   <option value={y} key={i}>{y}</option>
                ))}

            </Select>
          </div>
          
         
        </div>
      </div>

      {/*Rightside*/}
      <div className='w-full md:w-4/5 p-2'>
        <div className='grid grid-cols-3 py-2 px-2 justify-between'>
          <div>
            <h4 className='text-black font-bold'>Year of Entry</h4>
            <input
              type='number'
              placeholder='year eg: 2022'
              value={startDate}
              className='bg-white w-[8rem] border border-gray-300 outline-none p-2 rounded-md ring-green-500 focus:ring-2 focus:ring-green-500'
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <h4 className='text-black font-bold'>Year of Exit</h4>
            <input
              type='number'
              placeholder='year eg: 2023'
              value={endDate}
              className='bg-white w-[8rem] border border-gray-300 outline-none p-2 rounded-md focus:ring-2 ring-green-500 focus:ring-green-500'
              onChange={handleEndDateChange}
            />
          </div>
          <Card />
        </div>
        {/* Tables */}
        <div className='w-full md:px-1 px-0 mb-2'>
          <div className='flex items-center justify-between mt-16 mb-8'>
            <Title title='History Of Students' />
          </div>

          <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded overflow-x-auto'>
            <table className='mb-5 min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
              <TableHeader />
              <tbody>
                {records?.map((user, index) => (
                  <TableRow users={user} key={index} />
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} numbers={numbers} nPage={nPage} />
          </div>
        </div>
        <UserAction
          open={openAction}
          setOpen={setOpenAction}
          onClick={userActionHandler}
        />
        
         <AddStudent open={open} setOpen={setOpen} userData={select} setUserData={setSelect} refetch={refetch} />
         <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      </div>
      <UserAction
          open={openC}
          setOpen={setOpenC}
          onClick={userConductHandler}
        />
     
    </div>
    </>
  );
};

export default History;
