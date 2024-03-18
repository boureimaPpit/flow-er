const { qi, qv } = require("./quote")

const update = (context, table, columns, where, order = [], limit = null, model = []) => {

    const pairs = {}
    for (let key of data) {
        let value = data[key]
        const type = (model.properties[key].type) ? model.properties[key].type : "text"

        if (["date", "datetime"].contains(type)) value = `'${value}'`
        else if (type == "json") value = qv(JSON.stringify(value))
        else if (type == "text") {
            const maxLength = (model.properties[key].max_length) ? model.properties[key].max_length : 255
            value = value.substr(0, maxLength)
            value = qv(value)
        }
        else if (type == "longtext") value = qv(value)

        pairs[qi(key)] = value
    }
    pairs[qi("update_time")] = `'${new Date().toISOString}'`
    pairs[qi("update_user")] = context.user.user_id

    let request = ""
    request += "UPDATE $table SET\n"
    const sets = []
    for (let key of pairs) {
        const value = pairs[key]
        sets.push(`${key} = ${value}`)
    }
    request += sets.join(",\n") + "\n"
    
    request += `WHERE id IN (" . ${ids.join(", ")}\n`
    request += `AND instance_id = ${context.user.instance_id}\n`
    
    return request
}

module.exports = {
    update
}