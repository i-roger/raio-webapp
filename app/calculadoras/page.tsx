import Button from "../../components/btn-list";

export default function PaceParaKmh() {
    return(
        <section>
            <div className="flex flex-wrap mt-10 mb-20 gap-4 justify-around ">
                <Button NameBtn="Pace Estimado" Page="calculadoras/pace-estimado"/>
                <Button NameBtn="Tempo Estimado" Page="calculadoras/tempo-estimado"/>
            </div>
        </section>
    )
}