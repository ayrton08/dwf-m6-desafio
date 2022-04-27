export function counterComp() {
    class Counter extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.render();
        }

        render() {
            this.attachShadow({ mode: "open" });
            this.counter();
            const div = document.createElement("div");
            div.className = "root";

            div.innerHTML = `
            <div class="clock">
	        <span class="seconds"></span>
            </div>
            
            ${this.getStyle()}    
            `;
            this.shadowRoot.appendChild(div);
        }

        getStyle() {
            return `
            <style>
                .clock {
	        width: 300px;
	        height: 300px;
	        border-radius: 50%;
	        background-color: lightgrey;
	        margin: auto;
            font-family: 'Odibee Sans', cursive;
            }
        
                .seconds {
	        display: block;
	        width: 100%;
	        margin: auto;
	        padding-top: 60px;
	        text-align: center;
	        font-size: 150px;
            }
          
            
            </style>

            `;
        }
        counter() {
            let counter = 6;
            let interval = setInterval(() => {
                counter--;
                if (counter == 5) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "5";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#EC7063";
                } else if (counter == 4) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "4";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#BB8FCE";
                } else if (counter == 3) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "3";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#F8C471";
                } else if (counter == 2) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "2";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#2ECC71 ";
                } else if (counter == 1) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "1";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#D2B4DE";
                } else if (counter == 0) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.innerHTML = `
                    <span class="time">Time's Over</span>
                    <style>
                        .time {
                    font-size: 70px;
                    color: crimson;
                    }
                    </style>
                    `;
                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#F1948A";
                } else {
                    clearInterval(interval);
                }
            }, 1000);
            return interval;
        }
    }
    customElements.define("counter-comp", Counter);
}
