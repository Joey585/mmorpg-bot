const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType} = require("discord.js");
const random = require('random-name');

let sheriffName = `Sheriff ${random.first()}`;

function beginStory(player, interaction){
    const beginStory = new EmbedBuilder()
        .setTitle("The beginning of your journey...")
        .setDescription(`${player.name}, your job as a bounty hunter is going to begin... this quest has 8 parts to it, so get ready!!`)
        .addFields(
            {name: player.name, value: "Hmm... seems like outta get a job, I'm quite good with my hands and I have been practicing my shooting with my uncle for the past few years. This should be easy. *walks to the sheriff's office*"},
            {name: `${sheriffName}`, value: "You looking to get some high value bounties kid?"},
            {name: player.name, value: "Yes, feller, I would like to hunt down someone you got..."},
            {name: sheriffName, value: "Sure, you got three choices, " + `${random()}, a serial killer who raped and killed their victims. ${random()}, a bank robber who robbed around 23k dollars in cash. And finally, ${random()}, an escaped prisoner.`}
        )
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("serial")
                .setLabel("The Serial Killer")
                .setStyle(4),
            new ButtonBuilder()
                .setCustomId("robber")
                .setLabel("The Bank Robber")
                .setStyle(2),
            new ButtonBuilder()
                .setCustomId("prisoner")
                .setLabel("The Escaped Prisoner")
                .setStyle(3)
        )
    interaction.message.edit({embeds: [beginStory], components: [row]})
        .then(m => {
            m.createMessageComponentCollector({
            componentType: ComponentType.Button, time: 30000
        }).on("collect", (i) => {

            if(i.user.id !== player.id) { return;}
            i.deferUpdate()
            let result;
            let beginning;
            const percent = Math.floor(Math.random() * 100)
            const choice = i.customId
            switch (choice) {
                case "serial":
                    beginning = "You have chosen to hunt down the serial killer, it will be a tough task, but you begin your journey... 12 hours later, you arrive to the killer... "
                    if(percent <= 12) {
                        result = "You surprise him, and choke him out with a rope! He squirms around for 3 minutes and then dies an awful death... you pick up his things and get a **brand-new revolver!**"
                        player.giveGun("000 000")
                        player.save();
                    }
                    if(percent >= 13 && percent <= 62) {
                        result = "You arrive and he hears your footsteps... you manage to jump on him before he pulls out his revolver. A fight ensues and in the midst of the fight, you grab his wallet! You run away with the wallet **+100 coins!**"
                        player.addCoins(100);
                        player.save();
                    }
                    if(percent >= 63) {
                        result = "You arrive but step on a stick... he pulls out his gun and decimates you! You died and **lost all your coins...**"
                        player.kill()
                        player.save();
                    }

                    player.completedQuest();
                    break;
                case "robber":
                    beginning = "You have decided to go for the bank robber, quite ballsy as they are very unpredictable. Sources tell you that he is lying low in the small town of Cumberland, Maryland. *You make your way there*"
                    if(percent < 50){
                        result = "You find the bank robber at a saloon, he's drinking Famous Joey's whiskey. You approach him and say, \"You're the robber! You're the guy!\"\n\"Keep.. your voice down you clown... yes, I am the robber that took 23k dollars. It was easy.\"\n\"I've come for your head feller...\"\n\"I'll tell you what, I'll give you 50 coins if you keep your mouth shut... the bounty for me is only 20! What do you say?\"\n\"Sure!\"\n\n**You made 50 coins**"
                        player.addCoins(50);
                        player.save();
                    }
                    if(percent >= 50){
                        result = "You find the bank robber at a saloon, he's drinking Famous Joey's whiskey. You approach him and stab him 5 times in the back. **You made 20 coins**"
                        player.addCoins(20);
                        player.save();
                    }
                    player.completedQuest();
                    break;
            }
                const ending = beginning.concat(result)
                const summaryEmbed = new EmbedBuilder()
                    .setTitle("Results")
                    .setDescription(ending)
                return i.channel.send({ embeds: [summaryEmbed]})
        })
    })
}


module.exports = {beginStory}
