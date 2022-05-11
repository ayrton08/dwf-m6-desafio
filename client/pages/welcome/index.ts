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
        localStorage.setItem("player", "1");
        params.goTo("/yourName");
    });

    buttonRoom.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.setItem("player", "2");

        params.goTo("/yourCodeRoom");
    });

    

    return div;
}
