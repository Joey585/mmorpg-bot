const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const inventory = require("../util/inventory")
const {findPlayerById} = require("../util/findPlayerById")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("View your inventory"),
    async execute(interaction){
        const player = await findPlayerById(interaction.user.id)
        const inventoryEmbed = new EmbedBuilder()
            .setTitle("Your inventory")
            .setFields(
                {name: "Your gun", value: inventory.determineGunStats(player.inventory.gun)}
            )
    }
}