import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitRoom(params) {
    const div = document.createElement("div");
    
    const currentState = state.getState().roomId
    div.innerHTML = `
            
        <div>Room: <span class="room-id">${currentState}</span></div>
        </div>
        <instructions-comp></instructions-comp>
        <button-play></button-play>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    
    const player = localStorage.getItem("player");
    div.addEventListener("click", () => {
        state.setStatus(player, true);
        return params.goTo("/waitPlayer");
    });
    return div;
}
