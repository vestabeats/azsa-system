
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <>
     <div  className='mx-auto  py-16 px-14 grid lg:grid-cols-3 bg-green-600 gap-8 text-white '>
                <div>
                    <h1 className='w-full text-3xl font-bold text-white'>AZSA</h1>
                    <p className='py-4'>Driving Your Career Forward: AZSA Career Craft is dedicated to empowering interns & apprentices by providing the tools and guidance needed to navigate their professional journey, transforming potential into achievement and fostering the leaders of tomorrow.</p>
                    <div className='flex justify-between md:w-[75%] my-6'>
                        <FaFacebookSquare size={30} />
                        <FaInstagram size={30} />
                        <FaSquareXTwitter size={30} />
                        <FaLinkedin  size={30} />
                        
                    </div>
                </div>
                <div className='lg:col-span-2 flex justify-between mt-6'>
                    <div>
                        <h6 className='font-medium text-gray-400'>Solutions</h6>
                        <ul>
                        <li className='py-2 text-sm'>Intern Tracking</li>
                        <li className='py-2 text-sm'>Apprentice Management</li>
                        <li className='py-2 text-sm'>Performance Analytics</li>
                        <li className='py-2 text-sm'>Skill Development</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Support</h6>
                        <ul>
                            
                        <li className='py-2 text-sm'>User Guides</li>
                        <li className='py-2 text-sm'>FAQs</li>
                        <li className='py-2 text-sm'>Customer Service</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Company</h6>
                        <ul>
                        <li className='py-2 text-sm'>About Us</li>
                        <li className='py-2 text-sm'>Our Team</li>
                        <li className='py-2 text-sm'>Careers</li>
                        <li className='py-2 text-sm'>News</li>
                            
                        </ul>
                    </div>
                    <div className='ml-2'>
                        <h6 className='font-medium text-gray-400'>Legal</h6>
                        <ul>
                        <li className='py-2 text-sm'>Privacy Policy</li>
                        <li className='py-2 text-sm'>Terms of Service</li>
                        <li className='py-2 text-sm'>Compliance</li>
                        </ul>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Footer