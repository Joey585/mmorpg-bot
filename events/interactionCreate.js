const { createPlayer } = require("../util/createPlayer")
const {ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js");
const {findPlayerById} = require("../util/findPlayerById")
const bountyQuests = require("../quests/bounty")


module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if(interaction.customId === "class-select") {
            let profession;
            switch (interaction.values.join()) {
                case "sheriff":
                    profession = "sheriff";
                    break;
                case "bounty":
                    profession = "bounty";
                    break;
                case "shop":
                    profession = "shop";
                    break;
                case "outlaw":
                    profession = "outlaw";
                    break;
            }
            const newPlayer = await createPlayer(profession, interaction)
            interaction.reply({ content: `Congratulations ${newPlayer.name}, you have created your account! Now type /profile to view the next things you can do!`, ephemeral: true})
        }
        if(interaction.customId === "changename"){
            const modal = new ModalBuilder()
                .setTitle("Change your name!")
                .setCustomId("name")

            const nameInput = new TextInputBuilder()
                .setCustomId("nameValue")
                .setLabel("What do you want your new name to be?")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
            const actionRow = new ActionRowBuilder().addComponents(nameInput)
            modal.addComponents(actionRow)

            await interaction.showModal(modal)
        }
        if (interaction.customId === 'name') {
            const newName = interaction.fields.getTextInputValue("nameValue");
            const player = await findPlayerById(interaction.user.id)
            player.changeName(newName)
            player.save();
            await interaction.reply({content: `Congrats! Your name has been changed to ${newName}`, ephemeral: true})
        }
        if(interaction.customId === "continue"){
            const player = await findPlayerById(interaction.user.id);
            if(player.job === "bounty"){
                switch (player.storyPercent / 12.5){
                    case 0:
                        bountyQuests.beginStory(player, interaction)
                        interaction.deferUpdate()
                        break;
                    default:
                        interaction.reply({content: "Seems like you don't have any more quests to do :(", ephemeral: true})
                }
            }


        }

        if(interaction.customId === "shop-select"){
            const item = interaction.values.join();
            const player = await findPlayerById(interaction.user.id)

            switch (item){
                case "revolver":
                    if(player.coins < 25){ return interaction.reply({content: "You don't have enough!", ephemeral: true})}
                    player.removeCoins(25)
                    player.giveGun("000 000")
                    player.save();
                    break;
                case "rifle":
                    if(player.coins < 50){ return interaction.reply({content: "You don't have enough!", ephemeral: true})}
                    player.removeCoins(50)
                    player.giveGun("000 001")
                    player.save();
                    break;
                case "shotgun":
                    if(player.coins < 100){ return interaction.reply({content: "You don't have enough!", ephemeral: true})}
                    player.removeCoins(100)
                    player.giveGun("000 010")
                    player.save();
                    break;
                case "death-counter":
                    if(player.coins < 300){ return interaction.reply({content: "You don't have enough!", ephemeral: true})}
                    player.removeCoins(300)
                    player.resetDeaths();
                    player.save();
                    break;
            }

            return interaction.reply({content: "Purchase made!", ephemeral: true})

        }

    }

}