const image = require("url:../../images/ganaste.svg");


export function ganaste (params) {
    const div = document.createElement("div")
    div.className = "container-ganaste"

    console.log(history.state.resultado)
    console.log(history.state.player)
    console.log(history.state.machine)

    div.innerHTML = `
        <img src="${image}">
        <history-comp></history-comp>
        <button-playagain></button-playagain>
    
        `
    
    const button = div.querySelector("button-playagain")
    button.addEventListener("click",(event)=>{
        event.preventDefault()
        params.goTo("/play")
    })

    

    return div
}