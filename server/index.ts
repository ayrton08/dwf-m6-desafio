import { firestore, rtdb } from "./db";
import { onValue, ref } from "firebase/database";
import * as express from "express";
import * as cors from "cors";
import { nanoid } from "nanoid";
import { state } from "../client/state";
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    console.log(req.body);
    res.json({
        estado: "ok",
    });
});

app.listen(PORT, () => {
    console.log("Todo funcionando en el puerto " + PORT);
});

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

app.post("/signup", (req, res) => {
    const nameReq = req.body.name;
    userCollection
        .where("fullName", "==", nameReq)
        .get()
        .then((search) => {
            if (search.empty) {
                userCollection
                    .add({
                        nameReq,
                    })
                    .then((newUserRef) => {
                        res.json({
                            id: newUserRef.id,
                            new: true,
                        });
                    });
            } else {
                res.status(400).json({
                    message: "user already exists",
                });
            }
        });
});

// app.post("/auth", (req, res) => {
//     const { email } = req.body;

//     userCollection
//         .where("email", "==", email)
//         .get()
//         .then((search) => {
//             if (search.empty) {
//                 res.status(404).json({
//                     message: "not found",
//                 });
//             } else {
//                 res.json({
//                     id: search.docs[0].id,
//                 });
//             }
//         });
// });

app.post("/rooms", (req, res) => {
    const { userId } = req.body;
    userCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
            if (doc.exists) {
                const roomRef = rtdb.ref("rooms/" + nanoid());
                roomRef
                    .set({
                        jugador1: userId,
                    })
                    .then(() => {
                        const roomLongId = roomRef.key;
                        const roomId = 1000 + Math.floor(Math.random() * 999);
                        roomsCollection
                            .doc(roomId.toString())
                            .set({
                                rtdbRoomId: roomLongId,
                            })
                            .then(() => {
                                res.json({
                                    id: roomId.toString(),
                                });
                            });
                    });
            } else {
                res.status(401).json({
                    message: "no existis",
                });
            }
        });
});

app.get("/room/:roomId", (req, res) => {
    const { userId } = req.query;
    const { roomId } = req.params;

    userCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
            if (doc.exists) {
                roomsCollection
                    .doc(roomId)
                    .get()
                    .then((snap) => {
                        const data = snap.data();
                        res.json(data);
                    });
            } else {
                res.status(401).json({
                    message: "no existis",
                });
            }
        });
});

app.post("/jugadas", function (req, res) {
    const { rtdbRoomId, player } = req.body;

    if (player === "1") {
        console.log("PLAYER", req.body);
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador1`);

        roomRef.update({
            status: `${req.body.status}`,
            online: `${req.body.online}`,
            fullName: `${req.body.name}`,
        });
    }
    if (player === "2") {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador2`);
        console.log("VENGODEL BACK");
        roomRef.update({
            status: `${req.body.status}`,
            online: `${req.body.online}`,
            fullName: `${req.body.name}`,
        });
    }
});

app.post("/play", function (req, res) {
    const { rtdbRoomId, player, } = req.body;
    console.log("SOY EL BODY", req.body);

    if (player === 1) {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador1`);

        const data = roomRef.update(
            {
                choise: req.body.choise,
                name: req.body.name,
            },
            function () {
                return data[0];
            }
        );
    }
    if (player === 2) {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador2`);

        const data = roomRef.update(
            {
                choise: req.body.choise,
                name: req.body.name,
            },
            function () {
                return data[1];
            }
        );
    }
});

app.post("/rtdbRoomId", function (req, res) {
    const { roomId } = req.body;

    roomsCollection
        .doc(roomId)
        .get()
        .then((doc) => {
            const docu = doc.data();
            res.json(docu);
        });
    // const roomRef = rtdb.ref(`/rooms/${roomId}`);

    // console.log("soy el roomref",roomRef)

    // roomRef
    //     .get()
    //     .then((snap) => {
    //         console.log(snap.val());
    //     })
    //     .then(() => {
    //         return res.json();
    //     });

    // if (state.data.rtdbData[0] == "jugador1") {
    //     const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador2`);

    //     roomRef.update(
    //         {
    //             status: `${req.body.status}`,
    //         },
    //         function () {
    //             res.json("todo ok");
    //         }
    //     );
    // }
});
