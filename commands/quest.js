const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js");
const {findPlayerById} = require("../util/findPlayerById")
const {beautifyJob} = require("../util/beautifyJob")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quest")
        .setDescription("View or start any of your quests"),
    async execute(interaction){
        const player = await findPlayerById(interaction.user.id)

        if(player === null){return interaction.reply({content: "I'm sorry you don't have a profile, please do /begin to make one.", ephemeral: true})}

        const questsDone = player.storyPercent / 12.5

        const questEmbed = new EmbedBuilder()
            .setTitle("Your quests as a " + beautifyJob(player.job))
            .setDescription(`You have completed **${questsDone}** quests which makes you ${player.storyPercent}% done with the game`)
            .setColor("Random")

        const continueRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("continue")
                    .setLabel("Launch Quest?")
                    .setStyle(3)
            )
        interaction.reply({embeds: [questEmbed], components: [continueRow]})
    }
}