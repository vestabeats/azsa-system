import React from 'react';
import azsa from '../assets/azsa.png'
const Policy: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <a href="#" className="flex items-center">
            <img src={azsa} className="mr-3 h-8 sm:h-12" alt="AZSA Logo" />
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
            <span className='text-3xl text-black font-bold'>A<span className='text-green-600'>Z</span ><span className=''>S</span><span className="text-yellow-600">A</span></span>
            </span>
          </a>
        <h1 className="text-2xl font-bold text-gray-800 my-4">Student Policy</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Dos</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">Attend all scheduled classes and submit assignments on time.</li>
            <li className="mb-2">Maintain respectful behavior towards faculty, staff, and peers.</li>
            <li className="mb-2">Utilize resources provided by the institution responsibly.</li>
            <li className="mb-2">Follow all safety and health regulations on campus.</li>
            <li className="mb-2">Seek help and support from academic advisors when needed.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Don'ts</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">Do not engage in any form of academic dishonesty, including plagiarism and cheating.</li>
            <li className="mb-2">Do not disrupt classes or create a hostile environment for others.</li>
            <li className="mb-2">Do not misuse institutional resources or facilities.</li>
            <li className="mb-2">Do not partake in any illegal activities on campus or in relation to the institution.</li>
            <li className="mb-2">Do not ignore official communications from the institution.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Terms and Conditions</h2>
          <p className="text-gray-600 mb-4">
            By enrolling at our institution, you agree to adhere to all the policies and regulations set forth.
            Failure to comply with these policies may result in disciplinary action, including but not limited to
            suspension or expulsion. We reserve the right to update and modify these policies as needed. Students
            will be notified of any significant changes, and it is the student's responsibility to stay informed.
          </p>
          <p className="text-gray-600">
            For any questions or concerns regarding these policies, please contact the administration office.
          </p>
        </section>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Acknowledgment</h3>
          <p className="text-gray-600 mt-2">
            By continuing with your enrollment, you acknowledge that you have read, understood, and agreed to
            the policies outlined above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
