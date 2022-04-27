const image = require("url:../../images/tijera.svg");

export function tijera() {
    class Tijera extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.render();
        }

        render() {
            this.attachShadow({ mode: "open" });

            const div = document.createElement("img");
            div.src = image;
            div.style.marginTop = "15px"
            
            
            if(this.hasAttribute('width') && this.hasAttribute('height')) {
                div.style.width = this.getAttribute('width');
                div.style.height = this.getAttribute('height');
              } else {
                div.style.width = "70px"
                div.style.height = "160px"
              }

    

            this.shadowRoot.appendChild(div);
        }

        
    }
    customElements.define("tijera-comp", Tijera);
}