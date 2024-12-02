import React from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useGetAdminPerformanceStatsQuery } from '../redux/slices/api/transcriptApiSlice';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import { formatter } from '../utils';

const StudentPerformance: React.FC = () => {
    const { userId } = useParams();
    const { data, isLoading, isError, error } = useGetAdminPerformanceStatsQuery({ userId });
console.log("admnsss",data)
    // Transform data if available and handle loading or error states
    const chartData = Array.isArray(data?.data)
        ? data.data.map((item: { yearofstudy: string; finalmark: number }) => ({
            yearofstudy: item.yearofstudy,
            finalmark: item.finalmark,
        }))
        : [];

    if (isLoading) {
        return <div><Loading /></div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="h-full w-full flex flex-col  gap-1 justify-between mb-4 p-4 sm:p-8 bg-gradient-to-r from-yellow-400 from-10% via-green-300 via-30% to-green-600 to-90%">
        <h2 className='flex justify-center items-center text-white text-3xl font-bold'>
          Academic Performance
        </h2>
        
      </div>
     
      <div className='overflow-x-auto  py-8'>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead>
            <tr className='w-full bg-green-500 text-white'>
            <th className='py-2 px-4 text-left'>Full Name</th>
            <th className='py-2 px-4 text-left'>Program</th>
              <th className='py-2 px-4 text-left'>Year of Study</th>
              <th className='py-2 px-4 text-left'>Semester 1</th>
              <th className='py-2 px-4 text-left'>Semester 2</th>
              <th className='py-2 px-4 text-left'>Final Year Mark</th>
              <th className='py-2 px-4 text-left'>Transcripts</th>
              <th className='py-2 px-4 text-left'>Submission Date</th>
              
            </tr>
          </thead>
          <tbody>
            {data?.transcript?.map((stat, i) => (
              <tr key={stat._id} className='border-b'>
                <td className='py-2 px-4 text-gray-700'>{stat.by.surname} {stat.by.firstname}</td>
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
      <div className='mt-4'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={150} height={40} data={chartData}>
                    <XAxis dataKey="yearofstudy" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="finalmark" fill="#166534" />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300} className="mt-8">
                <LineChart width={150} height={40} data={chartData.reverse()}>
                    <XAxis dataKey="yearofstudy" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="finalmark" stroke="#166534" />
                </LineChart>
            </ResponsiveContainer>
            </div>
           
        </>
    );
};

export default StudentPerformance;
