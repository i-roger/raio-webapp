import Card from "../../components/card-btn";
import CardFaq from "../../components/card-faq";
import Button from "../../components/buttonList";

export default function PaceParaKmh() {
    return(
        <div className="flex flex-col justify-center">
            <Card 
            titulo='Sua dúvida não foi solucionada?' 
            texto='Entre em contato através do instagram, que estarei ajudando o mais rápido possível!' 
            href='https://www.instagram.com/raiolaranja/'/>
            <CardFaq titulo='Como faço para descobrir o pace em metros ?' 
            texto='Na aba de Calculadoras basta clicar em Pace Estimado e digitar a distância em metros. Exemplo: 10,000 = 10KM | 0,400 = 400M' />

        </div>
    )
}