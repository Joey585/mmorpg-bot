function bin_to_dec(bstr) {
    return parseInt((bstr + '')
        .replace(/[^01]/gi, ''), 2);
}

function determineGunStats(int){
    const bits = int.split(" ")

    let typeStr = ""
    let durabilityStr = ""

    if(int === 0){return "No gun"}

    const durabilityRaw = bits[0].toString()
    const durability = bin_to_dec(durabilityRaw)
    switch (durability){
        case 0:
            durabilityStr = "new";
            break;
        case 1:
            durabilityStr = "scratched"
            break;
        case 2:
            durabilityStr = "dented"
            break;
        case 3:
            durabilityStr = "broken"
            break;
    }

    const typeRaw = bits[1].toString()
    const type = bin_to_dec(typeRaw)
    switch (type){
        case 0:
            typeStr = "revolver"
            break;
        case 1:
            typeStr = "rifle"
            break;
        case 2:
            typeStr = "shotgun"
    }

    return `${durabilityStr} ${typeStr}`
}

module.exports = {determineGunStats}