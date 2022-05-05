import { state } from "../../state";

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

    const piedra = div.querySelector("piedra-comp");
    const papel = div.querySelector("papel-comp");
    const tijera = div.querySelector("tijera-comp");

    const player = localStorage.getItem("player");
    
    const goToAwaitJugada = () => {
        const jugador = `jugador${player}`;
        if (state.data.rtdbData[jugador].choise && location.pathname.includes("play")) {
            return params.goTo("/waitJugada");
        }
    };
    // state.listenRoom()
    const jugador1 = state.data.rtdbData.jugador1.choise;
    const jugador2 = state.data.rtdbData.jugador2.choise;

    const name = state.data.fullName;
    piedra.addEventListener("click", (event) => {
        event.preventDefault();
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
                console.log("SOY LA PROMESA");
                return state.listenRoom();
            });

        console.log("jugador 1", jugador1);
        console.log("jugador 2", jugador2);
    });

    papel.addEventListener("click", (event) => {
        event.preventDefault();

        piedra.style.opacity = "0.4";
        tijera.style.opacity = "0.4";
        state.subscribe(goToAwaitJugada);

        state
            .setPlay({
                choise: "papel",
                name: name,
                player: Number(player),
            })
            .then(() => {
                console.log("SOY LA PROMESA");
                return state.listenRoom();
            });
    });

    

    tijera.addEventListener("click", (event) => {
        event.preventDefault();

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
                console.log("SOY LA PROMESA");
                return state.listenRoom();
            });
    });

    return div;
}
