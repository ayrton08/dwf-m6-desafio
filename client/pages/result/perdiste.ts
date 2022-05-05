const image = require("url:../../images/perdiste.svg");
import { state } from "../../state";

export function perdiste(params) {
    const div = document.createElement("div");
    div.className = "container-perdiste";

    div.innerHTML = `
        <img src="${image}" >
        <history-comp></history-comp>
        <button-playagain></button-playagain>

        `;
    const name = state.data.fullName;
    const player = Number(localStorage.getItem("player"));
    state.setPlay({ choise: null, name: name, player: player });
    state.setStatus(player, false);

    console.log(state.data.roomId);


    const button = div.querySelector("button-playagain");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        params.goTo("/waitRoom");
    });

    return div;
}
