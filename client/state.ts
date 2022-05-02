const API_BASE_URL = "http://localhost:3000";
import { getDatabase, ref, onValue } from "firebase/database";
import { rtdb } from "../server/rtdb";
import map from "lodash/map";

type Message = {
    from: string;
    messages: string;
};

const state = {
    data: {
        fullName: "",
        userId: "",
        messages: [],
        rtdbRoomId: "",
        roomId: "",
        rtdbData: {},
    },

    listeners: [],

    init() {
        const lastStorageState = localStorage.getItem("state");
    },

    listenRoom() {
        const currentState = this.getState();
        const chatroomsRef = ref(rtdb, "/rooms/" + currentState.rtdbRoomId);

        onValue(chatroomsRef, (snapshot) => {
            const currentState = this.getState();
            const value = snapshot.val();
            currentState.rtdbData = value.currentGame;
            console.log(currentState);
            this.setState(currentState);
        });
    },

    getState() {
        return this.data;
    },

    setFullName(fullName: string) {
        const currentState = this.getState();
        (currentState.fullName = fullName), this.setState(currentState);
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
                    this.setState(currentState);
                    if (callback) {
                        callback();
                    }
                });
        } else {
            console.error("No hay un nombre en el State");
        }
    },

    askNewRoom(callback?) {
        const currentState = this.getState();
        if (currentState.userId) {
            fetch(API_BASE_URL + "/rooms", {
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
                    (currentState.roomId = data.id),
                        this.setState(currentState);
                    if (callback) {
                        callback();
                    }
                });
        } else {
            console.error("No hay userId");
        }
    },

    accessToRoom(callback?) {
        const currentState = this.getState();
        const roomId = currentState.roomId;
        fetch(
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

        console.log("Soy el state, he cambiado " + this.data);
    },

    subscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },
};

export { state };
