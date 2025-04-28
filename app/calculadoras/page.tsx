import Button from "../../components/buttonList";

export default function PaceParaKmh() {
    return(
        <section>
        <div className="flex justify-center">
            <h1 className="text-[32px] font-semibold text-white">Calculadoras</h1>
        </div>
        <div className="flex flex-wrap mt-10 mb-20 gap-4 justify-center">
            <Button NameBtn="Pace Estimado" Page="calculadoras/pace-estimado"/>
            <Button NameBtn="Tempo Estimado" Page="calculadoras/tempo-estimado"/>
        </div>
        </section>
    )
}