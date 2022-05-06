import { createModuleResolutionCache } from "typescript";
import { state } from "../../state";

export function waitPlayer(params) {
    state.listenRoom();

    const player = localStorage.getItem("player")    

    function nameOponent(player){
        if(player === "1"){
            const name = state.data.rtdbData.jugador2.name
            console.log("nombre",name);
        }
        if(player === "2"){
            
            const name = state.data.rtdbData.jugador1.name
            console.log("nombre",name);
        }
        
    }

    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <div>Esperando a que ${nameOponent(player)} presione ¡Jugar!... </div>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;
    console.log("waitplayer", state.data);

    const goToPlay = () => {
        const data = state.getState();
        if (
            data.rtdbData?.jugador1?.online === "true" &&
            data.rtdbData?.jugador2?.online === "true" &&
            location.pathname.includes("waitPlayer")
        ) {
            data.rtdbData.jugador1.online = false;
            data.rtdbData.jugador2.online = false;
            state.setState(data);
            return params.goTo("/play");
        }
    };

    
        state.subscribe(goToPlay);

    return div;
}
