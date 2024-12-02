import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { clsx } from 'clsx'; // Assuming clsx is installed
import { CustomArrowProps, Stat } from '../../types/alltypes';
import { FaUsers } from 'react-icons/fa';
import { useGetStudentStatsQuery } from '../../redux/slices/api/userApiSlice';

const CardSlider: React.FC = () => {
    const { data, isLoading, isError, error } = useGetStudentStatsQuery();
    
   

    const CustomPrevArrow: React.FC<CustomArrowProps> = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    };

    const CustomNextArrow: React.FC<CustomArrowProps> = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // Access the array from the data object and sort in descending order
    const stats: Stat[] = Array.isArray(data?.data) ? data.data
        .map((item: { label: string; total: number }) => ({
            _id: item.label, // Using label as an ID for simplicity
            label: item.label,
            total: item.total,
            icon: <FaUsers />,
        }))
        .sort((a, b) => parseInt(b.label.split(' ')[1]) - parseInt(a.label.split(' ')[1])) // Sort by year in descending order
        .map((item, index) => ({
            ...item,
            bg: index < 4 ? ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"][index] : "bg-[#1d4ed8]", // Assign different colors to the first 4 cards
        }))
    : [];

    return (
        <div className=''>
            <div className='w-full m-auto'>
                <h2 className='flex justify-center text-white text-3xl font-bold'>Students Statistics</h2>
                <div className='mt-4 p-2'>
                    <Slider {...settings}>
                        {stats.map((stat) => (
                            <div key={stat._id} className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
                                <div className='h-full flex flex-1 flex-col justify-between'>
                                    <p className='text-base text-gray-600'>Total Students</p>
                                    <span className='text-2xl font-semibold'>{stat.total}</span>
                                    <span className='text-sm text-gray-400'>{stat.label}</span>
                                </div>
                                <div className='flex justify-end items-end mt-[-3.6rem]'>
                                    <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", stat.bg)}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CardSlider;
