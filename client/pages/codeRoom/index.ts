import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function codeRoom(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        
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
        ? (codeRoom.textContent = `Comparti el siguiente codigo con tu amigo: ${codigo.roomId}`)
        : null;

    state
        .accessToRoom()
        .then(() => {
            
            return state.setStatus();
        })
        .then(() => {
            return state.listenRoom();
        }).then(()=>{
            
            console.log("SOY DEL LOCAL",state.data.rtdbData[0]);
            if (!state.data.rtdbData.jugador1) {
                params.goTo("/play");
            }
        })


    // button.addEventListener("click",(event)=>{
    //     event.preventDefault()
    //     const nameValue = document.querySelector("input").value
    //     state.setFullName(nameValue)
    //     console.log(state.data)
    //     // params.goTo("/play")
    // })

    return div;
}
