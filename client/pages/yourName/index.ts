import { state } from "../../state";

export function yourName(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <button-play></button-play>
        <input class="name"> </input>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    const button = div.querySelector("button-play");

    const player = localStorage.getItem("player")

    button.addEventListener("click", (event) => {
        event.preventDefault();
        const nameValue = document.querySelector("input").value;
        state.setFullName(nameValue);

        

        state.signIn().then(() => {
            
            if (state.data.roomId) {
                state.getRtdbRoomId().then(() => {
                    
                    
                    state.setStatus(player)
                    state.listenRoom();
                    
                    return params.goTo("/play");
                });
            } else {
                state.askNewRoom().then(() => {
                    state.listenRoom();
                    return params.goTo("/codeRoom");
                });
            }
        });
    });

    return div;
}
