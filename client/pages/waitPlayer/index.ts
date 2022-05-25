import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitPlayer(params) {
  state.listenRoom();
  const div = document.createElement("div");
  div.className = "contenedor";
  const currentState = state.getState();

  const player = history.state.player;
  if (state.data.firstRound) {
    const player1 = currentState.rtdbData.jugador1.name;
    const player2 = currentState.rtdbData.jugador2.name;

    const history1 = currentState.rtdbData.history.player1;
    const history2 = currentState.rtdbData.history.player2;

    if (player === "1") {
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
            <div class="text-wait">Esperando a que tu ${player2} presione ¡Jugar!... </div>
            <div class="container">
            <piedra-comp></piedra-comp>
            <papel-comp></papel-comp>
            <tijera-comp></tijera-comp>
            </div>
            `;
    }
    if (player === "2") {
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
            <div class="text-wait">Esperando a que tu <span class="name-player-one">${player1}</span> presione ¡Jugar!... </div>
            <div class="container">
            <piedra-comp></piedra-comp>
            <papel-comp></papel-comp>
            <tijera-comp></tijera-comp>
            </div>
            `;
    }
  } else {
    div.innerHTML = `
            <div class="text-wait">Esperando a que tu oponente presione ¡Jugar!... </div>
            <div class="container">
            <piedra-comp></piedra-comp>
            <papel-comp></papel-comp>
            <tijera-comp></tijera-comp>
            </div>
        `;
  }

  const goToPlay = () => {
    const data = state.getState();

    if (
      data.rtdbData?.jugador1?.online &&
      data.rtdbData?.jugador2?.online &&
      location.pathname.includes("waitPlayer")
    ) {
      data.rtdbData.jugador1.online = false;
      data.rtdbData.jugador2.online = false;
      state.setState(data);
      return params.goTo("/play", { player });
    }
  };

  state.subscribe(goToPlay);

  return div;
}
