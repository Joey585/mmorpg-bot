const {EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js");
const random = require('random-name');

let sheriffName = `Sheriff ${random.first()}`;

function beginStory(name, interaction){
    const beginStory = new EmbedBuilder()
        .setTitle("The beginning of your journey...")
        .setDescription(`${name}, your job as a bounty hunter is going to begin... this quest has 8 parts to it, so get ready!!`)
        .addFields(
            {name: name, value: "Hmm... seems like outta get a job, I'm quite good with my hands and I have been practicing my shooting with my uncle for the past few years. This should be easy. *walks to the sheriff's office0"},
            {name: `${sheriffName}`, value: "You looking to get some high value bounties kid?"},
            {name: name, value: "Yes, feller, I would like to hunt down someone you got..."},
            {name: sheriffName, value: "Sure, you got three choices, " + `${random()}, a serial killer who raped and their victims. ${random()}, a bank robber who robbed around 23k dollars in cash. And finally, ${random()}, an escaped prisoner.`}
        )
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("serial")
                .setLabel("The Serial Killer")
                .setStyle(0),
            new ButtonBuilder()
                .setCustomId("robber")
                .setLabel("The Bank Robber")
                .setStyle(1),
            new ButtonBuilder()
                .setCustomId("prisoner")
                .setLabel("The Escaped Prisoner")
                .setStyle(2)
        )
    interaction.channel.send({embeds: [beginStory], components: [row]})
}