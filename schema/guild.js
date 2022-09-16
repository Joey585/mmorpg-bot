const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    id: String,
    players: Number,
    deaths: Number,
    duelEmbedData: {
        title: String,
        color: String,
        body: String
    }
});

guildSchema.method({
    addDuelEmbedData: function (embedDataObj){
        this.duelEmbedData.title = embedDataObj.title;
        this.duelEmbedData.color = embedDataObj.color;
        this.duelEmbedData.body = embedDataObj.body;
    }
})

const guildModel = new mongoose.model("Guild", guildSchema);
module.exports = {guildModel}