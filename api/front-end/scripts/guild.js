var socket = io();

function submitDuelEmbed(){
    const title = document.getElementById("duel-embed-title").value;
    const color = document.getElementById("duel-embed-color").value;
    const body = document.getElementById("duel-embed-body").value;
    const errorMessage = document.getElementById("error")

    if(title.length === 0){ return errorMessage.innerHTML = `* You need to have a title!`}
    if(body.length === 0){ return errorMessage.innerHTML = `* You need to have body content!`}

    const embedDataObject = {
        title: title,
        color: color,
        body: body
    }
    socket.emit("duelEmbedChange", (embedDataObject))
}

socket.once("guildData", (data) => {
    const title = document.getElementById("guild-label")
    title.innerHTML = `Settings for ${data.name}`

})