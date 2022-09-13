const {SlashCommandBuilder} = require("discord.js");
const e = require("../util/inventory")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("View your inventory"),
    async execute(interaction){
        interaction.reply()
    }
}