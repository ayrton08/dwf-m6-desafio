const API_BASE_URL = "http://localhost:3000";
import { getDatabase, ref, onValue, update } from "firebase/database";
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
        rtdbRoomId: "",
        roomId: "",
        rtdbData: {},
    },

    listeners: [],

    init() {
        const lastStorageState = localStorage.getItem("state");
        return JSON.parse(lastStorageState);
    },

    listenRoom() {
        const currentState = this.getState();
        const chatroomsRef = ref(rtdb, "/rooms/" + currentState.rtdbRoomId);

        onValue(chatroomsRef, (snapshot) => {
            const currentState = this.getState();
            const value = snapshot.val();
            currentState.rtdbData = value;
            console.log(value);
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

        console.log("Soy el state, he cambiado ", this.data);
        return Promise.resolve();
    },

    subscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },

    setStatus(callback?) {
        console.log("SOY EL SET ROOM");
        const currentState = this.getState();

        const rtdbRoomId = this.init().rtdbRoomId;
        return fetch(API_BASE_URL + "/jugadas", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: true,
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

    setPlay(choise,name,online) {
        console.log("SOY EL SET Play");
        const currentState = this.getState();

        const rtdbRoomId = this.init().rtdbRoomId;
        return fetch(API_BASE_URL + "/play", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                choise: choise,
                name: name,
                online: online,
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
};

export { state };
