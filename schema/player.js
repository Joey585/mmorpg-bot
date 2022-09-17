const mongoose = require("mongoose");
const inventory = require("../util/inventory")

const player = new mongoose.Schema({
    id: String,
    name: String,
    coins: Number,
    storyPercent: Number,
    job: String,
    deaths: Number,
    lastCollected: Number,
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
        return this.inventory.gun !== "0";
    },
    kill: function (){
        this.coins = 0;
        this.deaths += 1
    },
    completedQuest: function (){
        this.storyPercent += 12.5
    },
    damageGun: function (){
        const gunBin = this.inventory.gun.split(" ")
        let old = inventory.bin_to_dec(gunBin[0])
        if(old === inventory.maxDur){ return "Gun Broke"}
        old++
        this.inventory.gun = `${old.toString(2)} ${gunBin[1]}`
    },
    resetDeaths: function (){
        this.deaths = 0;
    },
    removeCoins: function (amount){
        this.coins -= amount
    },
    isAvailableDaily: function (){
        const availableAt = this.lastCollected + 86400

        if(this.lastCollected === 0){
            return true;
        }
        return this.lastCollected >= availableAt;
    },
    collectedDailyReward: function (){
        this.addCoins(100)
        this.lastCollected = Math.round(Date.now() / 1000)
    }
})

const playerModel = mongoose.model("Player", player);
module.exports = {playerModel}
