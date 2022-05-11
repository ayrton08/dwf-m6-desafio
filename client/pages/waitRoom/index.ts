import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitRoom(params) {
    const div = document.createElement("button");
    div.textContent = "jugar";

    
    const player = localStorage.getItem("player");

    div.addEventListener("click", () => {
        state.setStatus(player, true);
        return params.goTo("/waitPlayer");
    });

    return div;
}
