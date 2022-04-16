const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const cardsRaw = fs.readFileSync("./lib/cards.json");
const cards = JSON.parse(cardsRaw);
console.log(cards.white);

const Room = require("./lib/room").Room;
const Player = require("./lib/player").Player;

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const genID = () => {
  let num = 0;
  for (let i = 0; i < 5; i++) {
    num += Math.floor(Math.random() * 10) * 10 ** i;
  }
  num += 10000;
  if (num > 99999) {
    num -= 10000;
  }
  return num;
};

const assignCards = () => {
  let arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(cards.white[Math.floor(Math.random() * cards.white.length)]);
  }
  console.log(arr);
  return arr;
};

let rooms = [new Room("temp", genID())];
console.log(rooms);
app.use("/", express.static("public"));

app.post("/api/join", jsonParser, (req, res) => {
  console.log(req.body);
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id == req.body.roomID) {
      console.log(true);
      rooms[i].players.push(new Player(req.body.usrName, Date.now()));
      rooms[i].players[rooms[i].players.length - 1].cards = assignCards();
      res.send(
        JSON.stringify({
          roomJoined: true,
          roomName: rooms[i].name,
          playerID: rooms[i].players[rooms[i].players.length - 1].id,
          playerObj: rooms[i].players[rooms[i].players.length - 1],
        })
      );
      console.log(rooms[0].players);
    }
  }
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:3000`);
});

rooms.push(new Room("test", 123, "me"));
