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
import { useGetStudentStatsQuery } from '../../redux/slices/api/userApiSlice';
import Loading from '../Loading';

const BarGraph: React.FC = () => {
    const { data, isLoading, isError, error } = useGetStudentStatsQuery();

    // Transform data if available and handle loading or error states
    const chartData = Array.isArray(data?.data)
        ? data.data.map((item: { label: string; total: number }) => ({
            year: item.label.split(' ')[1], // Extract the year from the label
            students: item.total, // Map total to students
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
            <BarChart width={150} height={40} data={chartData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="students" fill="#166534" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarGraph;
