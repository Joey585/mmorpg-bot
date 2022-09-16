const axios = require("axios")
const {clientId, clientSecret, token} = require("../config.json");

const getAccessToken = (code) => new Promise((resolve, reject) => {
    let data = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback&scope=identity`;
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    axios.post('https://discord.com/api/oauth2/token', data, {
        headers: {
            headers
        }
    }).then((r) => {
        resolve(r.data)
    }).catch(() => {
        reject("Unable to get access token!")
    })
});

const getUserData = (tokenData) => new Promise((resolve, reject) =>{
    axios.get("https://discord.com/api/users/@me", {
        headers: {
            authorization: `Bearer ${tokenData.access_token}`,

        }
    }).then((data) => { resolve(data.data)}).catch((e) => reject(e))
})

const getUserGuilds = (tokenData) => new Promise((resolve, reject) => {
    axios.get("https://discord.com/api/users/@me/guilds", {
        headers: {
            authorization: `Bearer ${tokenData.access_token}`
        }
    }).then((data) => { resolve(data.data)}).catch((e) => console.log(e))
})

const getGuild = (guildID) => new Promise((resolve, reject) => {
    axios.get(`https://discord.com/api/guilds/${guildID}`, {
        headers: {
            authorization: `Bot ${token}`
        }
    }).then((data) => { resolve(data.data)}).catch((e) => reject(e))
})


module.exports = {getAccessToken, getUserData, getUserGuilds, getGuild}