import { state } from "../../state";

export function yourCodeRoom(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <title-text></title-text>
        <button-room></button-room>
        <input class="name" placeholder="code room"> </input>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    const button = div.querySelector("button-room");

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
