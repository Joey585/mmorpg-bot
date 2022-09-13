function beautifyJob(job){
    switch (job) {
        case "sheriff":
            return "sheriff";
        case "bounty":
            return "bounty hunter";
        case "shop":
            return "shop owner";
        case "outlaw":
            return "outlaw";
    }
}

module.exports = {beautifyJob}