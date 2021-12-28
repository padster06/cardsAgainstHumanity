class Room {
    constructor(name, id, leader) {
        this.players = [];
        this.name = name;
        this.id = id;
        this.leader = leader;
    }
}

module.exports.Room = Room;
