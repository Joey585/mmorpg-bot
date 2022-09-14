const {SlashCommandBuilder} = require("discord.js");
const {findPlayerById} = require("../util/findPlayerById")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quest")
        .setDescription("View or start any of your quests"),
    async execute(interaction){
        const player = await findPlayerById(interaction.user.id)
        const questsDone = player.storyPercent / 12.5

    }
}