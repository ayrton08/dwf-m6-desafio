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
