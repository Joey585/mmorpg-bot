const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { clientId, clientSecret } = require("../config.json");
const {getAccessToken, getUserData, getUserGuilds, getGuild} = require("../util/discordAPI");
const bitFieldCalculator = require("discord-bitfield-calculator");
const {findPlayerById} = require("../util/findPlayerById");
const {findGuildById} = require("../util/findGuildById");
const {beautifyJob} = require("../util/beautifyJob");
const inventory = require("../util/inventory");

app.use(express.static("./api/front-end"))

app.get("/callback", async (req, res) => {
    const accessCode = req.query.code
    const tokenData = await getAccessToken(accessCode).catch((e) => {console.log(e)})
    const userData = await getUserData(tokenData).catch((e) => {console.log(e)})
    const guildDataRaw = await getUserGuilds(tokenData).catch((e) => {console.log(e)})

    let guildData = []
    guildDataRaw.forEach((guild) => {
        const permissions = bitFieldCalculator.permissions(guild.permissions);
        if(permissions.includes("ADMINISTRATOR")){
            guildData.push(guild)
        }
    })
    res.redirect("/pages/dashboard.html")
    io.on("connection", (socket) => {
        socket.emit("auth", {
            user: userData,
            guilds: guildData
        })
    })
})

app.get("/", (req, res) => {
    res.sendFile("/pages/home.html", { root: "./api/front-end"})
})

app.get("/profile", async (req, res) => {
    const userId = req.query.id;
    let profileData;

    const player = await findPlayerById(userId)

    if(player === null){
        return res.send("You don't have a profile! Create one with the discord bot using /begin")
    } else {
        profileData = {
            name: player.name,
            coins: player.coins,
            storyPercent: player.storyPercent,
            job: beautifyJob(player.job),
            inventory: {
                gun: inventory.determineGunStats(player.inventory.gun)
            }
        }
        res.redirect("/pages/profile.html")
        io.on("connection", (socket) => { socket.emit("profileInfo", profileData) })
    }
})

app.get("/guild", async (req, res) => {
    const guildID = req.query.id;

    const guildData = await getGuild(guildID).catch((e) => {
        if(e.response.status === 403){
            return res.send("You need to add the bot to this server!")
        }
    })

    res.redirect("/pages/guild.html")
    io.on("connection", (socket) => {
        socket.emit("guildData", (guildData));

        socket.on("duelEmbedChange", async (embedData) => {
            const guild = await findGuildById(guildID)
            guild.addDuelEmbedData(embedData)
        })
    })
})

server.listen(3000, () => {console.log("API is listening on port 3000!")})