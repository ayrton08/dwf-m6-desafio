import { state } from "../../state";

export function jugada(params) {
    const div = document.createElement("div");

    div.className = "container-jugada";

    const jugada = {
        papel: `<papel-comp width="140px" height="250px"></papel-comp>`,
        piedra: `<piedra-comp width="140px" height="250px"></piedra-comp>`,
        tijera: `<tijera-comp width="140px" height="250px"></tijera-comp>`,
    };

    const currentState = state.getState();

    const jugador1 = history.state.choise.jugador1;
    const jugador2 = history.state.choise.jugador2;

    div.innerHTML = `
        ${jugada[jugador1]}
        ${jugada[jugador2]}
        `;

    const player = localStorage.getItem("player");

    const resultado = state.whoWins(jugador1, jugador2);

    var victory1 = Number(state.data.history?.victory1) + 1;
    var victory2 = Number(state.data.history?.victory2) + 1;

    setTimeout(() => {
        if (resultado === "gane" && player === "1") {
            state.history(victory1, victory2);
            return params.goTo("/result/ganaste");
        }
        if (resultado === "gane" && player === "2") {
            state.history(victory1, victory2);
            return params.goTo("/result/perdiste");
        }

        if (resultado === "empate") {
            state.history(victory1, victory2);
            return params.goTo("/result/empate");
        }
        if (resultado === "perdi" && player === "1") {
            state.history(victory1, victory2);
            return params.goTo("/result/perdiste");
        }
        if (resultado === "perdi" && player === "2") {
            state.history(victory1, victory2);
            return params.goTo("/result/ganaste");
        }
    }, 700);

    // const playerOneStorage = localStorage.getItem("player");

    // if (playerOneStorage === "1") {
    //     const container = document.querySelector(".container-jugada")
    //     container.style.flexDirection = "column-reverse"
    // }
    // // if (playerOneStorage === "2") {
    // //     div.firstElementChild.className = "myself";
    // // }

    return div;
}
