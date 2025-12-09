import Button from "../../components/btn-list";
import Advertisement from "../../components/Swiper/ads/Advertisement";
export default function Ferramentas() {
    return(
        <section className="flex flex-col items-center mb-20">
            <div className='w-full md:w-[900px]'>
                <Advertisement/>
                <div className="flex flex-wrap m-2 mb-20 gap-x-10 gap-y-7 justify-center">
                    <Button NameBtn="Calculadoras" Page="/ferramentas/calculadoras"/>
                    <Button NameBtn="Conversões" Page="/ferramentas/conversoes"/>
                </div>
            </div>
        </section>
    )
}