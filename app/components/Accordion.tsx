import React, { useState } from 'react';

import lightMinus from '/assets/add_1.svg';
import lightPlus from '/assets/add.svg';
import darkMinus from '/assets/darkMinus.svg';
import darkPlus from '/assets/darkPlus.svg';

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggleAccordion} className={`lg:flex ${isOpen && 'px-[30px] py-[25px] bg-[#f2f0ea] border-none rounded-xl'} flex md:inline-flex mb-[30px] md:w-[70%] lg:w-[690px] w-full flex-col items-start md:items-center text-start justify-start gap-x-[15px] select-none cursor-pointer mx-auto lg:p-[20px]  py-[15px] px-[20px] border-b border-[#010101]/30 `}>
      <button
        className="w-full flex justify-between items-center focus:outline-none"
      >
        <span className={` fontFeature text-[color:var(--Brand,#28282A)] lg:text-[22px] text-start text-[16px] not-italic font-medium leading-[120%] lg:leading-7`}>{title}</span>
        
               <img className='lg:w-auto lg:h-auto h-[28px] w-[60px]' src={ isOpen ? lightMinus : lightPlus} alt='Icons'/> 
      </button>
      {isOpen && <div className={` py-[25px] bg-[#f2f0ea] rounded-xl text-start md:w-[70%] lg:w-auto 2xl:text-[18px] lg:text-[16px] text-[12px] not-italic font-light leading-7 fontFeature text-[color:var(--brand-70,rgba(40,40,42,0.70))]`}>{content}</div>}
    </div>
  );
};



const Accordion = () => {
  const accordionData = [
    {
      title: 'What is Webflow and why is it the best website builder?',
      content:
        'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
    },
    {
      title: 'What is Webflow and why is it the best website builder?',
      content:
        'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
    },
    {
      title: 'What is Webflow and why is it the best website builder?',
      content:
        'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
    },
    {
      title: 'What is Webflow and why is it the best website builder?',
      content:
        'Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.',
    },
  ];

  return (
    <section className={`lg:pt-[100px] lg:pb-[100px] pt-[80px] pb-[40px]  `}>
      <div className="lg:max-w-container w-[90%] mx-auto">
        <div className="pb-[50px] lg:block md:flex md:flex-col justify-center items-center">

        
        <h2 className={` text-center 2xl:text-5xl text-[color:var(--Brand,#28282A)] lg:text-[38px] text-[22px] not-italic font-bold leading-[130%] uppercase mb-[30px] lg:mb-[80px] `}>Frequently Asked Questions</h2>
      {accordionData.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
        
      ))
          }
        </div>
      </div>
      
    </section>
  );
};

export default Accordion
