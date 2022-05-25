export function welcomePage(params) {
  const div = document.createElement("div");
  div.className = "contenedor";
  div.innerHTML = `
        <title-text></title-text>
        <button-new-game></button-new-game>
        <button-room></button-room>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

  const buttonNewGame = div.querySelector("button-new-game");
  const buttonRoom = div.querySelector("button-room");

  buttonNewGame.addEventListener("click", (event) => {
    event.preventDefault();
    return params.goTo("/yourName", { player: "1" });
  });
  const handlerButtonRoom = (event) => {
    event.preventDefault();
    return params.goTo("/yourCodeRoom", { player: "2" });
  };

  buttonRoom.addEventListener("click", handlerButtonRoom, { once: true });

  return div;
}
