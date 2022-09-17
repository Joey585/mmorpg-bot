const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const {findPlayerById} = require("../util/findPlayerById");
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Collect your daily reward"),
    async execute(interaction){
        const player = await findPlayerById(interaction.user.id);
        const timeAvailableAt = player.lastCollected + 86400

        const date = moment.unix(timeAvailableAt)

        const dailyReward = new EmbedBuilder()
            .setTitle("Congratulations!")
            .setDescription("You earned your daily reward of **100 coins!**")
            .setColor("#E9D513")
        const timeLeft = new EmbedBuilder()
            .setTitle(`You can collect your reward on ${date.format("MMMM Do, [at] h:mm:ss a")}`)
            .setColor("Random")

        if(player.isAvailableDaily()){
            interaction.reply({embeds: [dailyReward]})
            player.collectedDailyReward()
            player.save();
        } else {
            return interaction.reply({embeds: [timeLeft]})
        }

    }
}