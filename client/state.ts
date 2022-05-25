const API_BASE_URL = "https://apx-m6.herokuapp.com";
// const API_BASE_URL = "http://localhost:3000";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { rtdb } from "../server/rtdb";

type Jugada = "piedra" | "papel" | "tijera";

const state = {
  data: {
    playerOneName: "",
    playerTwoName: "",
    userId: "",
    rtdbRoomId: "",
    roomId: "",
    rtdbData: {},
    historySave: false,
    firstRound: false,
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
      const value = snapshot.val();
      currentState.rtdbData = value;
      this.setState(currentState);
    });
  },

  getState() {
    return this.data;
  },

  setFullName(player: string, fullName: string) {
    const currentState = this.getState();
    if (player === "1") {
      currentState.playerOneName = fullName;
      return this.setState(currentState);
    }
    currentState.playerTwoName = fullName;
    return this.setState(currentState);
  },

  signIn(player, callback?) {
    const currentState = this.getState();
    const fullName =
      player === "1" ? currentState.playerOneName : currentState.playerTwoName;
    if (fullName) {
      return fetch(API_BASE_URL + "/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fullName }),
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

  accessToRoom() {
    const currentState = this.getState();
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
      });
  },

  setState(newState) {
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
    return Promise.resolve();
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  setStatus(player, online) {
    const currentState = this.getState();
    const { rtdbRoomId } = currentState;
    if (!rtdbRoomId) return Promise.resolve();
    return fetch(API_BASE_URL + "/status", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
        online,
        player,
        name:
          player === "1"
            ? currentState.playerOneName
            : currentState.playerTwoName,
        rtdbRoomId,
      }),
    });
  },

  setPlay(params: { choise: string; name: string; player: number }) {
    const rtdbRoomId = this.init().rtdbRoomId;
    return fetch(API_BASE_URL + "/play", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        choise: params.choise,
        name: params.name,
        rtdbRoomId,
        player: params.player,
      }),
    });
  },

  cleanPlay(params: {
    name: string;
    status: boolean;
    player: any;
    online: any;
  }) {

    const rtdbRoomId = this.init().rtdbRoomId;
    return fetch(API_BASE_URL + "/cleanPlay", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: params.name,
        rtdbRoomId,
        status: params.status,
        online: params.online,
        player: params.player,
      }),
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
        if (res.status == 401) {
          throw new Error();
        }
        return res.json();
      })
      .then((response) => {
        currentState.rtdbRoomId = response.rtdbRoomId;
        return state.setState(currentState);
      })
      .catch((err) => {
        return { error: err };
      });
  },

  whoWins(player1: Jugada, player2: any) {
    if (player1 === "papel" && player2 === "piedra") {
      return "gane";
    }
    if (player1 === "piedra" && player2 === "tijera") {
      return "gane";
    }
    if (player1 === "tijera" && player2 === "papel") {
      return "gane";
    }
    if (player1 === player2) {
      return "empate";
    } else {
      return "perdi";
    }
  },
  win() {
    const value = sessionStorage.getItem("victorias");
    sessionStorage.setItem("victorias", JSON.stringify(Number(value) + 1));
    return Number(value) + 1;
  },

  history(victory,player) {
    const rtdbRoomId = this.getState().rtdbRoomId;
    return fetch(API_BASE_URL + "/history", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rtdbRoomId: rtdbRoomId,
        player,
        victory,
      }),
    });
  },
};

export { state };
