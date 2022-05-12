import { state } from "../../state";
import { jugada } from "../jugada";

export function play(params) {
    const div = document.createElement("div");
    div.className = "container-play";
    div.innerHTML = `

    <counter-comp></counter-comp>
    <div class="jugadas">
    <piedra-comp></piedra-comp>
    <papel-comp></papel-comp>
    <tijera-comp></tijera-comp>
    </div>
    `;
    const player = localStorage.getItem("player");
    
    const piedra = div.querySelector("piedra-comp");
    const papel = div.querySelector("papel-comp");
    const tijera = div.querySelector("tijera-comp");


    const goToAwaitJugada = () => {
        const jugador = `jugador${player}`;
        if (
            state.data.rtdbData[jugador].choise &&
            location.pathname.includes("play")
        ) {
            return params.goTo("/waitJugada");
        }
    };

    const name = state.data.fullName;

    piedra.addEventListener("click", () => {
        papel.style.opacity = "0.4";
        tijera.style.opacity = "0.4";
        state.subscribe(goToAwaitJugada);

        state
            .setPlay({
                choise: "piedra",
                name: name,
                player: Number(player),
            })
            .then(() => {
                state.subscribe(goToAwaitJugada);

                return state.listenRoom();
            });
    });

    papel.addEventListener("click", () => {
        state.subscribe(goToAwaitJugada);
        
        piedra.style.opacity = "0.4";
        tijera.style.opacity = "0.4";

        state
            .setPlay({
                choise: "papel",
                name: name,
                player: Number(player),
            })
            .then(() => {
                
                return state.listenRoom();
            });
    });

    tijera.addEventListener("click", () => {

        papel.style.opacity = "0.4";
        piedra.style.opacity = "0.4";

        state.subscribe(goToAwaitJugada);
        state
            .setPlay({
                choise: "tijera",
                name: name,
                player: Number(player),
            })
            .then(() => {

                return state.listenRoom();
            });
    });

    return div;
}
