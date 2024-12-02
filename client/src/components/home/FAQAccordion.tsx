import React, { useState, useRef } from 'react';
import { FaPlus,FaMinus } from 'react-icons/fa';

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
          {isOpen ?  <FaMinus className="ml-auto" style={{ verticalAlign: 'middle' }} />:
          <FaPlus className="ml-auto" style={{ verticalAlign: 'middle' }} />}
        </button>
      </h2>
      <div className={`accordion-collapse ${isOpen ? 'show' : ''}`}>
        <div className="accordion-body">{props.answer}</div>
      </div>
    </div>
  );
};

const FAQAccordion: React.FC = () => {
  return (
    <div className="w-full py-16 text-green-600 px-4">
      <div className="max-w-[1240px] mx-auto">
        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold mb-8">
          Frequently Asked Questions
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
  );
};

export default FAQAccordion;