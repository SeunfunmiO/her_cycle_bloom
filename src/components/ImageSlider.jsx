import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ImageSlider = () => {
  return (
    <div className="w-full h-[300px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000, // 3 seconds per slide
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        grabCursor={true} // enables swipe effect
        className="mySwiper h-full w-full"
      >
        {/* Each SwiperSlide represents one image */}
        <SwiperSlide>
          <img
            src="/images/slide1.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="/images/slide2.jpg"
            alt="Slide 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="/images/slide3.jpg"
            alt="Slide 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
