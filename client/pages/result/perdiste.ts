const image = require("url:../../images/perdiste.svg");
import { state } from "../../state";

export function perdiste(params) {
  const div = document.createElement("div");
  div.className = "container-perdiste";

  div.innerHTML = `
        <span class="loser">¡Don't give up 😭!</span>
    `;

  const player = history.state.player;

  const name =
    player === "1" ? state.data.playerOneName : state.data.playerTwoName;

  state.cleanPlay({
    name: name,
    status: false,
    player: player,
    online: false,
  });
  setTimeout(() => {
    div.innerHTML = `
            <img src="${image}">
            <history-comp></history-comp>
            <button-playagain></button-playagain>

            `;
    const button = div.querySelector("button-playagain");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      return params.goTo("/waitRoom", { player });
    });
  }, 1500);

  return div;
}
