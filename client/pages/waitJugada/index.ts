import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitJugada(params) {
    const div = document.createElement("div");
    const player = localStorage.getItem("player");
    const currentState = state.getState();

    var name = "";
    if (player === "1") {
        name = currentState.rtdbData.jugador2.name;
    }
    if (player === "2") {
        name = currentState.rtdbData.jugador1.name;
    }

    div.className = "contenedor";
    div.innerHTML = `
        <div>Esperando a que tu ${name} Juegue!... </div>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    const viewPlay = () => {
        if (
            currentState.rtdbData.jugador1?.choise &&
            currentState.rtdbData.jugador2?.choise &&
            location.pathname.includes("waitJugada")
        ) {
            const choise = {
                jugador1: currentState.rtdbData.jugador1.choise,
                jugador2: currentState.rtdbData.jugador2.choise,
            };
            currentState.rtdbData.jugador1.choise = null;
            currentState.rtdbData.jugador2.choise = null;
            // currentState.playerOneWaiting = true;
            state.setState(currentState);

            return params.goTo("/result/jugada", { choise });
        }
    };

    state.subscribe(viewPlay);

    return div;
}
