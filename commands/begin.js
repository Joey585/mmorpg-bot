const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("begin")
        .setDescription("Start making your character!"),
    async execute(interaction){
        interaction.reply("yes")
    }
}