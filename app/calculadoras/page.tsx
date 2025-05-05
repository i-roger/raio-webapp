import Button from "../../components/btn-list";
import Deactivated from "../../components/btn-deactivated";

export default function PaceParaKmh() {
    return(
        <section>
            <div className="flex flex-wrap mt-10 mb-20 gap-x-10 gap-y-7 justify-center">
                <Button NameBtn="Pace Estimado" Page="calculadoras/pace-estimado"/>
                <Button NameBtn="Tempo Estimado" Page="calculadoras/tempo-estimado"/>
                <Button NameBtn="Distância Estimada" Page="calculadoras/distancia-estimada"/>
                <Button NameBtn="Intensidade de Corrida" Page="calculadoras/intensidade-de-corrida"/>

            </div>
        </section>
    )
}