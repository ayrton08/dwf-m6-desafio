import { state } from "../../state";

export function yourCodeRoom(params) {
  const div = document.createElement("div");
  div.className = "contenedor";
  div.innerHTML = `
        <title-text></title-text>
        <button-room></button-room>
        <input class="name" placeholder="code room"> </input>
        <div class="error"></div>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;
  const player = history.state.player;
  const button = div.querySelector("button-room");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const codeValue = document.querySelector("input").value;
    const errorMessage = document.querySelector(".error");
    errorMessage.textContent = "";

    const currentState = state.getState();
    currentState.roomId = codeValue;

    state.setState(currentState).then(() => {
      state
        .getRtdbRoomId()
        .then((data) => {
          if (data?.error) {
            throw new Error();
          }
          return Promise.resolve();
        })
        .then(() => {
          state.listenRoom();
          return params.goTo("/yourName", { player });
        })
        .catch(() => {
          errorMessage.textContent = "The Room Id is not valid";
        });
    });
  });

  return div;
}
