import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitPlayer(params) {
    const nameOponent = state.data.rtdbData.jugador2.name;

    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <div>Esperando a que ${nameOponent} presione ¡Jugar!... </div>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;
    state.listenRoom();

    const goToPlay = () => {
        const data = state.getState();
        if (
            data.rtdbData?.jugador1?.online === "true" &&
            data.rtdbData?.jugador2?.online === "true"
        ) {
            data.rtdbData.jugador1.online = false;
            data.rtdbData.jugador2.online = false;
            state.setState(data)
            return params.goTo("/play");
        }
    };

    state.subscribe(goToPlay);

    return div;
}
