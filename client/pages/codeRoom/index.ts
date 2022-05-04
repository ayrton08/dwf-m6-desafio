import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function codeRoom(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <button-play class="button"></button-play>
        <div class="code"></div>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;
    const codigo = JSON.parse(localStorage.getItem("state"));

    const codeRoom = div.querySelector(".code");
    codigo.roomId
        ? (codeRoom.innerHTML = `Comparti el siguiente codigo con tu amigo: <span class="number">${codigo.roomId}</span>`)
        : null;

        // const button = document.querySelector("code");
    
        // button.addEventListener("click", () => {
        //     console.log("soy el click");
        //     codeRoom.textContent = "Esperando a ... apriete Jugar";
        //     codeRoom.innerHTML = "Esperando a ... apriete Jugar";
            
        // });
        const goToRoom = ()=>{
            return params.goTo("/play")

        }
    state
        .accessToRoom()
        .then(() => {
            return state.listenRoom(goToRoom);
        })






    return div;
}
