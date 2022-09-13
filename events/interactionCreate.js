const { createPlayer } = require("../util/createPlayer")
const {ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require("discord.js");
const {findPlayerById} = require("../util/findPlayerById")

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
            interaction.message.delete()
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


    }

}