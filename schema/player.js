const mongoose = require("mongoose");
const inventory = require("../util/inventory")

const player = new mongoose.Schema({
    id: String,
    name: String,
    coins: Number,
    storyPercent: Number,
    job: String,
    deaths: Number,
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
    },
    giveGun: function (binary){
        this.inventory.gun = binary.toString();
    },
    upgradeGunType: function (){
        const gunBin = this.inventory.gun.split(" ")
        let old = inventory.bin_to_dec(gunBin[1])
        if(old === inventory.maxType){ return "Gun is already at the max!"}
        old++
        this.inventory.gun = `${gunBin[0]} ${old.toString(2)}`
    },
    hasGun: function (){
        if(this.inventory.gun === "0"){ return true}
    },
    kill: function (){
        this.coins = 0;
        this.deaths += 1
    },
    completedQuest: function (){
        this.storyPercent += 12.5
    }
})

const playerModel = mongoose.model("Player", player);
module.exports = {playerModel}
