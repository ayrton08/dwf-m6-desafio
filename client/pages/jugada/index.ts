import { state } from "../../state";

export function jugada(params) {
    const div = document.createElement("div");

    div.className = "container-jugada";

    const jugada = {
        papel: `<papel-comp width="140px" height="250px"></papel-comp>`,
        piedra: `<piedra-comp width="140px" height="250px"></piedra-comp>`,
        tijera: `<tijera-comp width="140px" height="250px"></tijera-comp>`,
    };

    div.innerHTML = `
    ${jugada[history.state.jugador2]}
    ${jugada[history.state.jugador1]}
    `;

    div.firstElementChild.className = "maquina";

    setTimeout(() => {
        return params.goTo(`/result/${history.state.resultado}`, history.state);
    }, 2000);

    return div;
}
