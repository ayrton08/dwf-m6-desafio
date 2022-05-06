import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitRoom(params) {
    const div = document.createElement("button");
    div.textContent = "jugar";
    // div.className = "contenedor";
    // div.innerHTML = `
    //     <div id="button-jugar">
    //     <button-play></button-play>
    //     </div>
    //     <div class="container">
    //     <piedra-comp></piedra-comp>
    //     <papel-comp></papel-comp>
    //     <tijera-comp></tijera-comp>
    //     </div>
    // `;

    // const button = document.querySelector("#button-jugar");
    const player = localStorage.getItem("player");
    
    


    div.addEventListener("click", () => {
        state.setStatus(player,true);
        
        params.goTo("/waitPlayer");
    });

    return div;
}
