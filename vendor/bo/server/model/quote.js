
const qi = (name) => {
    let result = "`"
    let j = 1
    for (let i = 0; i < name.length; i++) {
        if (name[i] == "`") {
            result += "`"
        }
        result += name[i]
    }
    result += "`"
    return result
}

const qv = (value) => {
    let result = "'"
    let j = 1
    for (let i = 0; i < value.length; i++) {
        if (value[i] == "'") {
            result += "\\"
        }
        result += value[i]
    }
    result += "'"
    return result
}

module.exports = {
    qi,
    qv
}