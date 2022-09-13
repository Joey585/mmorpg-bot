const {playerModel} = require("../schema/player")

const findPlayerById =(id) => new Promise((resolve, reject) => {
    playerModel.findOne({id: id}).then((r) => {
        resolve(r)
    }).catch((e) => {
        reject(e)
    })
})

module.exports = {findPlayerById}