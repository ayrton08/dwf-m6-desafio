import { state } from "../../state";

export function play(params) {
    // function redireccionar() {
    //     if (location.pathname === "/play") {
    //         params.goTo("/instructions");
    //     }
    // }

    setTimeout(() => {}, 7000);

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

    // state.listenRoom()
    const jugador1 = state.data.rtdbData.jugador1.choise;
    const jugador2 = state.data.rtdbData.jugador2.choise;

    piedra.addEventListener("click", (event) => {
        event.preventDefault();



        papel.style.opacity = "0.4";
        tijera.style.opacity = "0.4";

        const name = state.data.fullName;

        state.setPlay({
            choise: "piedra",
            name: name,
            player: Number(player),
        });

      
        console.log("jugador 1",jugador1);
        console.log("jugador 2",jugador2);
        

        // const resultado = state.whoWins( jugador1, jugador2);
        // setTimeout(() => {
        //     if (resultado === "gane") {
        //         state.win();
        //         return params.goTo("/result/jugada", {
        //             resultado: "ganaste",
        //             jugador1: "piedra",
        //             jugador2: jugador2,
        //         });
        //     }
        //     if (resultado === "empate") {
        //         return params.goTo("/result/jugada", {
        //             resultado: "empate",
        //             jugador1: "piedra",
        //             jugador2: jugador2,
        //         });
        //     } else {
        //         state.lost();
        //         return params.goTo("/result/jugada", {
        //             resultado: "perdiste",
        //             jugador1: "piedra",
        //             jugador2: jugador2,
        //         });
        //     }
        // }, 700);
    });

    papel.addEventListener("click", (event) => {
        event.preventDefault();

        piedra.style.opacity = "0.4";
        tijera.style.opacity = "0.4";

        const name = state.data.fullName;

        state.setPlay({
            choise: "papel",
            name: name,
            player: Number(player),
        });
        
        console.log("jugador 1",jugador1);
        console.log("jugador 2",jugador2);
        

        // const resultado = state.whoWins( jugador1, jugador2);
        setTimeout(() => {
            // if (resultado === "gane") {
            //     state.win();
                return params.goTo("/result/jugada", {
                    // resultado: "ganaste",
                    jugador1: jugador1,
                    jugador2: jugador2,
                // });
            // }
            // if (resultado === "empate") {
            //     return params.goTo("/result/jugada", {
            //         resultado: "empate",
            //         jugador1: "papel",
            //         jugador2: jugador2,
            //     });
            // } else {
            //     state.lost();
            //     return params.goTo("/result/jugada", {
            //         resultado: "perdiste",
            //         jugador1: "papel",
            //         jugador2: jugador2,
            //     });
            // }
        }, 700);
    });

    tijera.addEventListener("click", (event) => {
        event.preventDefault();

        papel.style.opacity = "0.4";
        piedra.style.opacity = "0.4";

        const name = state.data.fullName;

        state.setPlay({
            choise: "tijera",
            name: name,
            player: Number(player),
        });
        console.log("jugador 1",jugador1);
        console.log("jugador 2",jugador2);
    })

        // const resultado = state.whoWins( jugador1, jugador2);
        // setTimeout(() => {
        //     if (resultado === "gane") {
        //         state.win();
        //         return params.goTo("/result/jugada", {
        //             resultado: "ganaste",
        //             jugador1: "tijera",
        //             jugador2: jugador2,
        //         });
        //     }
        //     if (resultado === "empate") {
        //         return params.goTo("/result/jugada", {
        //             resultado: "empate",
        //             jugador1: "tijera",
        //             jugador2: jugador2,
        //         });
        //     } else {
        //         state.lost();
        //         return params.goTo("/result/jugada", {
        //             resultado: "perdiste",
        //             jugador1: "tijera",
        //             jugador2: jugador2,
        //         });
            // }
        // }, 700);
    // });

    return div;
}
