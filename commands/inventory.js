const {SlashCommandBuilder} = require("discord.js");
const inventory = require("../util/inventory")
const {findPlayerById} = require("../util/findPlayerById")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("View your inventory"),
    async execute(interaction){
        const player = await findPlayerById(interaction.user.id)
        interaction.reply(inventory.determineGunStats(player.inventory.gun))
    }
}