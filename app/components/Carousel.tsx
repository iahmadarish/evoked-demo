
import { Mousewheel, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import video from '/assets/video.png'; 
import videoDark from '/assets/dark-video.png'; 
const Links = [
  { link: video, link2: videoDark, id: 1 },
  { link: video, link2: videoDark, id: 2 },
  { link: video, link2: videoDark, id: 3 },
  { link: video, link2: videoDark, id: 4 },
  { link: video, link2: videoDark, id: 5 },
];
const Carousel = () => {
    return (
        <div className={`lg:py-[100px] z-[-1] relative py-[50px] `}>
            <div className="lg:max-w-container w-[90%] mx-auto relative">
                <h2 className={`2xl:text-5xl lg:text-[38px]  md:text-[32px] md:w-auto w-[305px] text-[22px] not-italic font-bold leading-[130%] lg:leading-[normal] text-[color:var(--Brand,#28282A)]`}> <span className='bg-gradient-text bg-clip-text text-transparent'>They tried it, </span><br className="md:hidden" /> now they are obsessed</h2>
                {/* <div className="lg:inline-block absolute top-0 right-0 z-10  hidden">
                <Love color={'#28282A'}/>
                </div> */}
            </div>

      <div className={``}>
      <div className='lg:max-w-container w-[90%] mx-auto'>
          <div className="lg:py-[60px] py-[30px] ">
          <Swiper
  slidesPerView='auto'
  spaceBetween={20}
  modules={[Navigation, Mousewheel, Autoplay]}
  navigation={{
    nextEl: '.custom-next-1', // Unique class
    prevEl: '.custom-prev-1', // Unique class
  }}
  autoplay={{
    delay: 1000,
    disableOnInteraction: false, 
  }}
  loop={true} 
  grabCursor={true} 
  allowTouchMove={true} 
  mousewheel={true} 
  breakpoints={{
    640: { slidesPerView: 3, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
    1920: { slidesPerView: 4, spaceBetween: 20 },
  }}
  className="mySwiper"
>
  {Links.map((item) => (
    <SwiperSlide key={item.id}>
      <div>
        <img className="lg:h-auto h-[208px]" src={item.link} alt="Viewer" />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

        </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel