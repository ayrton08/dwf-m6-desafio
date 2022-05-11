export function counterRoom() {
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
	        padding-top: 110px;
	        text-align: center;
	        font-size: 50px;
            }
          
            
            </style>

            `;
        }
        counter() {
            let counter = 5;
            let interval = setInterval(() => {
                counter--;
                if (counter == 4) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "Creando";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#F8C471";
                } else if (counter == 3) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "tu";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#2ECC71 ";
                } else if (counter == 2) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "Game Room";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#D2B4DE";
                } else if (counter == 1) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.innerHTML = `
                    <span class="time">Almost Ready</span>
                    <style>
                        .time {
                    font-size: 40px;
                    color: crimson;
                    }
                    </style>
                    `;
                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#F1948A";
                } else if (counter == 0) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.innerHTML = `
                    <span class="time">Sorry this is takiig too long</span>
                    <style>
                        .time {
                    font-size: 25px;
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
    customElements.define("counter-room", Counter);
}
