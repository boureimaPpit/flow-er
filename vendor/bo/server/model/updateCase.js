const { qv } = require("./quote")

const updateCase = (context, table, column, pairs) => {

    const request = []
    request.push(`UPDATE ${table}`)
    request.push(`SET ${column} = CASE`)
    const ids = []
    for (let id of Object.keys(pairs)) {
        let value = pairs[id]
        if (typeof(value) == "string") value = qv(value)
        ids.push(id)
        request.push(`WHEN id = ${id} THEN ${value}`)
    }
    request.push("END,")
    const update_time = `${new Date().toISOString().slice(0, 19).replace("T", " ")}`
    request.push(`update_time = '${update_time}',`)
    const user_id = context.user.id
    request.push(`update_user = ${user_id}`)
    request.push(`WHERE id IN (${ids.join(",")})`)
    return request.join("\n")
}

module.exports = {
    updateCase
}