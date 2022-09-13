const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require("discord.js")
const {findPlayerById} = require("../util/findPlayerById")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("begin")
        .setDescription("Start making your character!"),
    async execute(interaction){
        
        if (await findPlayerById(interaction.user.id)){
            return interaction.reply({content: `Excuse me, you already have a profile buddy... if you want to delete your profile, go into the settings and delete it!`, ephemeral: true})
        }

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
    }
}