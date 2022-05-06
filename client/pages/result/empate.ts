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

    console.log(state.getState());

    const button = div.querySelector("button-playagain");

    state.cleanPlay({ name: name, status: true, player: player, online: true });

    button.addEventListener("click", (event) => {
        event.preventDefault();
        return params.goTo("/waitRoom");
    });

    return div;
}
