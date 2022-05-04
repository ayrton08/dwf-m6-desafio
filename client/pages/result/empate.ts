const image = require("url:../../images/ganaste.svg");
const giphy = require("url:../../images/giphy.gif");


export function empate (params) {
    const div = document.createElement("div")
    div.className = "container-empate"
    
    console.log(history.state.resultado)
    console.log(history.state.player)
    console.log(history.state.machine)



    div.innerHTML = `
        <img class="giphy" src="${giphy}" alt="">
        <button-playagain></button-playagain>
    
        `
    
    const button = div.querySelector("button-playagain")
    button.addEventListener("click",(event)=>{
        event.preventDefault()
        params.goTo("/play")
    })

    

    return div
}