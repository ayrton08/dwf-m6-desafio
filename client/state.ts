const API_BASE_URL = "http://localhost:3000";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { rtdb } from "../server/rtdb";
import map from "lodash/map";

type Jugada = "piedra" | "papel" | "tijera";

const state = {
    data: {
        fullName: "",
        userId: "",
        rtdbRoomId: "",
        roomId: "",
        rtdbData: {},
    },

    listeners: [],

    init() {
        const lastStorageState = localStorage.getItem("state");
        return JSON.parse(lastStorageState);
    },

    listenRoom(cb?) {
        const currentState = this.getState();
        const chatroomsRef = ref(rtdb, "/rooms/" + currentState.rtdbRoomId);

        onValue(chatroomsRef, (snapshot) => {
            const currentState = this.getState();
            const value = snapshot.val();
            currentState.rtdbData = value;
            this.setState(currentState);
            if(!!value.jugador2?.status && !!cb){
                cb()
            }
        });
    },

    getState() {
        return this.data;
    },

    setFullName(fullName: string) {
        const currentState = this.getState();
        currentState.fullName = fullName;
        return this.setState(currentState);
    },

    signIn(callback?) {
        const currentState = this.getState();

        if (currentState.fullName) {
            return fetch(API_BASE_URL + "/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: currentState.fullName }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    currentState.userId = data.id;
                    if (callback) {
                        callback();
                    }
                    return this.setState(currentState);
                });
        } else {
            console.error("No hay un nombre en el State");
        }
        return Promise.reject();
    },

    askNewRoom(callback?) {
        const currentState = this.getState();
        if (currentState.userId) {
            return fetch(API_BASE_URL + "/rooms", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: currentState.userId }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    currentState.roomId = data.id;
                    if (callback) {
                        callback();
                    }
                    return this.setState(currentState);
                });
        } else {
            console.error("No hay userId");
        }
    },

    accessToRoom(callback?) {
        const currentState = this.getState();
        // const roomId = currentState.roomId;
        const roomIdStorage = this.init();
        const roomId = roomIdStorage.roomId;
        return fetch(
            API_BASE_URL + "/room/" + roomId + "?userId=" + currentState.userId
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                (currentState.rtdbRoomId = data.rtdbRoomId),
                    this.setState(currentState);

                if (callback) {
                    callback();
                }
            });
    },

    setState(newState) {
        this.data = newState;

        for (const cb of this.listeners) {
            cb();
        }
        localStorage.setItem("state", JSON.stringify(newState));

        // console.log("Soy el state, he cambiado ", this.data);
        return Promise.resolve();
    },

    subscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },

    setStatus(player) {
        const currentState = this.getState();

        const rtdbRoomId = this.init().rtdbRoomId;
        return fetch(API_BASE_URL + "/jugadas", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: true,
                player,
                rtdbRoomId,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                currentState.rtdbData = data;
                return this.setState(currentState);
            });
    },

    setPlay(params: {
        choise: string;
        name: string;
        online: Boolean;
        player: number;
    }) {
        const currentState = this.getState();
        
        
        const rtdbRoomId = this.init().rtdbRoomId;
        return fetch(API_BASE_URL + "/play", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                choise: params.choise,
                name: params.name,
                online: params.online,
                rtdbRoomId,
                player: params.player,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                currentState.rtdbData = data;
                return this.setState(currentState);
            });
    },

    getRtdbRoomId() {
        const currentState = this.getState();
        const roomId = currentState.roomId;
        return fetch(API_BASE_URL + "/rtdbRoomId", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId: roomId }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                currentState.rtdbRoomId = data.rtdbRoomId;
                return state.setState(currentState);
            });
    },

    whoWins(myPlay: Jugada, oponent: any) {
        if (myPlay === "papel" && oponent === "piedra") {
            return "gane";
        }
        if (myPlay === "piedra" && oponent === "tijera") {
            return "gane";
        }
        if (myPlay === "tijera" && oponent === "papel") {
            return "gane";
        }
        if (myPlay === "piedra" && oponent === undefined) {
            return "empate";
        }
        if (myPlay === oponent) {
            return "empate";
        } else {
            return "perdi";
        }
    },
    win() {
        if (!!sessionStorage.getItem("vos")) {
            const value = sessionStorage.getItem("vos");
            return sessionStorage.setItem(
                "vos",
                JSON.stringify(Number(value) + 1)
            );
        }
        sessionStorage.setItem("vos", "1");
    },
    lost() {
        if (!!sessionStorage.getItem("maquina")) {
            const value = sessionStorage.getItem("maquina");
            sessionStorage.setItem(
                "maquina",
                JSON.stringify(Number(value) + 1)
            );
        } else {
            sessionStorage.setItem("maquina", "1");
        }
    },
    historyVos() {
        let value = JSON.parse(sessionStorage.getItem("vos"));
        if (value === null) {
            return (value = 0);
        }
        return value;
    },
    historyMaquina() {
        let value = JSON.parse(sessionStorage.getItem("maquina"));
        if (value === null) {
            return (value = 0);
        }

        return value;
    },
};

export { state };
