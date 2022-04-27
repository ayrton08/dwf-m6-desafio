export function titleText() {
    class Title extends HTMLElement {
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
                <h1>Piedra Papel ó Tijera</h1>
                ${this.getStyle()}
            `
            this.shadowRoot.appendChild(div)
        }

        getStyle(){
            return `
            <style>
                .root {
                margin: 0;
                color: #F8C471;
                font-family: 'Caveat', cursive;
                font-size: 45px;
                
            }
            h1 {
                    margin: 0;
                }
            </style>

            `
        }
    }
    customElements.define("title-text", Title);
}
