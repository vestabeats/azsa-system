import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetStudentQuery } from '../redux/slices/api/userApiSlice';
import Loading from './Loading'; // Assuming you have a loading component
import { formatter, getInitials } from '../utils';
import clsx from 'clsx';
import Button from './Button';

const StudentDetails: React.FC = () => {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useGetStudentQuery(id);
  const navigate = useNavigate();

  const userDetails = [
    { label: 'Surname', value: user?.surname },
    { label: 'First Name', value: user?.firstname },
    { label: 'Date of Birth', value: formatter(user?.dob) },
    { label: 'Date of Entry', value: formatter(user?.startdate) },
    { label: 'Wilaya', value: user?.wilaya },
    { label: 'University', value: user?.university },
    { label: 'Gender', value: user?.sex },
    { label: 'Date of Exit', value: formatter(user?.enddate) },
    { label: 'Phone Number', value: user?.phonenumber },
    { label: 'Year of Study', value: user?.year },
    { label: 'Email', value: user?.email },
    { label: 'Mother\'s Name', value: user?.mother },
    { label: 'Father\'s Name', value: user?.father },
    { label: 'Home Address', value: user?.homeadress },
    { label: 'Degree Type', value: user?.degreetype },
    { label: 'Passport Number', value: user?.passportnumber },
    { label: 'Program', value: user?.program },
    { label: 'Speciality', value: user?.speciality },
    { label: 'Parent/Guardian Contacts', value: user?.parentnumber},
    { label: 'Status', value: user?.isActive ? "Active" : "Disabled" }
  ];

  // Divide the details into two columns
  const column1 = userDetails.slice(0, 10);
  const column2 = userDetails.slice(10);

  if (isLoading) {
    return <Loading />; // Loading state
  }

  if (isError || !user) {
    return <div>Error fetching user details</div>; // Error state
  }

  return (
    <div className="flex flex-col p-6 bg-white shadow-md rounded-md w-full max-w-4xl mx-auto">
      <div className='flex justify-between items-center w-full mb-4'>
        {/* Left-align the Documents button */}
        <div className='flex-1'>
          <Button 
            onClick={() => navigate(`/opendocuments/${id}`)}
            label='Documents'
            className='flex flex-row-reverse gap-1 h-12 pt-3 hover:bg-green-600 bg-green-500 text-white font-medium rounded-md focus:ring-4 focus:outline-none focus:ring-green-300'
          />
        </div>

        {/* Center the image */}
        <div className='flex-1 flex justify-center'>
        {user?.passportphoto?.length!==0? (
          <a href={user.passportphoto?.[user.passportphoto.length - 1]} target='_blank' rel="noopener noreferrer">
            <img
              src={user.passportphoto?.[user.passportphoto.length - 1]}
              alt={`${user?.firstname} ${user?.surname}`}
              className="w-32 h-32 rounded-full object-cover"
            />
          </a>):(
          <p
            className={clsx(
              "w-24 h-24 rounded-full text-center font-bold text-4xl items-center flex justify-center text-white bg-green-600"
            )}
          >
            {getInitials(user?.surname)}
          </p>)}
        </div>

        {/* Right-align the Performance button */}
        <div className='flex-1 flex justify-end'>
          <Button 
            onClick={() => navigate(`/studentperformance/${id}`)}
            label='Performance'
            className='flex flex-row-reverse gap-1 h-12 pt-3 hover:bg-green-600 bg-green-500 text-white font-medium rounded-md focus:ring-4 focus:outline-none focus:ring-green-300'
          />
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200">
          {column1.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.label}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.value}</td>
              {column2[index] && (
                <>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{column2[index].label}</td>
                  <td
                    className={clsx(
                      "px-2 py-4 rounded text-sm text-gray-500",
                      column2[index].label === 'Status'
                        ? user?.isActive
                          ? "bg-blue-200"
                          : "bg-yellow-100"
                        : ''
                    )}
                  >
                    {column2[index].value}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
