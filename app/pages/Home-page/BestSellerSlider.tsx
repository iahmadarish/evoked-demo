
import { useDarkMode } from "public/utils/DarkModeContext";
import { Star12, Dropdown, AddToSet } from "public/utils/Helpers";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Controller } from 'swiper/modules';
import { Links } from "public/utils/data";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useGlobal } from "public/utils/GlobalContext";
import { Image } from "@shopify/hydrogen";

// Define types for the component props
interface BestSellerSliderProps {
  handleAddToSet: (products: number) => void;
  handleIncrement: (products: number) => void;
  handleDecrement: (products: number) => void;
  products:any
  cart:any
}

interface DropdownState {
  ingredients: boolean;
  notes: boolean;
}

const BestSellerSlider: React.FC<BestSellerSliderProps> = ({ handleAddToSet, handleIncrement, handleDecrement, products, cart }) => {
  const { quantities, setQuantities } = useGlobal();
console.log(cart)
//   const [dropdownStates, setDropdownStates] = useState<DropdownState[]>(
//     Array(Links.length).fill({ ingredients: false, notes: false })
//   );

//   const toggleDropdown = (products: number, type: keyof DropdownState) => {
//     setDropdownStates((prevStates) => {
//       const newDropdownStates = [...prevStates];
//       newDropdownStates[products] = {
//         ...newDropdownStates[products],
//         [type]: !newDropdownStates[products][type],
//       };
//       return newDropdownStates;
//     });
//   };
console.log(products)
console.log(products.images.nodes[0])

  const handleAddToSetClick = (products: any) => {
    handleAddToSet(products);
  };

  const handleIncrementChild = (products: any) => {
    handleIncrement(products);
  };

  const handleDecrementChild = (products: any) => {
    setQuantities((prevQuantities: any) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[products] > 0) {
        newQuantities[products] -= 1;
      }
      return newQuantities;
    });
    handleDecrement(products);
  };

  return (
    <div>
      <Swiper
        spaceBetween={30}
        slidesPerView={'auto'}
        loop={false}
        allowTouchMove={true}
        navigation
        mousewheel
        modules={[Navigation, Controller]}
        scrollbar={{ draggable: true }}
        className={`w-full h-full bg-white text-brand light-mode`}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => swiper}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
  
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
  
            1024: {
              slidesPerView: 3,
              spaceBetween: 60,
            },
            1580: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1920: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
  
      >
          <SwiperSlide key={products.id}>
            <div className={`flex p-5 lg:w-[372px] mx-auto justify-center  flex-col select-none items-center gap-[25px]  rounded-[var(--md,8px)]  border border-[color:var(--black,#171717)] border-solid `}>
              <Image data={products.images.nodes[0]} alt={products.handle} width={200} height={200} />
              <span className={`text-center mt-2 text-brand`}>
                {products.title}
              </span>
              <div className="flex items-end mt-[10px] justify-center">
                <div className="flex items-center">
                  <Star12 color={"#28282A"} />
                  <Star12 color={"#28282A"} />
                  <Star12 color={"#28282A"} />
                  <Star12 color={"#28282A"} />
                  <Star12 color={"#28282A"} />
                </div>
                <span
                  className={`text-center ml-[5px] text-base leading-[75%] not-italic font-medium text-[color:var(--Brand,#28282A)]`}
                >
                  (123)
                </span>
              </div>
              <div className="w-[300px] mx-auto mt-[25px] flex flex-col justify-center">
                <h6
                  className={`text-center text-[14px] lg:text-lg not-italic font-normal leading-[120%] text-[color:var(--Brand,#28282A)]`}
                >
                  {products.title}
                </h6>
                <div
                  className={`inline-flex mt-[10px] mx-auto flex-col justify-center items-center px-2.5 py-[5px] rounded-[var(--sm,4px)] border border-solid text-[#28282A] border-[color:var(--Brand,#28282A)]`}
                >
                  {/* Ingredients Button */}
                  {/* <button
                    className={`flex w-48 justify-between items-center ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#28282A]"} text-center text-[14px] lg:text-lg not-italic leading-[120%]`}
                    onClick={() => toggleDropdown(products, "ingredients")}
                  >
                    Ingredients{" "}
                    <Dropdown color={"#28282A"} />{" "}
                  </button> */}
                  {/* {dropdownStates[products].ingredients && (
                    <div
                      className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#28282A]"} text-start`}
                    >
                      {products.handle}
                    </div>
                  )} */}
                  <div className="w-[192px] h-[1px] bg-[#28282A] mx-auto my-[10px] "></div>

                  {/* Notes Button */}
                  {/* <button
                    className={`flex w-48 justify-between items-center ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#28282A]"} text-center text-[14px] lg:text-lg not-italic leading-[120%]`}
                    onClick={() => toggleDropdown(products, "notes")}
                  >
                    Notes{" "}
                    <Dropdown color={"#28282A"} />
                  </button>
                  {dropdownStates[products].notes && (
                    <div
                      className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#28282A]"} text-start`}
                    >
                      {products.handle}
                    </div>
                  )} */}
                </div>
                {/* Buy now button */}
                <button
                  className={`w-[220px] flex mx-auto items-center justify-center gap-2.5 text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] bg-primary text-white`}
                >
                  Buy now
                </button>
                {/* Add to Set button */}
                  <button
                    onClick={() => handleAddToSetClick(products)}
                    className={`w-[220px] mx-auto gap-3 flex items-center justify-center px-5 py-2 rounded border border-solid bg-transparent text-[#28282A] border-[#171717] text-[16px] lg:text-2xl font-medium leading-[120%] mt-3`}
                  >
                    Add To Set <AddToSet color={"#28282A"} rect={"white"} className={undefined} />
                  </button>
                  
              </div>
            </div>
          </SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default BestSellerSlider;
