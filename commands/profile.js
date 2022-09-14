const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js");
const {findPlayerById} = require("../util/findPlayerById")
const {beautifyJob} = require("../util/beautifyJob")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("View your profile"),
    async execute(interaction){
        const player = await findPlayerById(interaction.user.id);

        if(player === null){return interaction.reply({content: "I'm sorry you don't have a profile, please do /begin to make one.", ephemeral: true})}

        const profileEmbed = new EmbedBuilder()
            .setTitle("Your profile")
            .setDescription(`Hello, ${player.name} here is your profile!`)
            .addFields(
                {name: "Coins", value: player.coins.toString()},
                {name: "Your name", value: player.name ? "partner" : "No-Name"},
                {name: "Job", value: beautifyJob(player.job)}
            )
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("changename")
                    .setLabel("Change your name")
                    .setStyle(2),
            )

        interaction.reply({embeds: [profileEmbed], components: [row]})
    }
}