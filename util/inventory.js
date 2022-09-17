function bin_to_dec(bstr) {
    return parseInt((bstr + '')
        .replace(/[^01]/gi, ''), 2);
}

function determineGunStats(binary){

    if(binary === "0"){return "No gun"}

    const bits = binary.split(" ")

    let typeStr = ""
    let durabilityStr = ""

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

    return {
        durability: durabilityStr,
        type: typeStr
    }
}

module.exports = {determineGunStats, bin_to_dec, maxType: 2, maxDur: 3}