const mongoose = require("mongoose");
const player = new mongoose.Schema({
    id: String,
    name: String,
    coins: Number,
    storyPercent: Number,
    job: String,
    inventory: {
        gun: String,
        food: String,
        horse: String
    }
})

player.method({
    addCoins: function (amount, override){
        if(override){
            this.coins = amount
        }
        this.coins += amount
    },
    changeName: function (name){
        this.name = name;
    }
})

const playerModel = mongoose.model("Player", player);
module.exports = {playerModel}
