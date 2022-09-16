const {determineGunStats} = require("./inventory");

function denyDuel(interaction, victimPlayer){
    return interaction.channel.send(`${victimPlayer.name} has decided to not accept your duel, tough luck feller!`)
}
function acceptDuel(interaction, victimPlayer, player){
    const percent = Math.floor(Math.random() * 100);

    interaction.channel.send("The duel is about to begin...")

    setTimeout(() => {
        console.log(percent)
            if(percent === 58) {
                // player decimates victim 1% chance
                if(!player.hasGun()) {
                    interaction.channel.send(`${player.name} absolutely strangles ${victimPlayer.name} to death, taking all of his coins! Tough luck, ${victimPlayer.name} you died!`)
                }
                if(player.hasGun()) {
                    interaction.channel.send(`${player.name} whips out his ${determineGunStats(player.inventory.gun)} and absolutely blew ${victimPlayer.name} away, taking all of his coins and killing him!`)
                }
                victimPlayer.kill();
                player.addCoins(victimPlayer.coins);
                player.save();
                victimPlayer.save();
            }
            if(percent <= 23){
                // long lasted fight no victory 23% chance
                if(player.hasGun() && victimPlayer.hasGun()){ interaction.channel.send(`${player.name} and ${victimPlayer.name} both bring out their guns and start firing bullets left and right! Smoke is everywhere and spectators start to gather around. You both end up running out of ammo... and are confused what do. The spectators end up loving the performance so much that they give you both 50 coins!`)}
                else { interaction.channel.send(`${player.name} and ${victimPlayer.name} both get in their fighting stances. They clash with fists and kicks being thrown... but nothing crazy is happening! An audience forms while both of you guys are bloody. You end up being exhausted on the floor with no victory! But the audience loved it so much they gave both of y'all 50 coins!`)}
                victimPlayer.addCoins(50)
                player.addCoins(50)
                player.save();
                victimPlayer.save();
            }
            if(percent >= 24 && percent < 58) {
                // player barely beats victim 34% chance
                if(player.hasGun()) {
                    interaction.channel.send(`${player.name} pulls out his ${determineGunStats(player.inventory.gun)} extremely quickly, faster than ${victimPlayer.name} can react! And ${player.name} shoots them 2 times in the ribs before ${player.name}'s gun jams! ${victimPlayer.name} runs off in the sunset in search of medical treatment... **${player.name}'s gun decreased in durability**`)
                    if(player.damageGun() === "Gun Broke") {
                        interaction.channel.send(`${player.name}, your gun broke!`)
                    }
                } else {
                    interaction.channel.send(`${player.name} jumps at ${victimPlayer.name} before he had any chance to react! Severely beating him on the face giving him 14 bruises (dang)... until the cops stop the fight! And throw ${player.name} off of ${victimPlayer.name}!`)
                }
                player.save();
                victimPlayer.save();
            }
            if(percent === 59) {
                // victim decimates player 1% chance
                if(victimPlayer.hasGun()) {
                    interaction.channel.send(`${victimPlayer.name} pulls out his fresh ${determineGunStats(victimPlayer.inventory.gun)} and absolutely pops ${victimPlayer.name}'s ass and steals all of his coins, killing him the process!`)
                } else {
                    interaction.channel.send(`${victimPlayer.name} finds a rope on the ground and chokes ${player.name} with it for 46 seconds... killing him brutally, and stealing all of his coins!`)
                }
                victimPlayer.addCoins(player.coins);
                player.kill();
                player.save();
                victimPlayer.save();
            }

            if(percent > 59 && percent <= 100){
                if(victimPlayer.hasGun()){
                    interaction.channel.send(`${victimPlayer.name} pulls out his ${determineGunStats(player.inventory.gun)} extremely quickly, faster than ${player.name} can react! And ${victimPlayer.name} shoots them 2 times in the ribs before ${player.name}'s gun jams! ${victimPlayer.name} runs off in the sunset in search of medical treatment... **${victimPlayer.name}'s gun decreased in durability**`)
                    if(victimPlayer.damageGun() === "Gun Broke"){ interaction.channel.send(`${victimPlayer.name}, your gun broke!`)}
                }
                else { interaction.channel.send(`${victimPlayer.name} jumps at ${player.name} before he had any chance to react! Severely beating him on the face giving him 14 bruises (dang)... until the cops stop the fight! And throw ${victimPlayer.name} off of ${player.name}!`)}
                player.save();
                victimPlayer.save();
            }
    }, 3000)
}

module.exports = {denyDuel, acceptDuel}