import { state } from "../../state";

export function jugada(params) {
    const div = document.createElement("div");

    div.className = "container-jugada";

    const jugada = {
        papel: `<papel-comp width="140px" height="250px"></papel-comp>`,
        piedra: `<piedra-comp width="140px" height="250px"></piedra-comp>`,
        tijera: `<tijera-comp width="140px" height="250px"></tijera-comp>`,
    };

    state.getState();

    div.textContent = "WAITING";

    if (state.data.rtdbData.jugador1.choise) {
        div.innerHTML = `
        ${jugada[history.state.jugador1]}
        `;
    }
    if (state.data.rtdbData.jugador2.choise) {
        div.innerHTML = `
        ${jugada[history.state.jugador2]}`;
    }

    const jugador1 = state.data.rtdbData.jugador1.choise;
    const jugador2 = state.data.rtdbData.jugador2.choise;

    const resultado = state.whoWins(jugador1, jugador2);
    div.firstElementChild.className = "maquina";

    setTimeout(() => {
        if (resultado === "gane") {
            state.win();
            return params.goTo("/result/ganaste");
        }
        if (resultado === "empate") {
            return params.goTo("/result/empate");
        } else {
            state.lost();
            return params.goTo("/result/perdiste");
        }

        // return params.goTo(`/result/${history.state.resultado}`, history.state);
    }, 2000);

    return div;
}
