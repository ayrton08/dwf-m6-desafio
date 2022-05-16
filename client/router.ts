import { yourName } from "./pages/yourName";
import { welcomePage } from "./pages/welcome/index";
import { codeRoom } from "./pages/codeRoom";
import { play } from "./pages/play/index";
import { yourCodeRoom } from "./pages/yourCodeRoom";
import { ganaste } from "./pages/result/ganaste";
import { perdiste } from "./pages/result/perdiste";
import { empate } from "./pages/result/empate";
import { jugada } from "./pages/jugada/index";
import { waitRoom } from "./pages/waitRoom";
import { waitPlayer } from "./pages/waitPlayer";
import { waitJugada } from "./pages/waitJugada";

const routes = [
    {
        path: /\/welcome/,
        component: welcomePage,
    },
    {
        path: /\/yourName/,
        component: yourName,
    },
    {
        path: /\/codeRoom/,
        component: codeRoom,
    },
    {
        path: /\/play/,
        component: play,
    },
    {
        path: /\/yourCodeRoom/,
        component: yourCodeRoom,
    },
    {
        path: /\/waitRoom/,
        component: waitRoom,
    },
    {
        path: /\/waitPlayer/,
        component: waitPlayer,
    },
    {
        path: /\/waitJugada/,
        component: waitJugada,
    },
    {
        path: /\/result\/perdiste/,
        component: perdiste,
    },
    {
        path: /\/result\/jugada/,
        component: jugada,
    },
    {
        path: /\/result\/ganaste/,
        component: ganaste,
    },
    {
        path: /\/result\/empate/,
        component: empate,
    },
];

export function initRouter(container: Element) {
    function goTo(path, data) {
        history.pushState(data, "", path);
        handleRoute(path);
    }

    function handleRoute(route) {
        for (const r of routes) {
            if (r.path.test(route)) {
                const el = r.component({ goTo: goTo });

                if (container.firstChild) {
                    container.firstChild.remove();
                }
                container.appendChild(el);
            }
        }
    }

    if (location.pathname === "/") {
        goTo("/welcome", "");
    } else {
        handleRoute(location.pathname);
    }
    if (location.host.includes(".github.io")) {
        goTo("/welcome", {});
    }

    window.onpopstate = () => {
        handleRoute(location.pathname);
    };
}
