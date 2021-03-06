import { firestore, rtdb } from "./db";
import * as express from "express";
import * as cors from "cors";
import { nanoid } from "nanoid";
import * as path from "path"
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

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
                        return res.json(data);
                    });
            } else {
                return res.status(401).json({
                    message: "no existis",
                });
            }
        });
});

app.post("/status", function (req, res) {
    const { rtdbRoomId, player } = req.body;

    if (player == 1) {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador1`);
        roomRef.update({
            status: Boolean(req.body.status),
            online: Boolean(req.body.online),
            fullName: req.body.name,
        });
        return res.json();
    }
    if (player == 2) {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador2`);
        roomRef.update({
            status: Boolean(req.body.status),
            online: Boolean(req.body.online),
            fullName: req.body.name,
        });
        return res.json();
    }
});

app.post("/play", function (req, res) {
    const { rtdbRoomId, player } = req.body;

    if (player == 1) {
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
        return res.json("ok");
    }
    if (player == 2) {
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
        return res.json("ok");
    }
});

app.post("/cleanPlay", function (req, res) {
    const { rtdbRoomId, player } = req.body;

    if (player === "1") {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador1`);

        const data = roomRef.set(
            {
                status: req.body.status,
                name: req.body.name,
                online: Boolean(req.body.online),
            },
            function () {
                return data[0];
            }
        );
        return res.json("ok");
    }
    if (player === "2") {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/jugador2`);

        const data = roomRef.set(
            {
                status: req.body.status,
                name: req.body.name,
                online: Boolean(req.body.online),
            },
            function () {
                return data[1];
            }
        );
        return res.json("ok");
    }
});

app.post("/rtdbRoomId", function (req, res) {
    const { roomId } = req.body;

    roomsCollection
        .doc(roomId)
        .get()
        .then((doc) => {
            const docu = doc.data();
            if (docu === undefined) {
                throw new Error();
            }
            return res.status(201).json(docu);
        })
        .catch((err) => {
            return res.status(401).send("id no encontrado");
        });
});

app.post("/history", function (req, res) {
    const { rtdbRoomId, player } = req.body;

    if (player === "1") {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/history`);
        const data = roomRef.update({
            player1: req.body.victory,
        });
        return res.json("ok");
    }
    if (player === "2") {
        const roomRef = rtdb.ref(`/rooms/${rtdbRoomId}/history`);
        const data = roomRef.update({
            player2: req.body.victory,
        });
        return res.json("ok");
    }
});

app.use(express.static("dist"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
