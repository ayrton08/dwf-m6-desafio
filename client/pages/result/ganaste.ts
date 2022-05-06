const image = require("url:../../images/ganaste.svg");
import { state } from "../../state";

export function ganaste(params) {
    const div = document.createElement("div");
    div.className = "container-ganaste";

    div.innerHTML = `
        <img src="${image}">
        <history-comp></history-comp>
        <button-playagain></button-playagain>
    
        `;
    const name = state.data.fullName;
    const player = Number(localStorage.getItem("player"));

    console.log(state.getState());
    

    state.cleanPlay({ name: name, status: true, player: player, online:true });
    const button = div.querySelector("button-playagain");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        return params.goTo("/waitRoom");
    });

    return div;
}
