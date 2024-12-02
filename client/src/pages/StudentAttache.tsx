import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useGetAttacheQuery } from '../redux/slices/api/userApiSlice';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

interface Attache {
  _id: string;
  surname: string;
  firstname: string;
  email: string;
  phonenumber: string;
  passportphoto?: string; // Optional field for passport photo
}

interface ApiResponse {
  status: boolean;
  attache: Attache[];
}

const StudentAttache: React.FC = () => {
  const { data, isLoading } = useGetAttacheQuery();
  const navigate = useNavigate();
  const [records, setRecords] = useState<Attache[] | null>(null);

  useEffect(() => {
    if (!isLoading && data) {
      if (Array.isArray(data.attache)) {
        setRecords(data.attache);
      } else {
        setRecords([]); // Handle empty or invalid data
      }
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div className='py-5'><Loading /></div>;
  }

  const Card: React.FC<{ item: Attache }> = ({ item }) => (
    <div className='bg-green-500 shadow-md rounded-lg p-4 mb-4'>
      {item.passportphoto && (
           <div className='flex justify-center items-center'>
        <img 
          src={item.passportphoto?.[item.passportphoto.length-1]} 
          alt={`${item.surname} ${item.firstname}`} 
          className='w-auto h-40 object-cover rounded-lg mb-4'
        />
        </div>
      )}
      <div className='flex flex-col text-white justify-center items-center'>
      <h3 className='text-xl font-semibold'>{item.surname} {item.firstname}</h3>
      <p className=''>{item.email}</p>
      <p className=''>{item.phonenumber}</p>
      </div>
      <button
        onClick={() => navigate(`/chatbox/${item._id}`)}
        className={clsx("mt-4 w-full px-4 py-2 rounded-full text-green-600", "bg-white hover:bg-[#f3f4f6]")}
      >
        Message
      </button>
    </div>
  );

  return (
    <>
      <div className='w-full  px-0 mb-6'>
        <div className="h-full w-full flex flex-col sm:flex-row gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
          <h2 className='flex justify-center text-white text-3xl font-bold'>
            Education Attaché
          </h2>
        </div>

        <div className='bg-gray-100 px-2 md:px-4 py-4 rounded'>
          <p className='text-lg text-center mb-4 text-gray-700'>
            Explore the profile of our dedicated education attaché. Click on the "Message" button to get in touch with him directly for any assistance or queries.
          </p>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {records?.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentAttache;
