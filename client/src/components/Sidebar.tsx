import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import azsa from "../assets/azsa.png";
import { PiStudentFill } from "react-icons/pi";
import { MdDashboard, MdOutlinePersonAddDisabled, MdSettings,MdOutlineWrongLocation } from 'react-icons/md';
import { IoDocumentTextOutline,IoDocuments,IoBookSharp } from "react-icons/io5";
import { HiLibrary } from "react-icons/hi";
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import { RiFolderHistoryFill } from 'react-icons/ri';
import { TiMessages } from "react-icons/ti";
import { NavLinkProps } from '../types/alltypes';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';


const Sidebar: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const linkData = [
    { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
    { label: "Active Students", link: "active/active", icon: <FaUsers /> },
    { label: "Inactive Students", link: "inactive/inactive", icon: <MdOutlinePersonAddDisabled /> },
    ...(user?.isAdmin ?
   
    [  { label: "Officials", link: "officials", icon: <FaUsers /> },{ label: "Documents", link: "allattestations", icon: <IoDocuments /> },{ label: "Messages", link: "messages", icon: <TiMessages /> }] : []),
    { label: "History", link: "studentshistory", icon: <RiFolderHistoryFill /> }
  ];
  
  const linkDataC = [
    { label: "Dashboard", link: "dashboard", icon:  <MdDashboard /> },
    { label: "Officials", link: "officials", icon: <FaUsers /> },
    { label: "E Library", link: "academics", icon: < HiLibrary/> },
    { label: "BMessages", link: "messages", icon: <TiMessages /> },
    { label: "History", link: "studentshistory", icon: <RiFolderHistoryFill/> }
   
   
    
  ];
  const linkDataa = [
    { label: "Dashboard", link: "dashboard", icon:  <MdDashboard /> },
   
    { label: "Transcripts", link: "transcript", icon: <IoDocumentTextOutline/> },
    { label: "E Library", link: "academics", icon: < HiLibrary/> },
    { label: "Documents", link: "attestations", icon: <IoDocuments /> },
    { label: "Education Attaché", link: "attache", icon: <PiStudentFill/> },
    
    
  ];
  
  const sideData = user?.isAdmin || user?.isOfficials?linkData:user?.isCreator?linkDataC:linkDataa 
  const dispatch = useDispatch()
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const closeSidebar = () => {
    dispatch(setOpenSidebar(false))
  };

  const NavLink: React.FC<NavLinkProps> = ({ label, link, icon }) => {
    return (
      <Link 
        to={link} 
        onClick={closeSidebar} 
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-none text-base hover:bg-green-500",
          path === link.split("/")[0] ? "bg-green-700 hover:bg-green-600 text-white" : "text-gray-800"
        )}
      >
        {icon}
        <span className=''>{label}</span>
      </Link>
    );
  };

  return (
    <div className='w-full h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        <p className=' rounded-full p-1'>
          <img src={azsa} className='h-12 rounded' />
        </p>
        <span className='text-3xl text-black font-bold'>A<span className='text-green-600'>Z</span ><span className=''>S</span><span className="text-yellow-600">A</span></span>
      </h1>
      <div className='flex-1 flex-col flex gap-y-5 py-8'>
        {sideData.map((link) => (
          <NavLink key={link.label} label={link.label} link={link.link} icon={link.icon} />
        ))}
      </div>
      {user?.isAdmin | user?.isOfficials &&
    <>
    {user?.isAdmin &&
      <Link 
        to="trash" 
        onClick={closeSidebar} 
        className={clsx('w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-none text-base hover:bg-green-500',path==='trash'?"bg-green-700 hover:bg-green-600 text-white" : "text-gray-800")}>
          <FaTrashAlt />
          <span>Trash</span>
       
      </Link>
}
      <Link
        to="disciplinary" 
        
        onClick={closeSidebar} 
        className={clsx('w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-none text-base hover:bg-green-500',path==='disciplinary'?"bg-green-700 hover:bg-green-600 text-white" : "text-gray-800")}>
          <MdOutlineWrongLocation/>
          <span>Disciplinary</span>
       
      </Link>
    
      </>
}
    </div>
  );
};

export default Sidebar;
