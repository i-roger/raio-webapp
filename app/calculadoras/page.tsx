import Button from "../../components/btn-list";
import Advertisement from "../../components/Swiper/ads/Advertisement";

export default function Calculadoras() {
    return(
        <section className="flex flex-col mb-20">
            {/* Anuncios */}
            {/* <div className="bg-gray-700 p-4 m-2 h-36 rounded-xl">
                <h1 className='text-[20px] font-semibold text-white'>Google Adsense</h1>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8817598114486469" crossOrigin="anonymous"></script>
            </div> */}
            {/* Anuncios */}
            <Advertisement/>
            <div className="flex flex-wrap m-2 mb-20 gap-x-10 gap-y-7 justify-center">
                <Button NameBtn="Pace Estimado" Page="calculadoras/pace-estimado"/>
                <Button NameBtn="Tempo Estimado" Page="calculadoras/tempo-estimado"/>
                <Button NameBtn="Distância Estimada" Page="calculadoras/distancia-estimada"/>
                <Button NameBtn="Intensidade de Corrida" Page="calculadoras/intensidade-de-corrida"/>
            </div>
        </section>
    )
}