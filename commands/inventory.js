const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const inventory = require("../util/inventory")
const {findPlayerById} = require("../util/findPlayerById")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("View your inventory"),
    async execute(interaction){
        const player = await findPlayerById(interaction.user.id);
        const gunData = inventory.determineGunStats(player.inventory.gun)
        let gun;
        if(gunData === "No gun"){
            gun = "No Gun"
        } else {
            gun = `${gunData.durability} ${gunData.type}`
        }


        const inventoryEmbed = new EmbedBuilder()
            .setTitle("Your inventory")
            .setFields(
                {name: "Your gun", value: `${gun}`}
            )
            .setColor("Random")
        return interaction.reply({ embeds: [inventoryEmbed], ephemeral: true})
    }
}