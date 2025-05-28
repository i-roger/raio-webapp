import Card from "../../components/card";
import CardFaq from "../../components/card-faq";
import Accordion from "../../components/accordion";

export default function Sobre() {
    return(
        <div className="flex flex-col justify-center mb-20">

            <div className="flex flex-col m-2">
                <h1 className="text-xl text-white text-center font-semibold mb-5">Perguntas e respostas mais frequentes</h1>
                <Accordion title='Como faço para descobrir o pace em metros ?' content='Na aba de Calculadoras basta clicar em Pace Estimado e digitar a distância em metros. Exemplo: 10,000 = 10KM | 0,400 = 400M' />
                <Accordion title='Quero correr a 60% da minha velocidade, onde posso saber o pace certo?' content='Na aba de Calculadoras basta clicar em Intensidade de Corrida, digitar o seu pace de prova e a procentagem que deseja. Será mostrado na tela o pace para a porcentagem desejada.'/>
            </div>

            <Card 
            cor='bg-red-500'
            titulo='Sua dúvida não foi solucionada?' 
            texto='Entre em contato através do instagram, que estarei ajudando o mais rápido possível!'
            namebtn="📨 Clique aqui! 📨"
            href='https://www.instagram.com/raiolaranja/'/>
        </div>
    )
}