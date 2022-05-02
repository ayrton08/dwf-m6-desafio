import { firestore, rtdb } from "./db";
import * as express from "express";
import * as cors from "cors";
import {nanoid} from "nanoid"
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json())

app.get("/", function (req, res) {
    console.log(req.body)
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
                        messages: [],
                        owner: userId,
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
                roomsCollection.doc(roomId).get().then((snap)=>{
                    const data = snap.data()
                    res.json(data)
                })
            } else {
                res.status(401).json({
                    message: "no existis",
                });
            }
        });
    
});
