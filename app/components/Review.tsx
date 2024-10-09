
import transform from '/assets/bottleReview.png';
import Star from "public/utils/Star";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Mousewheel, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import arrow1 from '/assets/majesticons_arrow-up (1).svg';
import arrow2 from '/assets/majesticons_arrow-up.svg';
interface ReviewProps {
}

const Review: React.FC<ReviewProps> = () => {

  const slides = [
    { link: 'data-1', id: '1' },
    { link: 'data-2', id: '2' },
    { link: 'data-3', id: '3' },
    { link: 'data-4', id: '4' },
  ];
  const phrases: string[] = ['to smell yum', 'get compliments', 'feel amazing'];
  const [currentPhrase, setCurrentPhrase] = useState<string>(phrases[0]);
  const [fade, setFade] = useState<boolean>(true);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out

      setTimeout(() => {
        const nextIndex = (phrases.indexOf(currentPhrase) + 1) % phrases.length;
        setCurrentPhrase(phrases[nextIndex]);
        setFade(true); // Start fade in
      }, 500); // Match this duration with fade out duration

    }, 3000); 

    return () => clearInterval(interval);
  }, [currentPhrase, phrases]);
  return (
    <section className={`z-[-1] relative `}>
      <div className={`lg:pt-[100px] pt-[70px] `}>
     
      <div> <span className="text-[#010101] text-[64px] font-bold font-['Satoshi'] leading-[76.80px]">
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
          <div className="lg:relative z-[9999]">
                  <button
        className={`custom-prev1 lg:static absolute top-[55%] left-0 z-[9999999999] ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isBeginning}
      >
      <img src={arrow1} alt="Arrow" />
      </button>
      <button
        className={`custom-next1 lg:static absolute top-[55%] right-0 z-[9999999999]  ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isEnd}
      >
        <img src={arrow2} alt="Arrow" />
      </button>
                  </div>
        <div className="lg:max-w-container w-[90%] mx-auto">
          <Swiper
            slidesPerView={3}
            spaceBetween={60}
        modules={[Navigation, Mousewheel, Autoplay]} 
        navigation={{
          nextEl: '.custom-next1',
          prevEl: '.custom-prev1',
        }}
  allowTouchMove={true}
  mousewheel={true}
      onSwiper={(swiper) => console.log(swiper)}
        className="swiper w-full h-full"
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
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
              1920: {
                slidesPerView: 3,
                spaceBetween: 60,
              },
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className={`border overflow-hidden select-none w-[508px] rounded-[12px] bg-white border-[#171717] border-solid`}>
                <div className={``}>
                  <div className="flex flex-col gap-10">
                    <div className="select-none">
                      <img src={transform} className="object-cover w-full" alt="Image" />
                    </div>
                    <h4>{slide.link}</h4>
                    <div className="flex flex-col justify-center items-start gap-10 self-stretch px-[50px] pb-[50px]">
                      <span className={`text-5xl not-italic flex gap-x-[6px] font-bold leading-[normal] uppercase text-[color:var(--Brand,#28282A)]`}>
                        {/* Assuming Star component accepts color prop */}
                        <Star className={`2xl:w-auto 2xl:h-auto lg:w-[40px]  w-[25px] h-[25px]`} color={'#2A2A28'} />
                        <Star className={`2xl:w-auto 2xl:h-auto lg:w-[40px]  w-[25px] h-[25px]`} color={'#2A2A28'} />
                        <Star className={`2xl:w-auto 2xl:h-auto lg:w-[40px]  w-[25px] h-[25px]`} color={'#2A2A28'} />
                        <Star className={`2xl:w-auto 2xl:h-auto lg:w-[40px]  w-[25px] h-[25px]`} color={'#2A2A28'} />
                        <Star className={`2xl:w-auto 2xl:h-auto lg:w-[40px]  w-[25px] h-[25px]`} color={'#2A2A28'} />
                      </span>
                      <span className={`text-[18px] lg:text-[32px] lg:mt-0 mt-[20px] not-italic font-bold leading-[18px] text-[color:var(--Brand,#28282A)]`}>Patricia O'Keefe</span>
                      <span className={`2xl:w-[408px] w-[182px] lg:w-[100%]  text-[12px] lg:text-[20px] 2xl:text-[24px] not-italic lg:mt-0 mt-[10px] font-normal leading-[150%] text-[#28282A]`}>Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium. Et corrupti saepe quam.</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Review;
