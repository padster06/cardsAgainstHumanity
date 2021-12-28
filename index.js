const express = require("express");
const bodyParser = require("body-parser");

const Room = require("./lib/room").Room;
const Player = require("./lib/player").Player;

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let rooms = [];

app.use("/", express.static("public"));

app.post("/api/join", jsonParser, (req, res) => {
    console.log(req.body);
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id == req.body.roomID) {
            rooms[i].players.push(new Player(req.body.usrName, Date.now()));
            res.send(
                JSON.stringify({
                    roomJoined: true,
                    roomName: rooms[i].name,
                    playerID: rooms[i].players[rooms[i].players.length - 1].id,
                })
            );
        }
    }
});

app.listen(port, () => {
    console.log(`app listening on http://localhost:3000`);
});

rooms.push(new Room("test", 123, "me"));
