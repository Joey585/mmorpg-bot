const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { clientId, clientSecret } = require("../config.json");
const {getAccessToken, getUserData, getUserGuilds} = require("../util/discordAPI");
const bitFieldCalculator = require("discord-bitfield-calculator");

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

server.listen(3000, () => {console.log("API is listening on port 3000!")})