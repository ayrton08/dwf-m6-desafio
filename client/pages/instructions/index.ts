
export function instructionsPage (params) {
    const div = document.createElement("div")
    div.className= "contenedor"
    div.innerHTML = `
        <instructions-comp></instructions-comp>
        <button-play></button-play>
        <div class="container">
        <piedra-comp></piedra-comp>
        <papel-comp></papel-comp>
        <tijera-comp></tijera-comp>
        </div>
    `
    
    const button = div.querySelector("button-play")

    button.addEventListener("click",(event)=>{
        event.preventDefault()
        params.goTo("/play")
    })

    return div
}