import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import vesta from "../../assets/vesta.jpg"
import mlax from "../../assets/mlax.jpg"
import shiey from "../../assets/passionpp.jpg"
import prezo from '../../assets/prezo.jpg'
import vp from '../../assets/vp.jpg'
import simb from "../../assets/simb.jpg"
import AnimatedTitle from '../AnimatedTitle';
interface DataItem {
  name: string;
  role: string;
  imgSrc: string;
  description: string;
}

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const MPromo: React.FC = () => {
    const data: DataItem[] = [
        {
          name: 'Mzwakhe Mlalazi',
          role: 'University of Blida',
          imgSrc: mlax,
          description: 'Best Student for the year 2024 in Telecommunication Engineering.',
        },
        {
          name: 'Shingirirai Dube',
          role: 'University of Bejaia',
          imgSrc: shiey,
          description: 'Best Student for the year 2024 in Communication and Public Relations.',
        },
        {
          name: 'Marvellous Tshuma',
          role: 'University of Bejaia',
          imgSrc:vesta,
          description: 'Best Student for the year 2024 in Software Engineering.',
        },
        {
          name: 'Lincoln Munhenzwa',
          role: 'University of Skidda',
          imgSrc: prezo,
          description: 'Best Student for the year 2024 in Petroleum Engineering.',
        },
        {
          name: 'Shepherd Ranganai',
          role: 'University of Tizouzou',
          imgSrc: vp,
          description: 'Best Student for the year 2024 in Pharmacy.',
        },
        {
          name: 'Simbarashe Chinhamo',
          role: 'University of Bejaia',
          imgSrc:simb,
          description: 'Best Student for the year 2024 in Electrical Engineering.',
        },
    ];

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
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
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

    return (
        <div className='bg-white my-8'>
        <div className='w-3/4 m-auto '>
        <div className='flex justify-center'>
            <AnimatedTitle className=" mb-8 pt-12 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white" text="2024 Best Students"/>
            </div>
            <div className='flex justify-center'>
            <p className=" font-light flex justify-center text-gray-500 dark:text-gray-400 sm:text-xl" >
            Congratulations to our top students of 2024! Your hard work, dedication, and achievements have set you apart. Keep striving for excellence and inspiring others.
            </p>
            </div>
            <div className='mt-10'>
                <Slider  {...settings}>
                    {data.map((d, i) => (
                        <div key={i} className='bg-[#f3f4f6] mb-16 h-[350px] text-black rounded-xl'>
                            <div className='rounded-t-xl bg-green-500 flex justify-center items-center'>
                                <img src={d.imgSrc} alt='image' className='h-44 w-44 object-cover'/>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                                <p className='text-xl font-semibold'>{d.name}</p>
                                <p className='text-lg font-normal'>{d.role}</p>
                                <p className="text-base font-semibold text-green-800 text-center leading-relaxed mb-4 px-6  rounded-lg">{d.description}</p>
                               
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
        </div>
    );
};

export default MPromo;
