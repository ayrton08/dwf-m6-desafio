import { state } from "../../state";

export function jugada(params) {
  const div = document.createElement("div");

  div.className = "container-jugada";

  const jugada = {
    papel: `<papel-comp width="140px" height="250px"></papel-comp>`,
    piedra: `<piedra-comp width="140px" height="250px"></piedra-comp>`,
    tijera: `<tijera-comp width="140px" height="250px"></tijera-comp>`,
  };

  const jugador1 = history.state.choise.jugador1;
  const jugador2 = history.state.choise.jugador2;
  const player = history.state.player;

  if (player === "1") {
    div.innerHTML = `
            ${jugada[jugador2]}
            ${jugada[jugador1]}
            `;
  }
  if (player === "2") {
    div.innerHTML = `
            ${jugada[jugador1]}
            ${jugada[jugador2]}
            `;
  }

  const resultado = state.whoWins(jugador1, jugador2);
  const currentState = state.getState();
  currentState.firstRound = true;

  setTimeout(() => {
    if (resultado === "gane" && player === "1") {
      const numberOfVictories = state.win();
      state.history(numberOfVictories, player);

      return params.goTo("/result/ganaste", { player });
    }
    if (resultado === "gane" && player === "2") {
      return params.goTo("/result/perdiste", { player });
    }

    if (resultado === "empate") {
      return params.goTo("/result/empate", { player });
    }
    if (resultado === "perdi" && player === "1") {
      return params.goTo("/result/perdiste", { player });
    }
    if (resultado === "perdi" && player === "2") {
      const numberOfVictories = state.win();
      state.history(numberOfVictories, player);
      return params.goTo("/result/ganaste", { player });
    }
  }, 1000);

  return div;
}
