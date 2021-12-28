class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.room;
        this.score;
        this.cards = [];
    }
}

module.exports.Player = Player;
