import { state } from "../../state";
import { counterComp } from "../../components/counter";

export function yourName(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <button-play>
        <div slot="text">Empezar</div>
        </button-play>
        
        <input class="name"> </input>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    const button = div.querySelector("button-play");

    const player = localStorage.getItem("player");
    state.setStatus(player, false);
    
    button.addEventListener("click", (event) => {
        const nameValue = document.querySelector("input").value;
        state.setFullName(nameValue);
        div.innerHTML = `<counter-room></counter-room>`;

        state.signIn().then(() => {
            if (state.data.roomId) {
                state.getRtdbRoomId().then(() => {
                    console.log("player uno",state.data);
                    
                    state.listenRoom();
                    state.setStatus(player, true);
                    return params.goTo("/waitRoom");
                });
            } else {
                state.askNewRoom().then(() => {
                    state.listenRoom();
                    state.setStatus(player, true);
                    return params.goTo("/codeRoom");
                });
            }
        });
    });

    return div;
}
