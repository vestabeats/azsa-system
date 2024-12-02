import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetADocsQuery } from '../redux/slices/api/docsApiSlice';
import { formatter } from '../utils';
import { FaCcVisa, FaPassport } from 'react-icons/fa6';
import Loading from './Loading';

const OpenDocuments: React.FC = () => {
  const { id } = useParams();
  const { data: docs, isLoading, isError, refetch } = useGetADocsQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !docs) {
    return <div className='flex justify-center items-center h-full'>Error fetching documents</div>;
  }

  return (
    <>
      <div className="h-full w-full flex flex-col sm:flex-row gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
        {docs?.docs?.length>0 ?
        <h2 className='flex justify-center w-full text-white text-3xl font-bold'>
         
          {docs?.docs?.[0]?.student?.firstname } {docs?.docs?.[0]?.student?.surname}'s Documents
        </h2>:
         <h2 className='flex justify-center w-full text-white text-3xl font-bold'>
       No Documents
       </h2>
}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-4 mt-4'>
        {docs.docs?.map((stat: any) => (
          <div key={stat._id} className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
            <div className='h-full flex flex-1 flex-col justify-between'>
              <p className='text-base text-gray-600'>{stat?.title?.toUpperCase()}</p>
              <span className='text-2xl font-semibold'>
                {stat?.title === "Passport" ? <FaPassport /> : <FaCcVisa />}
              </span>
              <span className='text-sm text-gray-400'>{formatter(stat?.createdAt)}</span>
            </div>
            <div className='flex flex-col gap-2 p-1 justify-end items-end'>
              <a
                href={stat?.attachments?.[stat?.attachments.length - 1]}
                target="_blank"
                rel="noopener noreferrer"
                className='mt-3 text-black font-normal hover:bg-yellow-100 bg-yellow-200 rounded px-2 py-1'
              >
                {stat?.attachments?.length > 0 ? "Open" : "Empty"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OpenDocuments;
