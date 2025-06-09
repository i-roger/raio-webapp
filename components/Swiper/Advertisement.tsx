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
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <div className='m-2'>
      <Swiper
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
          <Card corcard='bg-zinc-600' corbtn='bg-orange-500' titulo='Anuncie sua marca aqui!' texto='Esse espaço está disponível para você que quer atrair mais clientes, fortalecer sua marca e aumentar suas vendas. Seja visto por milhares de pessoas todos os dias!'
          namebtn='Entre em contato!' href='https://www.instagram.com/raiolaranja/'/>
        </SwiperSlide>

        <SwiperSlide>
          <Card corcard='bg-zinc-600' corbtn='bg-orange-500' titulo='📣 Seu produto, sua mensagem, no lugar certo!' texto='Entre em contato e garanta seu espaço!' namebtn='Clique Aqui!' href='https://www.instagram.com/raiolaranja/'/>
        </SwiperSlide>
      </Swiper>
      
    </div>
  );
}
