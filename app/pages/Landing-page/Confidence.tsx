

import React, { useState } from 'react';
import app from '/assets/app screen.png';
import frame from '/assets/Frame (5).svg';
import mobileApp from '/assets/halfScreen.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Mousewheel, Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import arrow1 from '/assets/majesticons_arrow-up (1).svg';
import arrow2 from '/assets/majesticons_arrow-up.svg';
type ConfidenceItem = {
    title: string;
    description: string;
    imageFrame: any;
    imageUrl: any;
  };
  
  
  const confidenceData: ConfidenceItem[] = [
    {
      title: "Chat about problems",
      description: "Borem ipsum dolor sit amet consectetur. Turpis tristique nulla posuere et amet arcu dictum ultricies convallis.",
      imageFrame:frame,
      imageUrl: app,
    },
    {
      title: "Read self-growth guides",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageFrame:frame,
      imageUrl: "https://via.placeholder.com/398x818?text=Read+self-growth+guides",
    },
    {
      title: "Perform tasks for improving confidence",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageFrame:frame,
      imageUrl: "https://via.placeholder.com/398x818?text=Perform+tasks",
    },
    {
      title: "Shop and win products",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageFrame:frame,
      imageUrl: "https://via.placeholder.com/398x818?text=Shop+and+win+products",
    },
  ];
  const confidenceDataForMobile: ConfidenceItem[] = [
    {
      title: "Chat about problems",
      description: "Meet Joy, your new AI bestie that gets you! Find perfumes that fit your vibe. Get helpful advice to solve problems at work, health & relationships. Joy’s there when you need him.",
      imageFrame:frame,
      imageUrl: mobileApp,
    },
    {
      title: "Read self-growth guides",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageFrame:frame,
      imageUrl: mobileApp,
    },
    {
      title: "Perform tasks for improving confidence",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageFrame:frame,
      imageUrl: mobileApp,
    },
    {
      title: "Shop and win products",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageFrame:frame,
      imageUrl: mobileApp,
    },
  ];
  
  


  const Confidence: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0); // State for the currently selected item
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const handleClick = (index: number) => {
      setSelectedIndex(index); // Update the selected index on click
    };
  
    return (
      <section className="py-12 md:py-24 lg:py-[150px] lg:bg-[#f2f0ea] rounded-3xl overflow-x-hidden">
        <div className="max-w-container 4k:max-w-container2 mx-auto lg:block hidden">
        <div className="py-12  flex flex-col justify-center items-center gap-16 lg:gap-[70px]">
          <div className="text-center">
            <span className="text-[#010101] text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-tight">
              It’s not all about perfumes though...<br />
              Keep improving your 
            </span>
            <span className="text-[#edcf5d] text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-tight">
              confidence levels
            </span>
          </div>
  
          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20">
            <div className="flex flex-col gap-8 lg:gap-10">
              {confidenceData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(index)} // Set click handler
                  className={`px-5 py-4 lg:w-[600px] rounded-xl  flex gap-4 cursor-pointer transition-transform transform  ${selectedIndex === index ? 'bg-white shadow-md' : 'bg-white/30 hover:scale-105'}`}
                >
                  <div className="relative w-[20%]">
                    <img className={`${selectedIndex === index ? '' : 'opacity-[0.6]'}`} src={item.imageFrame} alt="Frame" />
                  </div>
                  <div className="flex gap-3 flex-col w-[80%]">
                    <h4 className={` ${selectedIndex === index ? 'text-[#975000]' : 'text-[#975000] text-opacity-[0.3]'} text-[20px] md:text-[24px] lg:text-[32px] font-bold leading-[120%] `}>
                      {item.title}
                    </h4>
                    <p className={` ${selectedIndex === index ? 'text-[#010101]/70' : 'text-[#010101]/30 '} text-sm md:text-base lg:text-xl font-normal leading-[1.5]`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <img className="w-[250px] md:w-[398px] h-auto rounded-2xl" src={confidenceData[selectedIndex].imageUrl} alt={confidenceData[selectedIndex].title} />
          </div>
        </div>
        </div>
        <div className="lg:hidden block w-[90%] mx-auto">
        <div className="text-center mb-[30px]"><span className="text-[#010101] text-[22px] font-bold font-['Satoshi'] leading-7">Continue improving your 
        <span className="bg-gradient-text bg-clip-text text-transparent"> confidence</span> game in our app </span></div>
        <Swiper
                  modules={[Navigation, Mousewheel, Autoplay]}
                  navigation={{
                    nextEl: '.custom-next2',
                    prevEl: '.custom-prev2',
                  }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false, 
                  }}
                  spaceBetween={30}
                  slidesPerView="auto"
                  loop={false}
                  allowTouchMove={true}
                  mousewheel={true}
                  className="w-full h-full"
                  onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                  }}
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
                      spaceBetween: 20,
                    },
                    1920: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                > 
                  {confidenceDataForMobile.map((product, index) => {
  return (
                    <SwiperSlide
                      key={product.title}
                      className={``}
                    >
                    
                    <div className="flex-col justify-start items-center gap-[30px] flex">
    <div className=" flex-col justify-center items-center gap-[30px] flex">
        <div className="flex-col justify-center items-center gap-[15px] flex">
            <img className="" src={product.imageUrl} alt='Image' />
            <div className="p-[15px] bg-[#f4f4f4] rounded-lg justify-start items-center gap-5 flex">
              <img src={product.imageFrame} alt="Frame" />
                <div className="flex-col justify-start items-start gap-2.5 flex">
                    <div className="text-[#0a0b20] text-lg font-bold font-['Satoshi'] leading-normal">{product.title}</div>
                    <span className="text-[#010101]/70 text-xs font-normal font-['Satoshi'] leading-[18px]">{product.description}</span>
                </div>
            </div>
        </div>
        <div className="relative z-[99999]">
                  <button
        className={`custom-prev2  ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isBeginning}
      >
      <img src={arrow1} alt="Arrow" />
      </button>
      <button
        className={`custom-next2  ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isEnd}
      >
        <img src={arrow2} alt="Arrow" />
      </button>
                  </div>
    </div>
</div>
                    </SwiperSlide>
                   );
                  })}
                 {/* <div className="lg:hidden block">
                  <button
        className={`custom-prev absolute top-[50%] tranlate-y-[-50%] left-0 z-[99999] text-8xl ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isBeginning}
      >
      <img src={arrow1} alt="Arrow" />
      </button>
      <button
        className={`custom-next absolute top-[50%] tranlate-y-[-50%] right-0 z-[99999] text-8xl ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isEnd}
      >
        <img src={arrow2} alt="Arrow" />
      </button>
                  </div> */}
                </Swiper>
        
        </div>
      </section>
    );
  };
  
  export default Confidence;
  
  