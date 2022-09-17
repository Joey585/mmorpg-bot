const {findPlayerById} = require("../util/findPlayerById")
const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Buy things with your precious coins"),
    async execute(interaction){
        const player = await findPlayerById(interaction.user.id)
        if(player === null){
            return interaction.reply({content: "You cannot shop because you don't have a profile! Type /begin to make one!", ephemeral: true})
        }

        const shopEmbed = new EmbedBuilder()
            .setTitle("The Shop!")
            .setDescription("Hello, " + player.name + " You can buy anything here with your coins, earn coins by doing quests, daily rewards, and duels!")
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