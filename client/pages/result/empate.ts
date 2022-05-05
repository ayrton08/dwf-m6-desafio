const image = require("url:../../images/ganaste.svg");
const giphy = require("url:../../images/giphy.gif");
import { state } from "../../state";

export function empate(params) {
    const div = document.createElement("div");
    div.className = "container-empate";

    div.innerHTML = `
        <img class="giphy" src="${giphy}" alt="">
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
