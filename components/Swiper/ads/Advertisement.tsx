'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styleAds.css'


import Card from './card-ads';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';

export default function App() {
  return (
    <div className='m-2'>
      <Swiper
        speed={800}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay:2500,
          disableOnInteraction:false
        }}
        pagination={{
          dynamicBullets:true,
          
        }}
        modules={[Autoplay, Pagination]}
        className="ads"
      >
        <SwiperSlide>
          <Link className=' flex flex-col gap-4 p-4 w-full h-[200px] bg-[url(/parceiros/rogertech.png)] bg-center rounded-xl justify-center active:opacity-50' href='https://rogertech.vercel.app'></Link>
        </SwiperSlide>

        <SwiperSlide>
          <Card corcard='bg-zinc-800' corbtn='bg-orange-500' titulo='📣 Seu produto, sua mensagem, no lugar certo!' texto='Entre em contato e garanta seu espaço!' namebtn='Clique Aqui!' href='https://www.instagram.com/raiolaranja/'/>
        </SwiperSlide>
      </Swiper>
      
    </div>
  );
}
