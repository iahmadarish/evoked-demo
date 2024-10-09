

import React, { useState } from 'react';
import app from '/assets/app screen.png';
import frame from '/assets/Frame (5).svg';
import videoDark from '/assets/dark-video.png'; 
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
    imageUrl: any;
  };
  
 
  const confidenceDataForMobile: ConfidenceItem[] = [
    {
      title: "Chat about problems",
      description: "Meet Joy, your new AI bestie that gets you! Find perfumes that fit your vibe. Get helpful advice to solve problems at work, health & relationships. Joy’s there when you need him.",
      imageUrl: videoDark,
    },
    {
      title: "Read self-growth guides",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageUrl: videoDark,
    },
    {
      title: "Perform tasks for improving confidence",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageUrl: videoDark,
    },
    {
      title: "Shop and win products",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageUrl: videoDark,
    },
    {
      title: "Shop and win products",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageUrl: videoDark,
    },
    {
      title: "Shop and win products",
      description: "Borem ipsum dolor sit amet consectetur.",
      imageUrl: videoDark,
    },
  ];
  
  


  const Obsessed: React.FC = () => {
    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);
  
    return (
      <section className="py-12 md:py-24 lg:py-[150px] overflow-x-hidden">
        <div className="lg:max-w-container 4k:max-w-container2 w-[90%] mx-auto relative">
        <div className="flex lg:flex-row lg:gap-0 gap-5 flex-col lg:justify-between lg:items-center lg:mb-[70px] mb-[40px]">
                <h2 className={`2xl:text-5xl lg:text-[38px]  md:text-[32px] md:w-auto w-[305px] text-[22px] not-italic font-bold leading-[130%] lg:leading-[normal] text-[color:var(--Brand,#28282A)]`}> <span className='bg-gradient-text bg-clip-text text-transparent'>They tried it, </span> now they are obsessed</h2>
                <div className="relative z-[1]">
                  <button
        className={`custom-prev3  ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isBeginning}
      >
      <img src={arrow1} alt="Arrow" />
      </button>
      <button
        className={`custom-next3  ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isEnd}
      >
        <img src={arrow2} alt="Arrow" />
      </button>
                  </div>
            </div>
        
        <Swiper
                  modules={[Navigation, Mousewheel, Autoplay]}
                  navigation={{
                    nextEl: '.custom-next3',
                    prevEl: '.custom-prev3',
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
  
  export default Obsessed;
  
  