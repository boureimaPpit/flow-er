const { qi, qv } = require("./quote")

const insert = (context, table, data, model) => {
    const pairs = {}
    for (let key of Object.keys(data)) {
        if (!["instance_id", "creation_time", "creation_user", "update_time", "update_user"].includes(key)) {
            let value = data[key]
            const type = (model.properties[key].type) ? model.properties[key].type : "text"
            if (!value) {
                if (["date", "datetime"].includes(type)) value = "null"
                else if (["int", "float"].includes(type)) value = 0
                else if (["json"].ibcludes(type)) value = "'[]'"
                else value = "''"
            }
            else {
                if (["date", "datetime"].includes(type)) value = `'${value}'`
                else if (type === "json") value = qv(JSON.parse(value))
                else if (type === "text") {
                    const maxLength = (model.properties[key].max_length) ? model.properties[key].max_length : 255
                    value = value.substr(0, maxLength)
                    value = qv(value)
                }
                else if (type === "longtext") value = qv(value)
            }
            pairs[qi(key)] = value
        }
    }
    if (model.properties.creation_time) pairs[qi("creation_time")] = `'${new Date().toISOString().slice(0, 19).replace("T", " ")}'`
    if (model.properties.creation_date) pairs[qi("creation_date")] = `'${new Date().toISOString().slice(0, 10)}'`
    if (model.properties.creation_month) pairs[qi("creation_month")] = `'${new Date().toISOString().slice(0, 7)}'`
    if (model.properties.creation_year) pairs[qi("creation_year")] = `'${new Date().toISOString().slice(0, 4)}'`
    if (model.properties.creation_user) pairs[qi("creation_user")] = context.user.id
    if (model.properties.update_time) pairs[qi("update_time")] = `'${new Date().toISOString().slice(0, 19).replace("T", " ")}'`
    if (model.properties.update_user) pairs[qi("update_user")] = context.user.id
    
    return `INSERT INTO ${table} (${Object.keys(pairs).join(", ")})\n VALUES (${Object.values(pairs).join(", ")})\n`
}

module.exports = {
    insert
}