import { state } from "../../state";
import { counterComp } from "../../components/counter";

export function yourName(params) {
  const div = document.createElement("div");
  div.className = "contenedor";
  div.innerHTML = `
        <title-text></title-text>
        <input class="name" type="text" placeholder="Your Name"></input>
        <button-play>
        <div slot="text">Start</div>
        </button-play>
        <div class="name-empty"></div>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

  const button = div.querySelector("button-play");
  let player = history.state.player;

  state.setStatus(player, false);

  const setHistory = () => {
    if (state.data.rtdbRoomId && !state.data.historySave && player === "1") {
      state.data.historySave = true;
      localStorage.setItem(state.data.roomId, "0");
      state.history(0, player);
    }
  };

  button.addEventListener("click", (event) => {
    const nameValue = document.querySelector("input").value;
    const nameEmpty = document.querySelector(".name-empty");
    nameEmpty.textContent = "";
    if (nameValue === "") {
      return (nameEmpty.textContent = "We need to know your name");
    }
    state.setFullName(player, nameValue);

    state.setStatus(player, true);
    state.signIn(player).then(() => {
      if (state.data.roomId) {
        state.getRtdbRoomId().then(() => {

          state.listenRoom();
          setTimeout(() => {
            let currentState = state.getState();
            if (
              currentState.rtdbData.jugador1.name !== nameValue &&
              currentState.rtdbData.jugador1.name &&
              currentState.rtdbData.jugador2.name !== nameValue &&
              currentState.rtdbData.jugador2.name
            ) {
              return (nameEmpty.textContent = "Sorry, this room is full or the name is wrong 😥");
            }
            if (currentState.rtdbData.jugador1?.name === nameValue) {
              state.setFullName("1", nameValue);
              return params.goTo("/waitRoom", { player: "1" });
            }
            if (currentState.rtdbData.jugador2?.name === nameValue) {
              return params.goTo("/waitRoom", { player: "2" });
            }
            if (!currentState.rtdbData.jugador2?.name) {
              state.history(0, player);
              return params.goTo("/waitRoom", { player: "2" });
            }
          }, 1500);
        });
      } else {
        state.askNewRoom().then(() => {
          state.subscribe(setHistory);
          state.listenRoom();
          div.innerHTML = `<counter-room></counter-room>`;
          return params.goTo("/codeRoom", { player });
        });
      }
    });
  });

  return div;
}
