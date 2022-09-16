const {guildModel} = require("../schema/guild")

const findGuildById = (id) => new Promise((resolve, reject) => {
    guildModel.findOne({ id: id}).then((doc) => {
        resolve(doc)
    }).catch((e) => {
        reject(e)
    })
})

module.exports = {findGuildById}