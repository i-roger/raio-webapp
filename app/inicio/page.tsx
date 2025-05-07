import '../globals.css';

import Button from "../../components/btn"
import Card from "../../components/card"

export default function Home() {
  return (
    <div className="flex flex-col justify-center mb-20">
{/* Anuncios */}
      <div className="bg-gray-700 p-4 m-2 h-36 rounded-xl">
        <h1 className='text-[20px] font-semibold text-white'>Google Adsense</h1>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8817598114486469" crossOrigin="anonymous"></script>
      </div>
{/* Anuncios */}

      <div className='flex flex-col gap-4 m-2 p-4 bg-zinc-800 rounded-xl'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[20px] font-semibold text-white'>Raiolaranja : Seu companheiro nas corridas!</h1>
          <p className='text-zinc-400 text-start'>Desenvolvi esse app para ajudar a todos os corredores que desejam planejar melhor seus treinos, seja na esteira ou na rua.</p>
          <p className='text-zinc-400 text-start'>Clique no botão abaixo e fale diretamente comigo no Instagram!</p>
        </div>
        <Button cor='bg-orange-500' name='Instagram' page='https://www.instagram.com/raiolaranja/' />
      </div>

      <p className='flex justify-center text-white font-bold'>O O O</p>

      <Card cor='bg-red-500' titulo='Está gostando do App?' texto='Considere apoiar o desenvolvimento com uma doação. Cada contribuição ajuda a manter o projeto vivo! Você pode enviar através do Qr Code ou Pix Copia e Cola.' namebtn='Ajudar!' href='donation'/>
      <Card cor='bg-red-500' titulo='Essa é para você que corre na esteira!' texto='Digite seu pace e veja qual é a velocidade correspondente em KM/H. Assim você consegue colocar a velocidade correta na sua esteira.' namebtn='Eu corro na esteira!' href='conversoes/pace-para-kmh'/>
      <Card cor='bg-red-500' titulo='Perguntas frequentes' texto='Se você tem dúvidas sobre como utilizar as ferramentas clique no botão abaixo e será redirecionado para o FAQ.' namebtn='FAQ' href='/sobre'/>
    </div>
  );
}
