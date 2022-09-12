const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require("discord.js")
const mongoose = require("mongoose");
const {Player} = require("../player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("begin")
        .setDescription("Start making your character!"),
    async execute(interaction){
        const welcomeEmbed = new EmbedBuilder()
            .setTitle("Welcome!")
            .setDescription("Welcome to the Wild West bot, the bot that will *immerse* you in a chat based, wild west game. This bot includes Daily and hourly quests, story missions, leveling up, companions, duels, and many more!")
            .addFields({
                name: "To start:", value: "Please select a class!"
            })
        const classPick = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("class-select")
                    .setPlaceholder("Select your class!")
                    .addOptions(
                        {
                            label: "Outlaw",
                            description: "You run from the law, fighting other gangs, doing heists!",
                            value: "outlaw"
                        },
                        {
                            label: "Bounty Hunter",
                            description: "Make money by killing high value targets, you're alone doing it",
                            value: "bounty"
                        },
                        {
                            label: "Shop Owner",
                            description: "You're living the average life, running a corner store, living off capitalism",
                            value: "shop"
                        },
                        {
                            label: "Sheriff",
                            description: "You are the local sheriff, enforcing laws and being kind to civilians",
                            value: "sheriff"
                        }
                    )
            )

        interaction.reply({embeds: [welcomeEmbed], components: [classPick]})

        const playerSchema = mongoose.Schema({
            player: Player
        })
        const playerModel = mongoose.model("player", playerSchema)

        function createPlayer(job, user){
            const player = new playerModel({ player: new Player(job, user)})
            interaction.edit("You have now entered the unknown wild west as a " + job ? "shop" : "shop owner" ? "bounty" : "bounty hunter" + "...")
            player.save();
        }

        module.exports = {createPlayer, playerModel}

    }
}