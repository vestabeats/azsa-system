import React,{useRef} from 'react';
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import ambassadorprofile from "../../assets/ambpr.png"
import mharaparaprofile from "../../assets/mharaparaprofile.png"
import dozvaaprofile from "../../assets/dozvaprofile.png"
import staff4profile from "../../assets/staff-6.png"
import kachepaprofile from "../../assets/kachepaprofile.jpg"
import mliloprofile from "../../assets/mliloprofile.jpg"
import AnimatedTitle from '../AnimatedTitle';
const ETeam:React.FC = () => {
  const eteamRef = useRef<HTMLDivElement>(null);
  const teamMembers = [
    {
      name: 'Mr. V Ntonga',
      role: 'Ambassador',
      imgSrc: ambassadorprofile,
     
    },
    {
      name: 'Mr. C Mharapara',
      role: 'Minister Counsellor and Education Attache',
      imgSrc: mharaparaprofile ,

    },
    {
      name: 'Mr. Dozva',
      role: 'Finance Attache',
      imgSrc: dozvaaprofile,
    
    },
    {
      name: 'Ms. E Madzivadondo',
      role: 'Third Secretary',
      imgSrc: staff4profile,
     
    },
    {
      name: 'Mr. Kachepa',
      role: 'Head of Chancery',
      imgSrc: kachepaprofile,
     
    },
    {
      name: 'Mr. Mlilo',
      role: 'Minister Counsellor',
      imgSrc: mliloprofile,
      
    },
  ];

  return (
    <div ref={eteamRef} id="eteam">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center ">
           
            <AnimatedTitle text="Embassy Officials" className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"/>
           
            
             <p className="font-light text-gray-500 mb-2 sm:text-xl dark:text-gray-400">
             Embassy officials play a crucial role in representing and advancing diplomatic interests. Their work involves a range of responsibilities from fostering international relations to ensuring smooth operations within the embassy
             </p>
            
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3 mt-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src={member.imgSrc}
                    alt={`${member.name} Avatar`}
                  />
                </a>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{member.name}</a>
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">{member.role}</span>
               
                  <ul className="flex space-x-4 sm:mt-0">
                    <li>
                      <a href="#" className="text-gray-500 rounded-full hover:text-gray-900 dark:hover:text-white">
                      <FaFacebookSquare size={20} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-500 rounded-full hover:text-gray-900 dark:hover:text-white">
                      <FaInstagram size={20} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-500 rounded-full hover:text-gray-900 dark:hover:text-white">
                      <FaSquareXTwitter size={20} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-500 rounded-full hover:text-gray-900 dark:hover:text-white">
                      <FaLinkedin  size={20} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ETeam;
