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
    console.log(state.getState());

    const button = div.querySelector("button-playagain");

    state.cleanPlay({ name: name, status: true, player: player , online:true});
    button.addEventListener("click", (event) => {
        event.preventDefault();
        return params.goTo("/waitRoom");
    });

    return div;
}
