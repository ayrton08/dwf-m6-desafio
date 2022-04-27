const image = require("url:../../images/papel.svg");

export function papel() {
    class Papel extends HTMLElement {
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
            

            if (this.hasAttribute("width") && this.hasAttribute("height")) {
                div.style.width = this.getAttribute("width");
                div.style.height = this.getAttribute("height");
            } else {
                div.style.width = "80px";
                div.style.height = "180px";
            }

            this.shadowRoot.appendChild(div);
        }
    }
    customElements.define("papel-comp", Papel);
}
