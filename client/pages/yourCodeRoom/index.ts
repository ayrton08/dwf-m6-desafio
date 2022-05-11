import { state } from "../../state";

export function yourCodeRoom(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        estas en el code room
        <button-play>
        <div slot="text">Ingresar a la sala</div>
        </button-play>
        <input class="name"> </input>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    const button = div.querySelector("button-play");

    button.addEventListener("click", (event) => {
        event.preventDefault();
        const codeValue = document.querySelector("input").value;

        const currentState = state.getState();
        currentState.roomId = codeValue;

        state
            .setState(currentState)

            .then(() => {
                state.getRtdbRoomId();
                state.listenRoom();

                return params.goTo("/yourName");
            });
    });

    return div;
}
