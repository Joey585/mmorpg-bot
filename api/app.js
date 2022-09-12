const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { clientId, clientSecret } = require("../config.json");
const {getAccessToken} = require("../util/discordAPI");

app.get("/callback", async (req, res) => {
    const accessCode = req.query.code
    const tokenData = await getAccessToken(accessCode).catch((e) => {console.log(e)})
    
})

app.get("/", (req, res) => {
    res.redirect("https://discord.com/api/oauth2/authorize?client_id=1018961991198572586&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=identify%20guilds")
})

server.listen(3000, () => {console.log("API is listening on port 3000!")})