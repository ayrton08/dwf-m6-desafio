import { state } from "../../state";
import { counterComp } from "../../components/counter";

export function yourName(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <title-text></title-text>
        <input class="name" type="text" placeholder="Your Name"></input>
        <button-play>
        <div slot="text">Start</div>
        </button-play>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    const button = div.querySelector("button-play");

    const player = localStorage.getItem("player");
    state.setStatus(player, false);

    const setHistory = () => {
        if (state.data.rtdbRoomId && !state.data.historySave && player === "1") {
            console.log("set>History",state.data.rtdbRoomId);
            
            state.data.historySave = true
            state.history(0);
        }
    };

    button.addEventListener("click", (event) => {
        const nameValue = document.querySelector("input").value;
        state.setFullName(nameValue);
        div.innerHTML = `<counter-room></counter-room>`;

        state.signIn().then(() => {
            if (state.data.roomId) {
                state.getRtdbRoomId().then(() => {
                    state.listenRoom();
                    sessionStorage.setItem("victorias", "0");
                    state.history(0);
                    state.setStatus(player, true);
                    return params.goTo("/waitRoom");
                });
            } else {
                state.askNewRoom().then(() => {
                    state.subscribe(setHistory);
                    state.listenRoom();
                    state.setStatus(player, true);
                    sessionStorage.setItem("victorias", "0");
                    return params.goTo("/codeRoom");
                });
            }
        });
    });

    return div;
}
