import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useNavigate } from 'react-router-dom';



const Onboarding = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="w-full h-[300px] mb-20 relative/ text-center">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          grabCursor={true} // enables swipe effect
          className="mySwiper h-full w-full"
        >

          <SwiperSlide>
            <div className='flex justify-end mt-5'>
              <button className='font-semibold rounded-3xl px-8 py-1 hover:bg-pink-500 hover:text-white  border mx-3 border-pink-400'>
                skip
              </button>
            </div>
            <div className='flex justify-center flex-col items-center mb-14 '>
              <div><img src="./Frame 2131328858.png" alt="her" /></div>
              <h1 className=' font-bold mb-3 text-2xl'>Welcome - Your Cycle, Your Way</h1>
              <p className=" font-bold text-sm md:text-base">Track your period, predict ovulation, and understand your body better with personalized insights made just for you. </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='flex flex-col justify-center items-center mb-12'>
              <div> <img src="./Layer_1.png" alt="her" /></div>
              <h1 className='font-bold mb-3 text-2xl'>Discover How We Can Help You Everyday</h1>
              <p className="font-bold text-sm md:text-base">Predict your period and ovulation, log symptoms to spot patterns, and get personalized insights just for you. </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='flex justify-center flex-col items-center mt-14'>
              <div><img src="./herbloomImage.png" alt="her" /></div>
              <h1 className='text-center font-bold mb-3 text-2xl'>You're All Set to Take Control</h1>
              <p className="text-center font-bold text-sm md:text-base">Start tracking, get smarter insights, and feel confident about every phase of your cycle  </p>
            </div>
          </SwiperSlide>
        </Swiper>
        <button onClick={()=>navigate('/registration')}
          style={{ backgroundColor: '#eb477e' }}
          className='mt-20 px-32 py-2 shadow-lg font-bold text-2xl rounded-3xl'>Next
        </button>
      </div>
    </>
  )
}

export default Onboarding