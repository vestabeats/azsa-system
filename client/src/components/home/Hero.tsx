import { useState } from "react";
import flag from "../../assets/ambassadorpic.jpg";
import { heroImg } from "../../constants";
import HeroCard from "./HeroCard";
import { useSelector } from "react-redux";
import AnimatedTitle from "../AnimatedTitle";
import { Link } from "react-router-dom";

const Hero:React.FC = () => {
  const [flagImg, setFlagImg] = useState<string>(flag);
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 mt-24 ">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:mt-[-15rem] lg:col-span-7 ">
        
  <h1 className="max-w-2xl p-4text-center  mb-2 text-4xl font-extrabold  md:text-5xl xl:text-6xl">Connect  with
  A<span className='text-green-600'>Z</span ><span className=''>S</span><span className="text-yellow-600">A</span> Community </h1>


 <AnimatedTitle className="  md:mb-1  font-light text-gray-500  text-lg lg:text-xl " text="Discover opportunities, engage with embassy officials, and contribute to AZSA's vibrant community."/>


           
            <div className="flex space-x-3 mt-4 mb-4">
            {user && 
              <Link
                to="/dashboard"
               className="inline-flex  items-center justify-center px-5 py-3 text-base font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
              >
               Dashboard
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>}
             
              <Link
                to="/help"
                target='_blank'
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium  border text-white border-green-500 rounded-lg bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-green-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Find Help
              </Link>
              
              
               <Link
                to="/policy"
                target='_blank'
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium  border text-gray-800 border-green-500 rounded-lg hover:bg-gray-100  focus:ring-4 focus:ring-green-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Read Policy
              </Link>
            </div>
          </div>
          <div className=" lg:flex lg:col-span-5 lg:flex-col items-center">
            <img
              width={610}
              height={510}
              className="object-contain z-10 w-full mb-4 rounded"
              src={flagImg}
              alt="mockup"
            />
            <div className="flex flex-row lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg">
              {heroImg.map((pic: any) => (
                <div key={pic} className="p-2 ">
                  <HeroCard
                    imgURL={pic}
                    changeImage={(pic: any) => setFlagImg(pic)}
                    MainImg={flagImg}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
