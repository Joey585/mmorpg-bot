const {playerModel} = require("../schema/player")

function createPlayer(job, interaction){
    const newPlayer = new playerModel({
        id: interaction.user.id,
        name: "Partner",
        coins: 0,
        storyPercent: 0,
        job: job,
        deaths: 0,
        inventory: {
            gun: "0",
            horse: 0,
            food: 0
        }
    })
    newPlayer.save();
    return newPlayer
}

module.exports = { createPlayer }
