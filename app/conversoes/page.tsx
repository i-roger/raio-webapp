import Button from "../../components/btn-list";

export default function PaceParaKmh() {
    return(
        <section>
            <div className="flex flex-wrap mt-10 mb-20 gap-4 justify-around ">
                <Button NameBtn="Pace para Km/h" Page="conversoes/pace-para-kmh"/>
                <Button NameBtn="Km/h para Pace" Page="conversoes/kmh-para-pace"/>
            </div>
        </section>
    )
}