const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Buy things with your precious coins"),
    execute(interaction){

        const shopEmbed = new EmbedBuilder()
            .setTitle("The Shop!")
            .setDescription("You can buy anything here with your coins, earn coins by doing quests, daily rewards, and duels!")
            .addFields(
                {name: "Revolver", value: "25 coins"},
                {name: "Rifle", value: "50 coins"},
                {name: "Shotgun", value: "100 coins"},
                {name: "Death counter reset", value: "300 coins"}
            )
            .setTimestamp(Date.now())
        const shopSelect = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("shop-select")
                    .setOptions(
                        {
                            label: "Revolver",
                            description: "25 coins",
                            value: "revolver"
                        },
                        {
                            label: "Rifle",
                            description: "50 coins",
                            value: "rifle"
                        },
                        {
                            label: "Shotgun",
                            description: "100 coins",
                            value: "shotgun"
                        },
                        {
                            label: "Death Counter Reset",
                            description: "300 coins",
                            value: "death-counter"
                        }
                    )
            )
        interaction.reply({embeds: [shopEmbed], components: [shopSelect], ephemeral: true})
    }
}