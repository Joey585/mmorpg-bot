const {SlashCommandBuilder, Embed, EmbedBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("View all of the commands this bot has!"),
    execute(interaction){

        const helpEmbed = new EmbedBuilder()
            .setTitle("Available Commands")
            .setColor("Random")
            .setDescription(
                "</begin:0> - Create your profile\n" +
                "</duel:0> - Duel someone\n" +
                "</daily:0> - Collect your daily reward\n" +
                "</inventory:0> - View your inventory\n" +
                "</profile:0> - View your profile\n" +
                "</quest:0> - View and complete quests (only 1 for bounty hunter atm)\n" +
                "</shop:0> - Buy things!"
            )

        interaction.reply({embeds: [helpEmbed]})

    }
}