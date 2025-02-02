import { useDarkMode } from 'public/utils/DarkModeContext';
import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '~/styles/app.css';

interface KitSliderProps {}

const KitSlider: React.FC<KitSliderProps> = () => {
  const { isDarkMode } = useDarkMode();
  const Links = [
    { link: 'Men', link2: 'Women', link3: 'Unisex', id: 1 },
    { link: 'Men', link2: 'Women', link3: 'Unisex', id: 2 },
    { link: 'Men', link2: 'Women', link3: 'Unisex', id: 3 },
    { link: 'Men', link2: 'Women', link3: 'Unisex', id: 4 },
    { link: 'Men', link2: 'Women', link3: 'Unisex', id: 5 },
  ];
  const [selectedButton, setSelectedButton] = useState<number>(1);
  const handleButtonClick = (button: number) => {
    setSelectedButton(button);
  };

  return (
    <section className={`lg:py-[100px] py-[50px] ${isDarkMode ? 'bg-[#171717] duration-300' : 'bg-white duration-300'}`}>
      <div className="lg:max-w-container w-[90%] mx-auto relative flex flex-col justify-center items-center">
        <h2 className={`lg:text-5xl text-center lg:w-auto w-[305px] text-[22px] not-italic font-bold leading-[130%] lg:leading-[normal] capitalize ${isDarkMode ? 'text-white' : 'text-[color:var(--Brand,#28282A)]'}`}>
          What’s Inside
        </h2>
        <span className={`lg:gap-x-[10px] inline-flex justify-center items-start px-2.5 py-2 rounded-[var(--lg,12px)] border ${isDarkMode ? 'border-white' : 'border-[color:var(--black,#171717)]'} border-solid lg:mt-[40px]`}>
          <button
            onClick={() => handleButtonClick(1)}
            className={`${selectedButton === 1 ? `flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[4px] text-[12px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : `flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[4px] text-[12px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A66]'}`}`}
          >
            Men’s Kit
          </button>
          <button
            onClick={() => handleButtonClick(2)}
            className={`${selectedButton === 2 ? `flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[4px] text-[12px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : `flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[4px] text-[12px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A66]'}`}`}
          >
            Women’s Kit
          </button>
          <button
            onClick={() => handleButtonClick(3)}
            className={`${selectedButton === 3 ? `flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[4px] text-[12px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-primary bg-white' : 'bg-[#171717] text-white'}` : `flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-[4px] text-[12px] lg:text-lg not-italic font-normal leading-[normal] ${isDarkMode ? 'text-white bg-transparent' : 'bg-transparent text-[#28282A66]'}`}`}
          >
            Unisex Kit
          </button>
        </span>
      </div>

      <div className={``}>
        <div className="lg:max-w-container w-[90%] mx-auto">
          <div className="lg:py-[60px] py-[30px] w-full 2xl:w-[1300px] px-0 lg:px-[50px] mx-0 lg:mx-auto ">
            {(selectedButton === 1 || selectedButton === 2 || selectedButton === 3) && (
              <Swiper
                style={
                  {
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': isDarkMode ? '#fff' : '#fff',
                  } as React.CSSProperties
                }
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                allowTouchMove={true}
                scrollbar={{ draggable: true }}
                mousewheel={true}
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => swiper}
                className="mySwiper"
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1600: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1920: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
              >
                {Links.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className={`2xl:w-[273px] w-full h-[200px] rounded-[4px] ${isDarkMode ? 'bg-[#D9D9D9]' : 'bg-[#D9D9D9]'}`}>
                      {selectedButton === 1 ? item.link : selectedButton === 2 ? item.link2 : item.link3}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="swiper-pagination mt-[50px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitSlider;
