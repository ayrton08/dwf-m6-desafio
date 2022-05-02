import { state } from "../../state";

export function yourName(params) {
    const div = document.createElement("div");
    div.className = "contenedor";
    div.innerHTML = `
        <button-play></button-play>
        <input class="name"> </input>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `;

    const button = div.querySelector("button-play");

    button.addEventListener("click", (event) => {
        event.preventDefault();
        const nameValue = document.querySelector("input").value;
        state.setFullName(nameValue);
        console.log(state.data);
        state.signIn().then(() => {
            state.askNewRoom();
        }).then(()=>{
            state.accessToRoom()
        })

        // params.goTo("/codeRoom");
    });

    return div;
}
