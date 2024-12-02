import React from 'react';
import Slider from 'react-slick';
import prezo from '../../assets/prezo.jpg'
import vp from '../../assets/vp.jpg'
import simb from "../../assets/simb.jpg"
// Define types
interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socialLinks: SocialLinks;
}

// Define the team members data
const teamMembers: TeamMember[] = [
  {
    name: 'Lincoln Munhenzwa',
    role: 'President of AZSA',
    image: prezo,
    socialLinks: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Shephered Ranganai',
    role: 'Vice President of AZSA',
    image: vp,
    socialLinks: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Simbarashe Chinhamo',
    role: 'Parlamentarian of AZSA',
    image: simb,
    socialLinks: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#'
    }
  },
  // Add more team members if needed
];

// Define social icons
const socialIcons: Record<keyof SocialLinks, JSX.Element> = {
  facebook: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  ),
  twitter: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  ),
  instagram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
    </svg>
  ),
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 2c1.104 0 2 .896 2 2v16c0 1.104-.896 2-2 2H2c-1.104 0-2-.896-2-2V4c0-1.104.896-2 2-2h20zm-1 2H3v16h18V4zm-9.5 4.5c0-.828.672-1.5 1.5-1.5.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5zm1 3.5c-2.14 0-4.2.514-4.2 2.078V18h-3V10h3v2h.02c.58-1.073 1.88-1.971 3.73-1.971 2.15 0 3.7.9 3.7 2.5v6.072h-3v-5.095c0-.832-.674-1.5-1.5-1.5zM4 18h3v-6.5c0-1.074.9-1.5 2-1.5s2 .426 2 1.5V18h3v-8h-3v1.138c-.676-.829-1.6-1.138-2.577-1.138-1.974 0-3.423 1.36-3.423 3.5V18z" clipRule="evenodd" />
    </svg>
  )
};

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 640, // For small screens (mobile devices)
      settings: {
        slidesToShow: 1, // Show 1 slide on small screens
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // For tablets
      settings: {
        slidesToShow: 2, // Show 2 slides on tablets
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024, // For larger screens (desktops)
      settings: {
        slidesToShow: 3, // Show 3 slides on larger screens
        slidesToScroll: 3,
      },
    },
  ],
};

const Team: React.FC = () => (
  <section className="bg-gray-50 dark:bg-gray-900">
    <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">AZSA COMMITTEE</h2>
      <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
        The AZSA Committee consists of student leaders who represent student concerns and issues to the embassy officials.
      </p>
      <div className="mt-8 lg:mt-12 ">
        <Slider {...sliderSettings}>
          {teamMembers.map(({ name, role, image, socialLinks }) => (
            <div key={name} className=" p-6 text-center bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-center w-full h-40 mb-3">
                <img className="w-full h-48 object-contain" src={image} alt={`${name}'s picture`} />
              </div>
              <h3 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">{name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
              <div className="flex gap-4 mt-4 justify-center">
                {Object.keys(socialLinks).map((key) => {
                  const socialKey = key as keyof SocialLinks; // Type assertion
                  return (
                    <a key={socialKey} href={socialLinks[socialKey]} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      {socialIcons[socialKey]}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </section>
);

export default Team;
