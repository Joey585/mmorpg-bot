var socket = io();

socket.on("profileInfo", (profile) => {
    const name = document.getElementById("name")
    const coins = document.getElementById("coins")
    const story = document.getElementById("story")
    const job = document.getElementById("job")
    const gun = document.getElementById("gun")

    name.innerHTML = `Name: ${profile.name}`
    coins.innerHTML = `Coins: ${profile.coins}`
    story.innerHTML = `Story Progress: ${profile.storyPercent}%`
    job.innerHTML = `Job: ${profile.job}`
    gun.innerHTML = `Gun: ${profile.inventory.gun}`
})