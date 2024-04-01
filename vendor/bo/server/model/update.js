const { qi, qv } = require("./quote")

const update = (context, table, ids, data, model = []) => {
    const pairs = {}
    for (let key of Object.keys(data)) {
        if (!["instance_id", "creation_time", "creation_user", "update_time", "update_user"].includes(key)) {
            let value = data[key]
            const type = (model.properties[key].type) ? model.properties[key].type : "text"
    
            if (["date", "datetime"].includes(type)) value = `'${value}'`
            else if (type == "json") value = qv(JSON.stringify(value))
            else if (type == "text") {
                const maxLength = (model.properties[key].max_length) ? model.properties[key].max_length : 255
                value = value.substr(0, maxLength)
                value = qv(value)
            }
            else if (type == "longtext") value = qv(value)
    
            pairs[qi(key)] = value    
        }
    }

    if (model.properties.update_time) pairs[qi("update_time")] = `'${new Date().toISOString().slice(0, 19).replace("T", " ")}'`
    if (model.properties.update_users) pairs[qi("update_user")] = context.user.id

    let request = ""
    request += `UPDATE ${table} SET\n`
    const sets = []
    for (let key of Object.keys(pairs)) {
        const value = pairs[key]
        sets.push(`${key} = ${value}`)
    }
    request += sets.join(",\n") + "\n"
    
    request += `WHERE id IN (${ids.join(", ")})\n`
    if (model.properties.instance_id) request += `AND instance_id = ${context.user.instance_id}\n`
    
    return request
}

module.exports = {
    update
}