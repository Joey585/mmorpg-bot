const createPlayer = require("../commands/begin")

module.exports = {
    name: "interactionCreate",
    once: false,
    execute(interaction){
        if(!interaction.isSelectMenu()) return;

        if(interaction.customId === "class-select"){
            let profession;
            switch (interaction.values.join()){
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
            createPlayer(profession, interaction.user)
        }
    }

}