import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitRoom(params) {
    const div = document.createElement("div");
    div.className = "container-wait-room";
    state.listenRoom();
    const currentState = state.getState();
    setTimeout(() => {
        if (state.data.firstRound) {
            const player1 = currentState.rtdbData.jugador1.name;
            const player2 = currentState.rtdbData.jugador2.name;

            const history1 = currentState.rtdbData.history.player1;
            const history2 = currentState.rtdbData.history.player2;

            div.innerHTML = `
                <div class="puntuacion">
                <div>
                <div>${player1}: ${history1}</div>
                <div class="player-two">${player2}: ${history2}</div>
                </div>
                
                <div>
                    Room: <span class="room-id">${currentState.roomId}</span></div>
                </div>
                </div>    
                <instructions-comp></instructions-comp>
                <button-play></button-play>
                <div class="container">
                    <piedra-comp></piedra-comp>
                    <papel-comp></papel-comp>
                    <tijera-comp></tijera-comp>
                </div>
            `;
        } else {
            div.innerHTML = `
                <div class="puntuacion">
                </div>    
                <div class="room-id">
                    <span>Room: <span>${currentState.roomId}</span></span>
                </div>
                <instructions-comp></instructions-comp>
                <button-play></button-play>
                <div class="container">
                    <piedra-comp></piedra-comp>
                    <papel-comp></papel-comp>
                    <tijera-comp></tijera-comp>
                </div>
            `;
        }
    }, 800);

    const player = localStorage.getItem("player");
    state.setStatus(player, false);
    div.addEventListener("click", () => {
        state.setStatus(player, true);
        return params.goTo("/waitPlayer");
    });
    return div;
}
