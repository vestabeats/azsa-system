import React, { useState, useRef, useEffect } from 'react';
import azsa from "../../assets/azsa.png";
import FAQAccordion from './FAQAccordion';
import ETeam from './ETeam';
import Hero from './Hero';
import Team from './Team';
import ContactUs from './ContactUs';
import MPromo from './MPromo';
import { useSelector } from 'react-redux';
import UserAvatar from '../UserAvatar';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.auth);
  const [activeSection, setActiveSection] = useState<string>('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const eteamRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const comRef = useRef<HTMLDivElement>(null);
  const bestRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>, section: string) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
      setActiveSection('home');
    } else if (eteamRef.current && scrollPosition < eteamRef.current.offsetTop + eteamRef.current.offsetHeight) {
      setActiveSection('eteam');
    } else if (faqRef.current && scrollPosition < faqRef.current.offsetTop + faqRef.current.offsetHeight) {
      setActiveSection('faq');
    } 
    else if (comRef.current && scrollPosition < comRef.current.offsetTop + comRef.current.offsetHeight) {
      setActiveSection('committee');
    }
    else if (contactRef.current && scrollPosition < contactRef.current.offsetTop + contactRef.current.offsetHeight) {
      setActiveSection('contact');
    }
   
    else if (bestRef.current && scrollPosition >= bestRef.current.offsetTop) {
      setActiveSection('beststudents');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkClasses = (section: string) => {
    return activeSection === section
      ? 'text-green-700 border-b-2 border-green-700'
      : 'text-gray-700 hover:text-green-700';
  };
function HomeSection(){
    return(
      <>
       {/* Sections */}
       <div ref={homeRef} >
        <Hero />
      </div>
      <div ref={eteamRef}>
        <ETeam />
      </div>
      <div ref={faqRef}>
        <FAQAccordion />
      </div>
      <div ref={comRef}>
        <Team/>
      </div>
      <div ref={contactRef}>
        <ContactUs />
      </div>
      <div ref={bestRef}>
        <MPromo/>
      </div>
     
    </>

    )
  }

  return (
    <>
      <header className="w-full pl-2 h-auto overflow-hidden">
      <nav
        className={`bg-white top-0 mx-auto z-50 shadow p-2.5 dark:bg-gray-800 fixed left-0 right-0`}
      >
        <div className="bg-green-600 h-10 w-full z-50 ">
        <div className='flex justify-center items-center '>
  <p className="text-white text-center font-semibold items-center p-2 tracking-wide leading-relaxed text-xs sm:text-sm md:text-base  break-words max-w-full">
    {`INSCRIPTION HAS ALREADY STARTED  FOR THE ACADEMIC YEAR 20`.toUpperCase()}{''}
    <span className="text-yellow-300">24</span>/20<span className="text-yellow-300">25</span>
  </p>
</div>

        </div>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={azsa} className="mr-3 h-8 sm:h-12" alt="AZSA Logo" />
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
              <span className="text-3xl text-black font-bold">
                A<span className="text-green-600">Z</span>
                <span>S</span>
                <span className="text-yellow-600">A</span>
              </span>
            </span>
          </Link>
          <div className="flex justify-end lg:order-2 pt-2">
            {user ? (
              <UserAvatar />
            ) : (
              <Link
                to="/login"
                className="bg-green-600 dark:text-white p-2 text-white hover:bg-green-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
            )}

            <button
              onClick={toggleMenu}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li onClick={() => scrollToSection(homeRef, 'home')}>
                <a
                  className={`block py-2 pr-4 pl-3 cursor-pointer lg:p-0 ${getLinkClasses('home')}`}
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li onClick={() => scrollToSection(eteamRef, 'eteam')}>
                <a
                  className={`block py-2 pr-4 pl-3 cursor-pointer lg:p-0 ${getLinkClasses('eteam')}`}
                >
                  Embassy Officials
                </a>
              </li>
             
              <li onClick={() => scrollToSection(faqRef, 'faq')}>
                <a
                  className={`block py-2 pr-4 pl-3 cursor-pointer lg:p-0 ${getLinkClasses('faq')}`}
                >
                  FAQ
                </a>
              </li>
              <li onClick={() => scrollToSection(comRef, 'committee')}>
                <a
                  className={`block py-2 pr-4 pl-3 cursor-pointer lg:p-0 ${getLinkClasses('committee')}`}
                >
                  Commitee
                </a>
              </li>
              <li onClick={() => scrollToSection(contactRef, 'contact')}>
                <a
                  className={`block py-2 pr-4 pl-3 cursor-pointer lg:p-0 ${getLinkClasses('contact')}`}
                >
                  Contact Us
                </a>
              </li>
              <li onClick={() => scrollToSection(bestRef, 'beststudents')}>
                <a
                  className={`block py-2 pr-4 pl-3 cursor-pointer lg:p-0 ${getLinkClasses('beststudents')}`}
                >
                  Best Students
                </a>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </header>
<HomeSection/>
     
    </>
  );
};

export default Header;
