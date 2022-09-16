const {guildModel} = require("../schema/guild")

function createGuild(id) {
    const newGuild = new guildModel({
        id: id,
        players: 0,
        deaths: 0,
        duelEmbedData: {
            title: "Duel Summary",
            color: "random",
            body: "{ending}"
        }
    })
}