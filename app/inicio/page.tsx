import '../globals.css';

import Button from "../../components/btn"
import Card from "../../components/card"

import Swiper from "../../components/Swiper/SwiperComponent";

import donationIcon from "../../assets/donation-icon-white.svg";
import Image from 'next/image';

export default function Inicio() {
  return (
    <div className="flex flex-col justify-center mb-20">
      <h1 className='m-4 text-[28px] font-bold text-white text-center'>RaioLaranja</h1>
      <Swiper/>
      <Card cor='bg-orange-500' titulo='Essa é para você que corre na esteira!' texto='Digite seu pace e veja qual é a velocidade correspondente em KM/H. Assim você consegue colocar a velocidade correta na sua esteira.' namebtn='Eu corro na esteira!' href='conversoes/pace-para-kmh'/>
      <div className="flex bg-zinc-800/70 mt-2 mb-10">
        <Image width={64} src={donationIcon} alt='Apoiar!'/>
        <Card cor='bg-green-500' titulo='Gostando do nosso aplicativo?' texto='Considere apoiar o desenvolvimento com uma doação. Cada contribuição ajuda a manter o projeto vivo! Você pode enviar através do Qr Code ou Pix Copia e Cola.'  namebtn='Apoiar!' href='/donation'></Card>
      </div>
    </div>
  );
}
