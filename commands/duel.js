const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType} = require("discord.js");
const {findPlayerById} = require("../util/findPlayerById")
const {findGuildById} = require("../util/findGuildById");
const {determineGunStats} = require("../util/inventory");
const {acceptDuel, denyDuel } = require("../util/duelFunctions")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("duel")
        .setDescription("Duel another person")
        .addUserOption(option =>
            option.setName("person")
                .setDescription("Person to duel")
                .setRequired(true)
        ),
    async execute(interaction) {
        const victim = interaction.options.getUser("person");
        const victimPlayer = await findPlayerById(victim.id);
        const player = await findPlayerById(interaction.user.id)

        if(player === null) {
            return interaction.reply({
                content: "You cannot duel because you don't have a profile! Type /begin to make one!",
                ephemeral: true
            })
        }
        if(victimPlayer === null) {
            return interaction.reply({
                content: `${victim.username} does not have a profile, you cannot duel them!`,
                ephemeral: true
            })
        }
        if(interaction.user.id === victim.id){ return interaction.reply({content: "You cannot duel yourself!", ephemeral: true})}

        const duelEmbed = new EmbedBuilder()
            .setTitle("Duel started!")
            .setDescription(`${victimPlayer.name}, do you accept this duel created by ${player.name}?`)
        const acceptRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Yes")
                    .setCustomId("accept")
                    .setStyle(3),
                new ButtonBuilder()
                    .setLabel("No")
                    .setCustomId("decline")
                    .setStyle(4)
            )
        interaction.reply({components: [acceptRow], embeds: [duelEmbed], content: `<@${victim.id}>`}).then((m) => {
            m.createMessageComponentCollector({
                componentType: ComponentType.Button, time: 30000
            }).on("collect", async (i) => {
                if(i.customId === "accept") {
                    if(i.user.id !== victimPlayer.id) {
                        return i.reply({content: "You can't click that feller!", ephemeral: true})
                    }
                    const ending = await acceptDuel(interaction, victimPlayer, player)
                    const guildData = await findGuildById(interaction.guild.id)

                    const title = guildData.duelEmbedData.title
                    let titleFinal;
                    titleFinal = title.replaceAll("{player}", player.name).replaceAll("{victim}", victimPlayer.name)

                    const body = guildData.duelEmbedData.body
                    let bodyFinal;
                    bodyFinal = body.replaceAll("{ending}", ending).replaceAll("{victim}", victimPlayer.name).replaceAll("{player}", player.name)

                    const endingEmbed = new EmbedBuilder()
                        .setTitle(titleFinal)
                        .setDescription(bodyFinal)
                        .setColor(guildData.duelEmbedData.color)
                    interaction.channel.send({embeds: [endingEmbed]})
                }
                if(i.customId === "decline") {
                    if(i.user.id !== victimPlayer.id) {
                        return i.reply({content: "You can't click that feller!", ephemeral: true})
                    }
                    denyDuel(interaction, victimPlayer, player)
                }

            })
        })
    }
}