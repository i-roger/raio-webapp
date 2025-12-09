'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css'

import Card from './card-carousel';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

export default function SwiperComponent() {
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
        className="mySwiper"
      >
        <SwiperSlide>
          <Card corcard='bg-zinc-800' corbtn='bg-green-500' titulo='Está gostando do App?' texto='Considere apoiar o desenvolvimento com uma doação. Cada contribuição ajuda a manter o projeto vivo! Você pode enviar através do Qr Code ou Pix Copia e Cola.' namebtn='Apoiar!' href='donation'/>
        </SwiperSlide>

        <SwiperSlide>
          <Card corcard='bg-zinc-800' corbtn='bg-red-500' titulo='Perguntas frequentes' texto='Se você tem dúvidas sobre como utilizar as ferramentas clique no botão abaixo e será redirecionado para o FAQ.' namebtn='FAQ' href='sobre'/>
        </SwiperSlide>
      </Swiper>
      
    </div>
  );
}
