export function buttonRoom() {
    class ButtonRoom extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback(){
            this.render();

        }

        render() {
            this.attachShadow({ mode: "open" });

            const button = document.createElement("button");

            button.className = "root";

            button.innerHTML = `
                <span>Ingresar a una Sala</span>
                ${this.getStyles()}    
            `

            this.shadowRoot.appendChild(button);
        }
        getStyles() {
            return `
            <style>
            .root{
                border: 10px solid #001997;
                padding:17px 13px;
                background: #006CFC;
                width: 400px;
                height: 87px;
                border-radius: 10px;

                font-size: 38px; 
                font-family: 'Odibee Sans', cursive;
                color: #D8FCFC;
                display: flex;
                justify-content: center;
                align-items: center;
                
            }
           </style>
            
            `;
        }
    }
    customElements.define("button-room", ButtonRoom);
}
