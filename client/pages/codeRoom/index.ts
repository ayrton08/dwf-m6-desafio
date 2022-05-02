import { state } from "../../state";

export function codeRoom(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <span class="compartir-code">Comparti el siguiente codigo con tu amigo<span class="code-room"></span></span>
        
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;
    const codigo = JSON.parse(localStorage.getItem("state"));
    const codeRoom = div.querySelector(".code-room");
    codeRoom.textContent = codigo.roomId;

    state.accessToRoom();

    state.listenRoom();

    // button.addEventListener("click",(event)=>{
    //     event.preventDefault()
    //     const nameValue = document.querySelector("input").value
    //     state.setFullName(nameValue)
    //     console.log(state.data)
    //     // params.goTo("/play")
    // })

    return div;
}
