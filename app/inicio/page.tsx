import '../globals.css';
import Button from "../../components/btn"
import Card from "../../components/card"

export default function Home() {
  return (
    <div className="flex flex-col justify-center mb-20">
{/* Popup de informações */}
      <div className='flex flex-col gap-4 m-2 p-4 bg-zinc-800 rounded-xl'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[20px] font-semibold text-white'>Raiolaranja : Seu companheiro nas corridas! ⚡</h1>
          <p className='text-zinc-500 text-start'>Desenvolvi esse app para ajudar a todos os corredores que desejam planejar melhor seus treinos, seja na esteira ou na rua.</p>
          <p className='text-zinc-500 text-start'>Clique no botão abaixo e fale diretamente comigo no Instagram!</p>
        </div>
        <Button NameBtn='❤️ Instagram ❤️' Page='https://www.instagram.com/raiolaranja/' />
      </div>

      <Card cor='bg-red-500' titulo='→ Essa é para você que corre na esteira!' texto='Digite seu pace e veja qual é a velocidade correspondente em KM/H. Assim você consegue colocar a velocidade correta na sua esteira.' namebtn='Eu corro na esteira!' href='conversoes/pace-para-kmh'/>
      <Card cor='bg-red-500' titulo='Perguntas frequentes' texto='Se você tem dúvidas sobre como utilizar as ferramentas clique no botão abaixo e será redirecionado para o FAQ.' namebtn='FAQ' href='/sobre'/>
    </div>
  );
}
