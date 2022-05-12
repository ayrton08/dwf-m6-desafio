import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function codeRoom(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <div class="code"></div>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;
    const codigo = JSON.parse(localStorage.getItem("state"));
    const player = localStorage.getItem("player");

    const codeRoom = div.querySelector(".code");
    codigo.roomId
        ? (codeRoom.innerHTML = `Share the code: <span class="number">${codigo.roomId}</span> with your opponent`)
        : null;

    const goToRoom = () => {
        const data = state.getState();
        if (
            data.rtdbData?.jugador2?.status == true &&
            location.pathname.includes("codeRoom")
        ) {
            return params.goTo("/waitRoom");
        }
    };
    state.history(0);

    state.accessToRoom().then(() => {
        state.subscribe(goToRoom);
        return state.listenRoom();
    });

    return div;
}
