import { useDarkMode } from "public/utils/DarkModeContext";
import {
  Box1,
  Box2,
} from "public/utils/Helpers";
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

import { usePricing } from "public/utils/PricingContext";



interface PricingProps {
//   products: Product[];
//   collections: Collection[];
}

const Pricing: React.FC<PricingProps> = () => {
  const { isDarkMode } = useDarkMode();
  const {
    show1,
    setShow1,
  } = usePricing();
  
  const [selectedButtonDropdown, setSelectedButtonDropdown] = useState<null | number>(null);

  useEffect(() => {
    const savedShow = sessionStorage.getItem('show1');
    if (savedShow) {
      setShow1(parseInt(savedShow)); 
    }
  
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--swiper-button-color', 'white');
    } else {
      root.style.setProperty('--swiper-button-color', '#171717');
    }
  }, [isDarkMode]);
  




  const handleClick = (show: number) => {
    setShow1(show);
    sessionStorage.setItem("show1", show.toString());

    // Automatically submit form when the option is selected
    const form = new FormData();
    form.append("selectedPlan", show === 1 ? "Subscribe & Save" : "One-time Purchase");

    fetch("/", {
      method: "POST",
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
  

 

  return (
    <section className={`${isDarkMode ? 'bg-primary' : 'bg-white'}`}>
      <div className={`${isDarkMode ? 'bg-primary' : 'bg-white'}`}>
        <div
          className={`flex justify-between lg:pt-[100px] pt-[80px] ${
            isDarkMode ? "bg-primary" : "bg-white"
          }`}
        >
          <Box1 className={`lg:block hidden`} color={isDarkMode ? "white" : "#454547"} />
          <div className="2xl:max-w-container lg:w-full w-[90%] mx-auto lg:mt-[120px]">
            <div className="flex flex-col text-center">
              <h2
                className={`text-[22px] 2xl:text-5xl lg:text-[38px] lg:mb-[25px] mb-[15px] not-italic font-bold leading-[130%] lg:leading-[normal] uppercase ${
                  isDarkMode ? "text-white" : "text-[color:var(--Brand,#28282A)] "
                }`}
              >
                Pick your scents
              </h2>
              <span
                className={`text-center text-[14px] 2xl:text-2xl lg:text-[22px] not-italic font-medium leading-[160%] ${
                  isDarkMode ? "text-white" : "text-[color:var(--Brand,#28282A)] "
                }`}
              >
                Buy More, Save More. Subscribe to save most.
              </span>
              <span
                className={`text-[14px] 2xl:text-2xl lg:text-[22px] italic font-light leading-[160%] ${
                  isDarkMode ? "text-white" : "text-[color:var(--Brand,#28282A)] "
                }`}
              >
                100ml per bottle (roughly 1000 sprays) = Lasts 2 months on
                average, used generously twice daily.
              </span>
              {/* Button */}
              <div
                className={`lg:mt-[80px] mt-[30px] mx-auto inline-flex gap-2.5 lg:px-2.5 px-2 py-2 rounded-[var(--md,8px)] border  border-solid ${
                  isDarkMode
                    ? "border-white"
                    : "border-[color:var(--black,#171717)]"
                }`}
              >
                <button
                  onClick={() => handleClick(1)}
                  className={`flex justify-center items-center px-2.5 lg:px-5 py-2.5 rounded-[var(--md,8px)]  text-[14px] lg:text-lg not-italic font-normal leading-[normal]   ${
                    show1 === 1 && "activeStyle"
                  }  ${
                    isDarkMode
                      ? show1 === 1
                        ? "bg-white text-black"
                        : "bg-primary text-white"
                      : show1 === 1
                      ? "bg-[color:var(--black,#171717)] text-white"
                      : "bg-white text-[color:var(--black,#171717)]"
                  }`}
                >
                  Subscribe & Save
                </button>
                <button
                  onClick={() => handleClick(2)}
                  className={`flex justify-center items-center px-2.5 lg:px-5 py-2.5 rounded-[var(--md,8px)]  text-[14px] lg:text-lg not-italic font-normal leading-[normal]   ${
                    show1 === 2 && "activeStyle"
                  }  ${
                    isDarkMode
                      ? show1 === 2
                        ? "bg-white text-black"
                        : "bg-primary text-white"
                      : show1 === 2
                      ? "bg-[color:var(--black,#171717)] text-white"
                      : "bg-white text-[color:var(--black,#171717)]"
                  }`}
                >
                  One-time purchase
                </button>
              </div>
            </div>
          </div>
          <Box2 className={`lg:block hidden`} color={isDarkMode ? "white" : "#454547"} />
        </div>

        {/* Slider */}
        <div className="flex justify-center mt-5 md:mt-10">
          
        </div>
      </div>

      {/* Pricing details */}
      <div className={`mt-5 ${isDarkMode ? "bg-primary" : "bg-white"}`}>
       
      </div>

      {/* Button */}
      <div className={`flex justify-center mt-5 ${isDarkMode ? "bg-primary" : "bg-white"}`}>
        
      </div>

      {/* Bundle boxes */}
      <div className="flex flex-wrap justify-center mt-5 md:mt-10">
        <div className="flex flex-col md:flex-row">
        
        </div>
      </div>
    </section>
  );
};

export default Pricing;
