//useGetPerformanceStatsQuery 
import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useGetPerformanceStatsQuery  } from '../../redux/slices/api/transcriptApiSlice';
import Loading from '../Loading';

const BarGraphPerformance: React.FC = () => {
    const { data, isLoading, isError, error } = useGetPerformanceStatsQuery();

    // Transform data if available and handle loading or error states
    const chartData = Array.isArray(data?.data)
        ? data.data.map((item: { yearofstudy: string; finalmark: number }) => ({
            yearofstudy: item.yearofstudy,
            finalmark: item.finalmark,
        }))
        : [];

        if (isLoading) {
            return <div><Loading/></div>;
        }
    

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart width={150} height={40} data={chartData.reverse()}>
                <XAxis dataKey="yearofstudy" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="finalmark" fill="#166534" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarGraphPerformance;
