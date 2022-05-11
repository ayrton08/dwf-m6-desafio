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
    const player = Number(localStorage.getItem("player"));
    
    const name = state.data.fullName;
    state.cleanPlay({ name: name, status: false, player: player, online:false });
    
    
    

    const button = div.querySelector("button-playagain");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        return params.goTo("/waitRoom");
    });

    return div;
}
