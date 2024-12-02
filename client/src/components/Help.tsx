import React, { useState, useRef }  from 'react'
import { FaPlus } from 'react-icons/fa';
import azsa from "../assets/azsa.png"
interface Acc {
  question: string;
  answer: string;
}


const AccordionItem: React.FC<Acc> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const faqRef = useRef<HTMLDivElement>(null);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item" ref={faqRef}>
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? 'active' : ''}`}
          type="button"
          onClick={toggleAccordion}
        >
          {props.question}
          <FaPlus className="ml-auto" style={{ verticalAlign: 'middle' }} />
        </button>
      </h2>
      <div className={`accordion-collapse ${isOpen ? 'show' : ''}`}>
        <div className="accordion-body">{props.answer}</div>
      </div>
    </div>
  );
};


const Help:React.FC = () => {
  return (
    
          <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <a href="#" className="flex items-center">
            <img src={azsa} className="mr-3 h-8 sm:h-12" alt="AZSA Logo" />
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
            <span className='text-3xl text-black font-bold'>A<span className='text-green-600'>Z</span ><span className=''>S</span><span className="text-yellow-600">A</span></span>
            </span>
          </a>
      <div className="max-w-[1240px] mx-auto">
        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold my-8">
          Need Help ?
        </h1>
        <div className="accordion" id="faqAccordion">
        <AccordionItem
        question="What is stipend?"
        answer="A stipend is a fixed, regular payment or allowance provided to individuals, often students, to help cover their living expenses."
      />
        <AccordionItem
          question="Who receives the stipend?"
          answer="The stipend is awarded to students who have successfully completed and validated the academic year."
        />
        <AccordionItem
          question="When is the stipend provided?"
          answer="The stipend is typically disbursed at the end of the academic year."
        />

          {/* Add more FAQ items as needed */}
        </div>
      </div>
        </div>
    </div>
  )
}

export default Help