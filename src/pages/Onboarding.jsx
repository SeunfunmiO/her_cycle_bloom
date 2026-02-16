import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef(null)
  const { t } = useTranslation("onboarding");

  const slides = [
    {
      img: "./Frame 2131328858.png",
      titleKey: "slides.slide1.title",
      descKey: "slides.slide1.desc"
    },
    {
      img: "./Layer_1.png",
      titleKey: "slides.slide2.title",
      descKey: "slides.slide2.desc"
    },
    {
      img: "./herbloomImage.png",
      titleKey: "slides.slide3.title",
      descKey: "slides.slide3.desc"
    }
  ];

  // const slides = [
  //   {
  //     img: "./Frame 2131328858.png",
  //     title: "Welcome - Your Cycle, Your Way",
  //     desc: "Track your period, predict ovulation, and understand your body better with personalized insights made just for you."
  //   },
  //   {
  //     img: "./Layer_1.png",
  //     title: "Discover How We Help You Everyday",
  //     desc: "Predict your period and ovulation, log symptoms to spot patterns, and get personalized insights tailored just for you."
  //   },
  //   {
  //     img: "./herbloomImage.png",
  //     title: "You're All Set to Take Control",
  //     desc: "Start tracking, get smarter insights, and feel confident about every phase of your cycle."
  //   }
  // ];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/registration');
    } else {
      swiperRef.current.slideNext();
    }
  }

  return (
    <div className="w-full h-full text-center max-w-md mx-auto px-4">
      <Swiper
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {index === 0 && (
              <button
                onClick={() => navigate('/registration')}
                className="font-semibold border border-palevioletred px-8 py-1 rounded-full float-end mt-5"
              >
                {t('skip')}
              </button>
            )}
            <div className={`flex flex-col gap-5 items-center justify-center w-full h-full
               ${currentSlide === slides.length - 1 ? 'mb-5 mt-12 lg:mb-12 lg:mt-0' : 'mb-12'}`}>
              <img src={slide.img} />
              <h1 className="font-bold text-2xl">{t(slide.titleKey)}</h1>
              <p className="font-bold text-sm">{t(slide.descKey)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={handleNext}
        className="my-10 w-11/12 py-2 font-bold text-lg lg:text-xl rounded-full shadow-gray-400 shadow-sm bg-palevioletred"
      >
        <div className="flex justify-center items-center gap-2">
          {currentSlide === slides.length - 1 ? t("get_started") : t("next")}
          {currentSlide === slides.length - 1 && <ArrowRight />}
        </div>
      </button>
    </div>
  );
};

export default Onboarding;