import React, { useState } from 'react';

import { useGetTranscriptQuery} from '../../redux/slices/api/transcriptApiSlice';
import { formatter } from '../../utils';


const PerformanceTable:React.FC = () => {
  
  const { data, isLoading, refetch } = useGetTranscriptQuery();
 

 
 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-full w-full flex flex-col  gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
        <h2 className='flex justify-center items-center text-white text-3xl font-bold'>
          Academic Performance
        </h2>
        
      </div>
  
      <div className='overflow-x-auto py-8'>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead>
            <tr className='w-full bg-green-500 text-white'>
            <th className='py-2 px-4 text-left'>Program</th>
              <th className='py-2 px-4 text-left'>Year</th>
              <th className='py-2 px-4 text-left'>Semester 1</th>
              <th className='py-2 px-4 text-left'>semester 2</th>
              <th className='py-2 px-4 text-left'>Average Mark</th>
              <th className='py-2 px-4 text-left'>Transcripts</th>
              <th className='py-2 px-4 text-left'>Submission Date</th>
              
            </tr>
          </thead>
          <tbody>
            {data?.transcript?.map((stat, i) => (
              <tr key={stat._id} className='border-b'>
                 <td className='py-2 px-4 text-gray-700'>{stat.studyprogram}</td>
                <td className='py-2 px-4 text-gray-700'>{stat.yearofstudy}</td>
                <td className='py-2 px-4 text-gray-700'>{stat.semester1}</td>
                <td className='py-2 px-4 text-gray-700'>{stat.semester2}</td>
                <td className='py-2 px-4 text-gray-700'>{stat.finalmark}</td>
                <td className='py-2 px-4'>
                  {stat.attachments?.length > 0 ? (
                    <a
                      href={stat.attachments[stat.attachments.length - 1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-blue-500 hover:underline'
                    >
                      Open
                    </a>
                  ) : (
                    <span className='text-gray-400'>Empty</span>
                  )}
                </td>
                <td className='py-2 px-4 text-gray-700'>{formatter(stat.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </>
  );
};

export default PerformanceTable;
