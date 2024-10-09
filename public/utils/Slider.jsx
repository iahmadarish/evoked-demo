import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import '../../styles/app.css'; // Adjust path as per your project structure
import video from '../assets/video.png'; // Adjust path as per your project structure
import videoDark from '../assets/dark-video.png'; 
import { Autoplay } from 'swiper/modules';
const Slider = () => {

  const Links = [
    { link: video, link2: videoDark, id: 1 },
    { link: video, link2: videoDark, id: 2 },
    { link: video, link2: videoDark, id: 3 },
    { link: video, link2: videoDark, id: 4 },
    { link: video, link2: videoDark, id: 5 },
  ];

  return (
    <Swiper
    slidesPerView={2}
    spaceBetween={20}
    modules={[Autoplay]}
    autoplay={{
      delay: 1000,
      disableOnInteraction: true,
    }}
        loop={true}
        allowTouchMove={true}
        mousewheel={true}
    className="mySwiper"
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 20 },
        1920: { slidesPerView: 4, spaceBetween: 20 },
      }}
    >
      {Links.map((item) => (
        <SwiperSlide key={item.id}>
          <div>
            <img className="lg:h-auto h-[208px]" src={item.link} alt="Viewer" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
