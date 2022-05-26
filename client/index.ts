import { initRouter } from "./router";
import {titleText} from "./components/title-text/index"
import { buttonStart } from "./components/button-new-game";
import { buttonRoom } from "./components/button-room";
import { papel } from "./components/papel-comp/index";
import {piedra} from "./components/piedra-comp/index"
import { tijera } from "./components/tijera-comp";
import {buttonPlay} from "./components/button-play/index"
import { instructionsComp } from "./components/instruction-comp";
import { buttonPlayAgain } from "./components/button-playagain";
import { counterComp } from "./components/counter/index";
import { historyComp } from "./components/history-game";
import { counterRoom } from "./components/counterRoomId";



(function (){
    titleText()
    buttonStart()
    buttonRoom()
    buttonPlay()
    papel()
    piedra()
    tijera()
    instructionsComp()
    buttonPlayAgain()
    counterComp()
    historyComp()
    counterRoom()
    

    const root = document.querySelector(".root");

    initRouter(root)


})()
