import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitJugada(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <div>Esperando a que tu oponente Juegue!... </div>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    const currentState = state.getState();
    const viewPlay = () => {
        if (
            currentState.rtdbData.jugador1.choise &&
            currentState.rtdbData.jugador2.choise
        ) {
            const choise = {
                jugador1: currentState.rtdbData.jugador1.choise,
                jugador2: currentState.rtdbData.jugador2.choise,
            };
            currentState.rtdbData.jugador1.choise = null;
            currentState.rtdbData.jugador2.choise = null;
            state.setState(currentState);
            
            return params.goTo("/result/jugada", { choise });
        }
    };

    state.subscribe(viewPlay);

    return div;
}
