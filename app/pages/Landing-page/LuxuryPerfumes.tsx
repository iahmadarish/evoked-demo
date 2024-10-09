

import React, { useEffect, useState } from 'react';
import app from '/assets/app screen.png';
import frame from '/assets/Frame (5).svg';
import videoDark from '/assets/dark-video.png'; 
import perfume from '/assets/image (6).png';
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
    imageUrl: any;
  };
  
 
  const confidenceDataForMobile: ConfidenceItem[] = [
    {
      title: "Chat about problems",
      description: `Our 250+ perfumes range is premium quality (Eau de Parfum) minus the costs`,
      imageUrl: perfume,
    },
    {
      title: "Read self-growth guides",
      description: `They’re tailored to fit work, health, romance & relationship settings`,
      imageUrl: perfume,
    },
    {
      title: "Perform tasks for improving confidence",
      description: `Our perfumes are designer quality minus the high costs`,
      imageUrl: perfume,
    },
    {
      title: "Shop and win products",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageUrl: perfume,
    },
    {
      title: "Shop and win products",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageUrl: perfume,
    },
    {
      title: "Shop and win products",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageUrl: perfume,
    },
  ];
  
  const LuxuryPerfumes: React.FC = () => {
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const phrases: string[] = ['to smell yum', 'get compliments', 'feel amazing'];
    const [currentPhrase, setCurrentPhrase] = useState<string>(phrases[0]);
    const [fade, setFade] = useState<boolean>(true);
    useEffect(() => {
        const interval = setInterval(() => {
          setFade(false); 
    
          setTimeout(() => {
            const nextIndex = (phrases.indexOf(currentPhrase) + 1) % phrases.length;
            setCurrentPhrase(phrases[nextIndex]);
            setFade(true); 
          }, 500); 
    
        }, 2000); 
    
        return () => clearInterval(interval);
      }, [currentPhrase, phrases]);
    return (
      <section className="py-12 md:py-24 lg:py-[150px] overflow-x-hidden">
        <div className="lg:max-w-container 4k:max-w-container2 w-[90%] mx-auto relative">
        <div className="flex lg:flex-row lg:gap-0 gap-5 flex-col lg:justify-between lg:items-center lg:mb-[70px] mb-[40px]">
        <div> <span className="2xl:text-5xl lg:text-[38px]  md:text-[32px] text-[22px] not-italic font-bold leading-[130%] lg:leading-[normal] text-[#010101]">
            Start by applying affordable designer perfumes <br /> 
            <h3 className={`transition-opacity duration-500 inline-block ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {currentPhrase.split(' ').map((word, index) => {
                if (['yum', 'compliments', 'amazing'].includes(word)) {
                  return (
                    <span key={index} className="bg-gradient-text bg-clip-text text-transparent">
                      {word}
                    </span>
                  );
                } else {
                  return <span key={index} className="text-[#010101]">{word} </span>;
                }
              })}
            </h3>
          </span></div>
                <div className="relative z-[1]">
                  <button
        className={`custom-prev1  ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isBeginning}
      >
      <img src={arrow1} alt="Arrow" />
      </button>
      <button
        className={`custom-next1  ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isEnd}
      >
        <img src={arrow2} alt="Arrow" />
      </button>
                  </div>
            </div>
        
        <Swiper
                  modules={[Navigation, Mousewheel, Autoplay]}
                  navigation={{
                    nextEl: '.custom-next1',
                    prevEl: '.custom-prev1',
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
        <div className="flex-col justify-center items-center gap-[15px] inline-flex relative">
            <img className="" src={product.imageUrl} alt='Image' />
            <span className="text-white absolute bottom-[50px] left-[17px] lg:pr-0 pr-[20px] lg:left-[50px] 4k:text-[28px] 2xl:text-[24px] lg:text-[18px] lg:leading-[130%] text-base font-medium font-['Satoshi'] leading-tight">{product.description}</span>
        </div>
        
    </div>
</div>
                    </SwiperSlide>
                   );
                  })}
                </Swiper>
        
        </div>
      </section>
    );
  };
  
  export default LuxuryPerfumes;
  
  