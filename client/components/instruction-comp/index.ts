export function instructionsComp() {
    class Instructions extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.render();
        }

        render() {
            this.attachShadow({ mode: "open" });
            
            const div = document.createElement("div")
            div.className = "root"

            div.innerHTML = `
                <span>Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</span>
                ${this.getStyle()}
            `
            this.shadowRoot.appendChild(div)
        }

        getStyle(){
            return `
            <style>
                .root {
                margin: 0;
                color: #000000;
                font-family: 'Caveat', cursive;
                font-size: 45px;
                font-weight: bold; 
                text-align: center;
 
            }
            
            </style>

            `
        }
    }
    customElements.define("instructions-comp", Instructions);
}
