"use strict";
exports.__esModule = true;
var db_1 = require("./db");
var express = require("express");
var cors = require("cors");
var nanoid_1 = require("nanoid");
var PORT = process.env.PORT || 3000;
var app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, function () {
    console.log("Todo funcionando en el puerto " + PORT);
});
var userCollection = db_1.firestore.collection("users");
var roomsCollection = db_1.firestore.collection("rooms");
app.post("/signup", function (req, res) {
    var nameReq = req.body.name;
    userCollection
        .where("fullName", "==", nameReq)
        .get()
        .then(function (search) {
        if (search.empty) {
            userCollection
                .add({
                nameReq: nameReq
            })
                .then(function (newUserRef) {
                res.json({
                    id: newUserRef.id,
                    "new": true
                });
            });
        }
        else {
            res.status(400).json({
                message: "user already exists"
            });
        }
    });
});
app.post("/rooms", function (req, res) {
    var userId = req.body.userId;
    userCollection
        .doc(userId.toString())
        .get()
        .then(function (doc) {
        if (doc.exists) {
            var roomRef_1 = db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)());
            roomRef_1
                .set({
                jugador1: userId
            })
                .then(function () {
                var roomLongId = roomRef_1.key;
                var roomId = 1000 + Math.floor(Math.random() * 999);
                roomsCollection
                    .doc(roomId.toString())
                    .set({
                    rtdbRoomId: roomLongId
                })
                    .then(function () {
                    res.json({
                        id: roomId.toString()
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "no existis"
            });
        }
    });
});
app.get("/room/:roomId", function (req, res) {
    var userId = req.query.userId;
    var roomId = req.params.roomId;
    userCollection
        .doc(userId.toString())
        .get()
        .then(function (doc) {
        if (doc.exists) {
            roomsCollection
                .doc(roomId)
                .get()
                .then(function (snap) {
                var data = snap.data();
                return res.json(data);
            });
        }
        else {
            return res.status(401).json({
                message: "no existis"
            });
        }
    });
});
app.post("/jugadas", function (req, res) {
    var _a = req.body, rtdbRoomId = _a.rtdbRoomId, player = _a.player;
    if (player == 1) {
        var roomRef = db_1.rtdb.ref("/rooms/".concat(rtdbRoomId, "/jugador1"));
        roomRef.update({
            status: Boolean(req.body.status),
            online: Boolean(req.body.online),
            fullName: req.body.name
        });
        return res.json();
    }
    if (player == 2) {
        var roomRef = db_1.rtdb.ref("/rooms/".concat(rtdbRoomId, "/jugador2"));
        roomRef.update({
            status: Boolean(req.body.status),
            online: Boolean(req.body.online),
            fullName: req.body.name
        });
        return res.json();
    }
});
app.post("/play", function (req, res) {
    var _a = req.body, rtdbRoomId = _a.rtdbRoomId, player = _a.player;
    if (player == 1) {
        var roomRef = db_1.rtdb.ref("/rooms/".concat(rtdbRoomId, "/jugador1"));
        var data_1 = roomRef.update({
            choise: req.body.choise,
            name: req.body.name
        }, function () {
            return data_1[0];
        });
        return res.json("ok");
    }
    if (player == 2) {
        var roomRef = db_1.rtdb.ref("/rooms/".concat(rtdbRoomId, "/jugador2"));
        var data_2 = roomRef.update({
            choise: req.body.choise,
            name: req.body.name
        }, function () {
            return data_2[1];
        });
        return res.json("ok");
    }
});
app.post("/cleanPlay", function (req, res) {
    var _a = req.body, rtdbRoomId = _a.rtdbRoomId, player = _a.player;
    if (player === 1) {
        var roomRef = db_1.rtdb.ref("/rooms/".concat(rtdbRoomId, "/jugador1"));
        var data_3 = roomRef.set({
            status: req.body.status,
            name: req.body.name,
            online: Boolean(req.body.online)
        }, function () {
            return data_3[0];
        });
        return res.json("ok");
    }
    if (player === 2) {
        var roomRef = db_1.rtdb.ref("/rooms/".concat(rtdbRoomId, "/jugador2"));
        var data_4 = roomRef.set({
            status: req.body.status,
            name: req.body.name,
            online: Boolean(req.body.online)
        }, function () {
            return data_4[1];
        });
        return res.json("ok");
    }
});
app.post("/rtdbRoomId", function (req, res) {
    var roomId = req.body.roomId;
    roomsCollection
        .doc(roomId)
        .get()
        .then(function (doc) {
        var docu = doc.data();
        console.log("doc", doc);
        if (docu === undefined) {
            console.log("si al if del then");
            throw new Error();
        }
        return res.status(201).json(docu);
    })["catch"](function (err) {
        console.log("si entre al catch");
        return res.status(401).send("id no encontrado");
    });
});
app.post("/history", function (req, res) {
    var _a = req.body, rtdbRoomId = _a.rtdbRoomId, player = _a.player;
    if (player === "1") {
        var roomRef = db_1.rtdb.ref("/rooms/".concat(rtdbRoomId, "/history"));
        var data = roomRef.update({
            player1: req.body.victory
        });
        return res.json("ok");
    }
    if (player === "2") {
        var roomRef = db_1.rtdb.ref("/rooms/".concat(rtdbRoomId, "/history"));
        var data = roomRef.update({
            player2: req.body.victory
        });
        return res.json("ok");
    }
});
app.use(express.static("dist"));
app.get("*", function (req, res) {
    res.sendFile(__dirname + "./dist/index.html");
});
