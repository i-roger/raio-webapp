import Button from "../../../components/btn-list";
import Advertisement from "../../../components/Swiper/ads/Advertisement";

export default function Calculadoras() {
    return(
        <section className="flex flex-col mb-20 items-center">
            <div className='w-full md:w-[900px]'>
                <Advertisement/>
                <div className="flex flex-wrap m-2 mb-20 gap-x-10 gap-y-7 justify-center">
                    <Button NameBtn="Pace Estimado" Page="calculadoras/pace-estimado"/>
                    <Button NameBtn="Tempo Estimado" Page="calculadoras/tempo-estimado"/>
                    <Button NameBtn="Distância Estimada" Page="calculadoras/distancia-estimada"/>
                    <Button NameBtn="Intensidade de Corrida" Page="calculadoras/intensidade-de-corrida"/>
                </div>
            </div>
        </section>
    )
}