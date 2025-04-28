import Card from "../../components/card";
import CardFaq from "../../components/card-faq";

export default function PaceParaKmh() {
    return(
        <div className="flex flex-col justify-center">
            <Card 
            titulo='Sua dúvida não foi solucionada?' 
            texto='Entre em contato através do instagram, que estarei ajudando o mais rápido possível!'
            namebtn="Instagram"
            href='https://www.instagram.com/raiolaranja/'/>
            <CardFaq titulo='Como copiar os resultados?' 
            texto='Apenas clique em cima do resultado e aparecerá um aviso na tela que o mesmo foi copiado.' />

            <CardFaq titulo='Como faço para descobrir o pace em metros ?' 
            texto='Na aba de Calculadoras basta clicar em Pace Estimado e digitar a distância em metros. Exemplo: 10,000 = 10KM | 0,400 = 400M' />

        </div>
    )
}