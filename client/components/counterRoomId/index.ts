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
                .root{
                    padding-top: 150px;
                }
            
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
            let counter = 6;
            let interval = setInterval(() => {
                counter--;
                if (counter == 5) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "Creating";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#F8C471";
                } else if (counter == 4) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "your";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#2ECC71 ";
                } else if (counter == 3) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.textContent = "Game Room";

                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#D2B4DE";
                } else if (counter == 2) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.innerHTML = `
                    <span class="time">Almost Ready</span>
                    <style>
                        .time {
                    font-size: 40px;
                    
                    }
                    </style>
                    `;
                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "#F1948A";
                } else if (counter == 1) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.innerHTML = `
                    <span class="time">Sorry... this is taking too long</span>
                    <style>
                        .time {
                    font-size: 25px;
                    
                    }
                    </style>
                    `;
                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "blue";
                } else if (counter == 1) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.innerHTML = `
                    <span class="time">Sorry... this is taking too long</span>
                    <style>
                        .time {
                    font-size: 25px;
                    
                    }
                    </style>
                    `;
                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "blue";
                } else if (counter == 0) {
                    let shadow = this.shadowRoot.querySelector(".seconds");
                    shadow.innerHTML = `
                    <span class="time">Be patient please</span>
                    <style>
                        .time {
                    font-size: 25px;
                    
                    }
                    </style>
                    `;
                    let circulo = this.shadowRoot.querySelector(".clock");
                    circulo.style.background = "yellow";
                } else {
                    clearInterval(interval);
                }
            }, 1000);
            return interval;
        }
    }
    customElements.define("counter-room", Counter);
}
