import '../globals.css';
import Button from "../../components/buttonList"

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-center font-semibold text-red-800 text-[24px]">Em desenvolvimento...</h1>
{/* Popup de informações */}
      <div className='flex flex-col gap-4 m-6 p-4 bg-zinc-800 rounded-xl'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[20px] font-semibold text-white'>Raiolaranja : Seu companheiro nas corridas!</h1>
          <p className='text-zinc-500 text-start'>Desenvolvi esse app para ajudar a todos os corredores que desejam planejar melhor seus treinos, seja na esteira ou na rua.</p>
          <p className='text-zinc-500 text-start'>Clique no botão abaixo e fale diretamente comigo no Instagram!</p>
        </div>
        <Button NameBtn='Instagram' Page='https://www.instagram.com/raiolaranja/' />
      </div>
    </div>
  );
}
