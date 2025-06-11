import Button from "../../components/btn-list";
import Advertisement from "../../components/Swiper/ads/Advertisement";
export default function PaceParaKmh() {
    return(
        <section className="flex flex-col mb-20">
            <Advertisement/>
            <div className="flex flex-wrap m-2 mb-20 gap-x-10 gap-y-7 justify-center">
                <Button NameBtn="Pace para Km/h" Page="conversoes/pace-para-kmh"/>
                <Button NameBtn="Km/h para Pace" Page="conversoes/kmh-para-pace"/>
            </div>
        </section>
    )
}