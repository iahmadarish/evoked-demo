import { useDarkMode } from "public/utils/DarkModeContext";
import circle from "/assets/circle.svg";
import checkedCircle from "/assets/checkedCircle.svg";
import React, { useState, useEffect, useRef } from "react";
import darkGrey from '/assets/darkNotSelected.svg';
import darkBlack from '/assets/darkSelected.png';
import { usePricing } from "public/utils/PricingContext";

interface SubscriptionOption {
  name: string;
  selectedOption: string;
  rate: string;
  rate50: string;
  discount50?: string;
  discount?: string;
  shipping: string;
  includes: string;
  firstPoint: string;
  firstPoint50: string;
  lastPoint: string;
  spray: string;
  trend?: boolean;
  trendName?: string;
}

const SubscribeAndSave: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { show1, setShow1, selectedButton, setSelectedButton, selectedPlan, setSelectedPlan, selectedOptions, setSelectedOptions, selectedimgs, setSelectedimgs } = usePricing();
  const [selectedTrend, setSelectedTrend] = useState<boolean>(true);
  const data: SubscriptionOption[] = [
    { name: '1 Perfume', selectedOption: "Evoked Perfume Set Subscription (Every 2 Months)", rate: '£40/2 months', rate50: '£20/2 months', shipping: 'Free shipping & returns. ', includes: 'What’s included:', firstPoint: '1 x 100ml perfume (lasts 2 months)', firstPoint50: '1 x 50ml perfume (lasts 2 months)', lastPoint: '1 x 5ml sample (free compliment)', spray: '£0.04 per spray' },
    { name: '2 Perfumes', selectedOption: "Evoked Perfume Set Subscription (Every 4 Months)", rate: '£60/4 months', rate50: '£30/4 months', discount50: '£40 ', discount: '£80 ', shipping: 'Free shipping & returns. ', includes: 'What’s included:', firstPoint: '2 x 100ml perfumes (lasts 4 months)', firstPoint50: '2 x 50ml perfume (lasts 4 months)', lastPoint: '2 x 5ml samples (free compliments)', spray: '£0.03 per spray', trend: selectedTrend, trendName: 'MOST POPULAR' },
    { name: '3 Perfumes', selectedOption: "Evoked Perfume Set Subscription (Every 6 Months)", rate: '£75/6 months', rate50: '£37/6 months', discount50: '£60 ', discount: '£120 ', shipping: 'Free shipping & returns. ', includes: 'What’s included:', firstPoint: '3 x 100ml perfumes (lasts 6 months)', firstPoint50: '1 x 50ml perfume (lasts 6 months)', lastPoint: '3 x 5ml samples (free compliments)', spray: '£0.02 per spray', trend: selectedTrend, trendName: 'BEST VALUE' }
  ];


  // State variables
  const [selectedPlanColors, setSelectedPlanColors] = useState<boolean[]>(data.map(() => true)); // selectedPlanColor for each dropdown



  const handleOptionPlanChange = (option: string, index: number): void => {
    setSelectedPlan(option);
    setSelectedPlanColors((prevColors) =>
      prevColors.map((value, i) => (i === index ? true : value))
    );
    sessionStorage.setItem('selectedPlan', option); 
    const form = new FormData();
    form.append('selectedPlan', option);

    fetch('/', {
      method: 'POST',
      body: form,
    })
    .then((response) => response.json())
    .then((data: any) => {
      if (data.success) {
        console.log("Plan successfully selected");
      } else {
        console.error("Error selecting plan");
      }
    });
  };



  const selectedPlanData = data.find((item) => item.name === selectedPlan);
  let originalPrice = '';
  let discountedPrice = '';
  if (selectedPlanData) {
    const rateKey = selectedOptions[data.indexOf(selectedPlanData)].includes('50ml') ? 'rate50' : 'rate';
    const discountKey = selectedOptions[data.indexOf(selectedPlanData)].includes('50ml') ? 'discount50' : 'discount';

    const originalPriceParts = selectedPlanData[discountKey]
      ? selectedPlanData[discountKey].split('/')
      : selectedPlanData[rateKey].split('/');
    originalPrice = originalPriceParts.length > 0 ? originalPriceParts[0].trim() : '';

    if (selectedPlanData[discountKey]) {
      discountedPrice = selectedPlanData[rateKey].split('/')[0].trim();
    }
  }

  useEffect(() => {
    const savedPlan = sessionStorage.getItem('selectedPlan');
    if (savedPlan) {
      setSelectedPlan(savedPlan); // Set the saved plan as the initial state
    }

    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--swiper-button-color', 'white');
    } else {
      root.style.setProperty('--swiper-button-color', '#171717');
    }
  }, [isDarkMode]);

  return (
    <div className={`${isDarkMode ? 'bg-primary' : 'bg-white'} lg:flex items-start lg:justify-center gap-[30px] self-stretch `}>
      {show1 === 1 && (
        data.map(({ name, rate, discount, shipping, includes, firstPoint, firstPoint50, lastPoint, spray, rate50, discount50, trend, trendName }, index) => (
            
            <div onClick={() => handleOptionPlanChange(name, index)} className="lg:block cursor-pointer hidden">
                      
            <div key={index} className={`flex flex-col items-start px-5 py-[30px] ${trend ? 'rounded-t-[var(--md,8px)] ' : 'rounded-[var(--md,8px)] '} border   border-solid  ${selectedPlan === name ? `${isDarkMode ? 'bg-white border-white' : 'border-white bg-primary'}` : `${isDarkMode ? 'bg-[#454547] border-white' : ' bg-white border-[color:var(--black,#171717)]'}`} `}>
              <div className="flex items-center 2xl:gap-10 lg:gap-8 lg:w-full">
               <div className="flex items-center gap-3 w-full">
               <h6 className={` xxl:text-[38px] 2xl:w-[auto] lg:w-auto 2xl:text-[30px] lg:text-[24px] not-italic font-semibold leading-[normal] ${selectedPlan === name ? `${isDarkMode ? ' text-primary' : 'text-white'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{name}</h6>
                {/* Select  */}
                <div className="relative 2xl:w-auto lg:w-auto" >
                  <span className="rounded-md shadow-sm">
                    <div
                      className={`flex cursor-default items-center gap-2.5 px-2 py-[3px] rounded-[var(--sm,4px)] border  border-solid  2xl:text-[18px] lg:text-[12px] not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary border-primary' : 'text-white border-white'}` : `${isDarkMode ? 'text-white border-white' : 'text-[color:var(--Brand,#28282A)] border-[color:var(--Brand,#28282A)]'}`}`}
                  
                    >
                      100ml
                      {/* <DownArrow2 color={selectedPlan === name ? `${isDarkMode ? '#171717' : 'white'}` : `${isDarkMode ? 'white' : '#28282A'}`} /> */}
                    </div>
                  </span>
      
                </div>
               </div>
                {/* CheckMark */}
                <div className=" 2xl:w-auto lg:w-auto">
                    
                    {
                      isDarkMode ? 
                        <img onClick={() => handleOptionPlanChange(name, index)} src={selectedPlan === name ? darkBlack : darkGrey} alt="Circle" />
                        : <img onClick={() => handleOptionPlanChange(name, index)} src={selectedPlan === name ? checkedCircle : circle} alt="Circle" />
                    }
                </div>
              </div>
              <span  className={`2xl:text-[28px] lg:text-[20px] not-italic font-normal leading-[normal] mt-[25px] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-white'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}><span className={` 2xl:text-[22px] lg:text-[18px] not-italic font-normal leading-[normal] line-through ${selectedPlan === name ? `${isDarkMode ? 'text-[#171717CC]' : 'text-[rgba(255,255,255,0.80)]'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#171717CC]'}`}`}>{selectedOptions[index] === "50ml" ? discount50 : discount}</span>{selectedOptions[index] === "50ml" ? rate50 : rate}</span>
              <span className={`mt-[30px] 2xl:text-xl lg:text-[16px]  not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{includes}</span>
              <span className={` mt-[15px] 2xl:text-base lg:text-[14px]  not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{selectedOptions[index] === "50ml" ? firstPoint50 : firstPoint}</span>
              <span className={` mt-[10px] 2xl:text-base lg:text-[14px] not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{lastPoint}</span>
              <span className={` 2xl:text-xl lg:text-[16px] not-italic font-light leading-[normal] mt-[30px] ml-auto ${selectedPlan === name ? `${isDarkMode ? 'text-[#28282ACC]' : 'text-[#FFFFFFCC]'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[color:var(--brand-70,rgba(40,40,42,0.70))]'}`}`}>{spray}</span>
              </div>
              {
                trend && (
                  <div className={`flex justify-between items-center self-stretch p-5 rounded-[0px_0px_var(--md,8px)_var(--md,8px)] border-b border-l border-r  border-solid ${isDarkMode ? 'border-white ' : 'border-[color:var(--black,#171717)] '}`}>
                    <span className={` text-center mx-auto 2xl:text-3xl not-italic font-bold leading-[normal] ${isDarkMode ? 'text-white ' : 'text-[color:var(--black,#171717)]'}`}>
                    {trendName}
                    </span> 
                  </div>
                )
              }
            </div>
        ))
      )}
{/* Mobile device */}
{
                  // Mobile Device
                  show1 === 1 &&
                  <div className={`lg:hidden block md:w-[70%] mx-0 md:mx-auto w-[100%]`}>
                  <div className={`inline-flex justify-center items-center gap-x-[20px] mt-[30px] mb-[20px] py-[10px] border-b border-solid ${isDarkMode ? 'border-white' : 'border-primary'}`}>
                  { data.map(({ name }, index) => (
                     
                    <div onClick={() => handleOptionPlanChange(name, index)} className={` text-center text-base not-italic cursor-pointer font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-white' : 'text-primary'}` : `${isDarkMode ? 'text-[color:var(--brand2,#454547)]' : 'text-gray-500'}`}`}>
                      {name}
                      </div>
                     
                
                 
                  ))}
                    </div>
                {
                show1 === 1 && 
                (
                  data.map(({ name, rate, discount, shipping, includes, firstPoint, firstPoint50, lastPoint, spray, rate50,discount50, trend, trendName }, index) => (
                    
                    
                      
                        selectedPlan === name &&
                        <div onClick={() => handleOptionPlanChange(name, index)} className="">
                          {
                            trend && (
                              <div className={`flex justify-between items-center self-stretch lg:p-5 py-[10px] px-[20px] rounded-t-[8px] border-t border-r border-l  border-solid ${isDarkMode ? 'border-white ' : 'border-[color:var(--black,#171717)] '} `}>
                                <span className={` text-center mx-auto text-[16px] lg:text-3xl not-italic font-bold leading-[normal] ${isDarkMode ? 'text-white ' : 'text-[color:var(--black,#171717)]'}`}>
                                {trendName}
                                </span> 
                              </div>
                            )
                          }
                        <div key={index} className={`flex flex-col items-start lg:px-5 lg:py-[30px] md:p-[20px] p-[10px] rounded-b-[8px]  border border-solid ${selectedPlan === '1 Perfume' && 'rounded-[8px]'}  ${selectedPlan === name ? `${isDarkMode ? 'bg-white border-white' : 'border-primary bg-primary'}` : `${isDarkMode ? 'bg-[#454547] border-white' : ' bg-white border-[color:var(--black,#171717)]'}`} `}>
                          <div className="flex items-center justify-between w-full">
                            {/* Select  */}
                            <span  className={`lg:text-[28px] text-[20px] not-italic font-normal leading-[normal]  ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-white'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}><span className={` lg:text-[22px] text-[12px] not-italic font-normal leading-[normal] line-through ${selectedPlan === name ? `${isDarkMode ? 'text-[#171717CC]' : 'text-[rgba(255,255,255,0.80)]'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#171717CC]'}`}`}>{selectedOptions[index] === "50ml" ? discount50 : discount}</span>{selectedOptions[index] === "50ml" ? rate50 : rate}</span>
                           
                            {/* CheckMark */}
                            <div className="flex justify-end ml-auto lg:w-auto lg:h-auto w-[25px] h-[25px]">
                                
                                {
                                  isDarkMode ? 
                                    <img onClick={() => handleOptionPlanChange(name, index)} src={selectedPlan === name ? darkBlack : darkGrey} alt="Circle" />
                                    : <img onClick={() => handleOptionPlanChange(name, index)} src={selectedPlan === name ? checkedCircle : circle} alt="Circle" />
                                }
                            </div>
                          </div>
                          <div className="relative mt-[10px]" >
                              <span className="rounded-md shadow-sm">
                                <button
                                 
                                  type="button"
                                  className={`flex items-center gap-2.5 lg:px-2.5 lg:py-[5px] p-1 rounded-[var(--sm,4px)] border  border-solid  lg:text-xl text-[12px] not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary border-primary' : 'text-white border-white'}` : `${isDarkMode ? 'text-white border-white' : 'text-[color:var(--Brand,#28282A)] border-[color:var(--Brand,#28282A)]'}`}`}
                                >
                                  100ml
              
                                </button>
                              </span>
                  
                                <div
                                  className={`origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg  ring-1  ring-opacity-5 ${selectedPlan === name ? `${isDarkMode ? 'ring-white bg-primary' : 'ring-black bg-white'}` : 'ring-black bg-white'}`}
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby={`options-menu-${index}`}
                                >
                                  <div className="py-1" role="none">
                                    <button
                                      onClick={() => handleOptionPlanChange("100ml", index)}
                                      className={`${selectedOptions[index] === "100ml" ? "" : ""} block w-full text-left px-4 py-2 text-sm  ${selectedPlan === name ? `${isDarkMode ? 'text-white' :'text-primary hover:bg-gray-100 hover:text-gray-900'}` : `'text-gray-700 hover:bg-gray-100 hover:text-gray-900'`}`}
                                      role="menuitem"
                                    >
                                      100ml
                                    </button>
                                  
                                  </div>
                                </div>
                            </div>
                          <span className={`mt-[20px] text-[16px] lg:text-xl not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{includes}</span>
                          <span className={` mt-[15px] text-[14px] lg:text-base not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{selectedOptions[index] === "50ml" ? firstPoint50 : firstPoint}</span>
                          <span className={` mt-[10px] text-[14px] lg:text-base not-italic font-normal leading-[normal] ${selectedPlan === name ? `${isDarkMode ? 'text-primary' : 'text-[white]'}` : `${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}`}>{lastPoint}</span>
                          <span className={` text-[16px] lg:text-xl not-italic font-light leading-[normal] mt-[30px] ml-auto ${selectedPlan === name ? `${isDarkMode ? 'text-[#28282ACC]' : 'text-[#FFFFFFCC]'}` : `${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[color:var(--brand-70,rgba(40,40,42,0.70))]'}`}`}>{spray}</span>
                          </div>
                          
                          </div>
                    
                     
                  ))
                )
                  }
                 </div>
                }
    </div>
  );
};

export default SubscribeAndSave;
