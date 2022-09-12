const {mongoose} = require("mongoose");

class Player {
    constructor(profession, discordUser) {
        this.user = discordUser;
        this.job = profession;
        this.storyPercent = 0;
        this.coins = 0;
        this.town = "";
    }

    get userObject() {
        return this.user;
    }

    get currentJob() {
        return this.job;
    }

    get storyProgress() {
        return this.storyPercent
    }
}

module.exports = {Player}

