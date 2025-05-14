'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css'

import Card from '../../components/card';
import Button from '../../components/btn';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <div className='m-2'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={false}
        autoplay={{
          delay:2500,
          disableOnInteraction:false
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        
        <SwiperSlide>
          <div className='flex flex-col gap-4 p-4 bg-zinc-800 rounded-xl'>
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-[20px] font-semibold text-white'>Raiolaranja : Seu companheiro nas corridas!</h1>
                    <p className='text-zinc-400 text-start'>Desenvolvi esse app para ajudar a todos os corredores que desejam planejar melhor seus treinos, seja na esteira ou na rua.</p>
                    <p className='text-zinc-400 text-start'>Clique no botão abaixo e fale diretamente comigo no Instagram!</p>
                  </div>
                  <Button cor='bg-orange-500' name='Instagram' page='https://www.instagram.com/raiolaranja/' />
                </div>
        </SwiperSlide>

        <SwiperSlide>
          <Card cor='bg-red-500' titulo='Está gostando do App?' texto='Considere apoiar o desenvolvimento com uma doação. Cada contribuição ajuda a manter o projeto vivo! Você pode enviar através do Qr Code ou Pix Copia e Cola.' namebtn='Ajudar!' href='donation'/>
        </SwiperSlide>

        <SwiperSlide>
          <Card cor='bg-red-500' titulo='Perguntas frequentes' texto='Se você tem dúvidas sobre como utilizar as ferramentas clique no botão abaixo e será redirecionado para o FAQ.' namebtn='FAQ' href='/sobre'/>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
