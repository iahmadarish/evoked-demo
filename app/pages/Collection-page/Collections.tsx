import React, { useState } from "react";
// import { FaPlus, FaMinus } from "react-icons/fa";
import { useDarkMode } from "public/utils/DarkModeContext";
import { AddToSet, Checked, Dropdown, Star12 } from "public/utils/Helpers";
import { useGlobal } from "public/utils/GlobalContext";
import { Links } from "public/utils/data";

type Props = {}

export default function Collections({}: Props) {
    const { isDarkMode } = useDarkMode();
  return (
   <section>
    <div className="2xl:max-w-container mx-auto w-[90%] ">
     <div className="flex flex-wrap items-start lg:justify-center justify-center  2xl:gap-10 md:gap-10 lg:gap-7">
      {Links.map((item, index) => (
        <div
          key={item.id}
          className={`flex px-5 2xl:w-[22%] xl:w-[30%] lg:w-[280px] md:w-[40%] w-[90%]  flex-col select-none items-center gap-[25px]  rounded-[var(--md,8px)]  border ${isDarkMode
              ? "border-white"
              : "border-[color:var(--black,#171717)]"
            } border-solid `}
        >
          
          <div className="flex w-full mt-[20px] justify-between items-center">
            <div className={` px-2.5 py-[5px] rounded border  justify-center items-center gap-2.5 inline-flex ${isDarkMode ? "border-white" : "border-neutral-900 "}`}>
              <p className={`uppercase text-sm font-normal ${isDarkMode ? "text-white" : "text-zinc-800 "}`}>{item.gender}</p>
            </div>
            <span
              className={`text-center ${isDarkMode ? "text-white" : "text-zinc-800 "
                } text-[28px] font-medium leading-[120%]`}
            >
              {item.price}
            </span>
          </div>
          <div className="px-20 pb-[40px] flex flex-col select-none items-center gap-[25px]">
          <img
              src={item.link}
              alt={item.scent}
              className={
                "2xl:w-[150px] cursor-pointer 2xl:h-[231.65px] lg:w-[120px] lg:h-[180px] w-[100px] h-[150px]"
              }
            />
            <div className="flex flex-col justify-center ">
              <span
                className={`text-center text-[20px] ${isDarkMode ? "text-white" : "text-[#28282A]"
                  } lg:text-[28px] not-italic font-medium leading-[120%]`}
              >
                {item.scent}
              </span>
              <div className="flex items-end mt-[10px] justify-center">
                <div className="flex items-center ">
                {[...Array(5)].map((_, starIndex) => (
                  <Star12 key={starIndex} color={isDarkMode ? "white" : "#28282A"} />
                ))}
                </div>
                <span
                  className={` text-center ml-[5px] text-base leading-[75%] not-italic font-medium ${isDarkMode
                      ? "text-white"
                      : "text-[color:var(--Brand,#28282A)] "
                    }`}
                >
                  (123)
                </span>
              </div>
              <div className=" w-[300px] mx-auto mt-[25px] flex flex-col justify-center">
                <h6
                  className={` text-center text-[14px] lg:text-lg not-italic font-normal leading-[120%] ${isDarkMode
                      ? "text-[#FFFFFFCC]"
                      : "text-[color:var(--Brand,#28282A)]"
                    }`}
                >
                  {item.smell}
                </h6>
                <div
                  className={`inline-flex mt-[10px] mx-auto flex-col justify-center items-center  px-2.5 py-[5px] rounded-[var(--sm,4px)] border  border-solid ${isDarkMode
                      ? "border-[#454547] text-[#FFFFFFCC]"
                      : "text-[#28282A] border-[color:var(--Brand,#28282A)]"
                    }`}
                >
                  {/* Ingredients Button */}

                  <button
                    className={`flex w-48  justify-between items-center ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#28282A]"
                      } text-center text-[14px] lg:text-lg not-italic leading-[120%] $ `}
                  >
                    Ingredients{" "}
                    <Dropdown color={isDarkMode ? "white" : "#28282A"} />{" "}
                  </button>
                    <div
                      className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#28282A]"
                        } text-start`}
                    >
                     
                    </div>
                  <div className="w-[192px] h-[1px] bg-[#28282A] mx-auto my-[10px] "></div>

                  {/* Notes Button */}
                  <button
                    className={`flex w-48   justify-between items-center ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#28282A]"
                      } text-center text-[14px] lg:text-lg not-italic leading-[120%]`}
                    
                  >
                    Notes{" "}
                    <Dropdown color={isDarkMode ? "white" : "#28282A"} />
                  </button>
                    <div
                      className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#28282A]"
                        } text-start`}
                    >
                     
                    </div>
                </div>
                {/* Buy now button */}
                <button
                  className={`w-[220px] flex $ mx-auto items-center justify-center gap-2.5  text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)]  mt-[25px] ${isDarkMode
                      ? "bg-white text-primary"
                      : "bg-primary text-white"
                    }`}
                >
                  Buy now
                </button>
                  <button
                    className={`w-[220px] mx-auto gap-3 flex items-center justify-center px-5 py-2 rounded border border-solid ${isDarkMode ? "bg-primary text-white" : "bg-transparent text-[#28282A] border-[#171717]"} text-[16px] lg:text-2xl font-medium leading-[120%] mt-3`}
                  >
                    Add To Set <AddToSet color={isDarkMode ? "white" : "#28282A"} rect={isDarkMode ? "#171717" : "white"} className={undefined} />
                  </button> 
                    
                    <span className={`text-[22px] font-semibold ${isDarkMode ? "text-white" : "text-primary"}`}>
                    </span>
                    
                  </div>
              </div>
            </div>
          </div>
  )
)}
</div>
   </div>
   </section>
  )
}