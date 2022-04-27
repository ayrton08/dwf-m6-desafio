import { state } from "../../state";

export function historyComp() {
    class History extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.render();
        }

        render() {
            this.attachShadow({ mode: "open" });
            const div = document.createElement("div")
            div.className = "container"

            div.innerHTML = `
                <div>Score</div>
                <div class="content">
                <span>Vos: ${state.historyVos()}</span>
                <span>Maquina: ${state.historyMaquina()}</span>
                </div>
                ${this.getStyle()}
            `
            this.shadowRoot.appendChild(div)
        }

        getStyle(){
            return `
            <style>
            

                .container {

                margin: 0;
                color: #000000;
                font-family: 'Odibee Sans', cursive;
                font-size: 55px;
                font-weight: bold; 
                text-align: center;
                

                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                padding: 20px;


                background-color: antiquewhite;
                border: black solid 10px;
                border-radius: 10px;
                width: 259px;
                height: 217px;

            }

            .content {
                display: flex;
                flex-direction: column;
                text-align: end;
                font-size: 45px;
                
                

            }
            
            </style>

            `
        }
    }
    customElements.define("history-comp", History);
}