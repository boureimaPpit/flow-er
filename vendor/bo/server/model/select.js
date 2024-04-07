const { qi, qv } = require("./quote")
const { join } = require("./join")

const select = (context, table, columns, where, order = [], limit = null, model = []) => {

    if (!columns) {
        columns = []
        for (let propertyId of Object.keys(model.properties)) {
            const property = model.properties[propertyId]
            if (property.entity == table) columns.push(propertyId)
        }
    }

    const joins = join(table, columns, where, order, model)

    const qTable = qi(table)

    const columnDict = {}
    for (let propertyId of columns) {
        if (model.properties[propertyId] && (!model.properties[propertyId].type || model.properties[propertyId].type != "virtual")) {
            const property = model.properties[propertyId]
            const entityId = property.entity
            const qPropertyId = qi(propertyId)
            const qEntity = qi(entityId)
            const qColumn = qi(property.column)
            if (entityId == table) columnDict[qPropertyId] = `${qTable}.${qPropertyId}`
            else columnDict[qPropertyId] = `${qEntity}.${qColumn}`
        }
    }

    const instanceId = 1

    const select = []
    for (let propertyId of Object.keys(columnDict)) {
        const column = columnDict[propertyId]
        select.push(`${column} AS ${propertyId}`)
    }

    let request = `SELECT ${select.join(", ")} FROM ${table}\n`

    request += `${Object.values(joins).join("\n")}\n`

    const predicates = []
    if (model.properties.status) predicates.push(`${qTable}.${qi("status")} != 'deleted'\n`)
    if (model.properties.instance_id) predicates.push(`${qTable}.${qi("instance_id")} = ${context.user.instance_id}\n`)
    
    for (let propertyId of Object.keys(where)) {
        if (!["instance_id", "creation_time", "creation_user", "update_time", "update_user"].includes(propertyId)) {
            if (propertyId == "id" || model.properties[propertyId]) {
                let value = where[propertyId]
                const qEntity = qi(model.properties[propertyId].entity)
                const qColumn = qi(model.properties[propertyId].column)
                if (Array.isArray(value)) {
                    if (!["in", "ni", "between", "like", "contains", "startsWith", "endsWith", "eq", "ne", "gt", "ge", "lt", "le", "null", "not_null"].includes(value[0])) {
                        value = ["in"].concat(value)
                    }
                    const operator = value[0]
                    if (operator == "in") {
                        value.shift()
                        predicates.push(`${qEntity}.${qColumn} IN (${value.map(qv).join(", ")})\n`)
                    }
                    else if (operator == "ni") {
                        value.shift()
                        predicates.push(`${qEntity}.${qColumn} NOT IN (${value.map(qv).join(", ")})\n`)
                    }
                    else if (operator == "between") {
                        if (model.properties[propertyId].type && model.properties[propertyId].type == "datetime") {
                            predicates.push(`${qEntity}.${qColumn} BETWEEN ${qv(value[1])} AND ${qv(value[2] + " 23:59:59.999")}\n`)
                        }
                        else {
                            predicates.push(`${qEntity}.${qColumn} BETWEEN ${qv($value[1])} AND ${qv($value[2])}\n`)
                        }
                    }
                    else if (operator == "like") {
                        predicates.push(`${qEntity}.${qColumn} LIKE ${qv(value[1])}\n`)
                    }
                    else if (operator == "contains") {
                        predicates.push(`${qEntity}.${qColumn} LIKE ${qv(`%${value[1]}%`)}\n`)
                    }
                    else if (operator == "startsWith") {
                        predicates.push(`${qEntity}.${qColumn} LIKE ${qv(`${value[1]}%`)}\n`)
                    }
                    else if (operator == "endsWith") {
                        predicates.push(`${qEntity}.${qColumn} LIKE ${qv(`%${value[1]}`)}\n`)
                    }
                    else if (operator == "eq") {
                        predicates.push(`${qEntity}.${qColumn} = ${qv(`${value[1]}`)}\n`)
                    }
                    else if (operator == "ne") {
                        predicates.push(`${qEntity}.${qColumn} != ${qv(`${value[1]}`)}\n`)
                    }
                    else if (operator == "gt") {
                        predicates.push(`${qEntity}.${qColumn} > ${qv(`${value[1]}`)}\n`)
                    }
                    else if (operator == "ge") {
                        predicates.push(`${qEntity}.${qColumn} >= ${qv(`${value[1]}`)}\n`)
                    }
                    else if (operator == "lt") {
                        predicates.push(`${qEntity}.${qColumn} < ${qv(`${value[1]}`)}\n`)
                    }
                    else if (operator == "le") {
                        predicates.push(`${qEntity}.${qColumn} <= ${qv(`${value[1]}`)}\n`)
                    }
                    else if (operator == "null") {
                        predicates.push(`${qEntity}.${qColumn} IS NULL\n`)
                    }
                    else if (operator == "not_null") {
                        predicates.push(`${qEntity}.${qColumn} IS NOT NULL\n`)
                    }
                }
                else {
                    value = qv(value)
                    if (model.properties[propertyId].type && ["int", "float", "modality"].includes(model.properties[propertyId].type)) predicates.push(`${qEntity}.${qColumn} = ${value}\n`)
                    else predicates.push(`${qEntity}.${qColumn} LIKE ${value}\n`)
                }
        
                // Perimeter check
                /*for (let propertyId of Object.keys(model.properties)) {
                    const property = model.properties[propertyId]
                    if (property.perimeter) {
                        perimeterValue = context->getPerimeter(property.perimeter.type, property.perimeter.predicate)
                        if (perimeterValue) {
                            const qEntity = qi(model.properties[propertyId].entity)
                            const qColumn = qi(propertyId)
                            const value = perimeterValue.map(qv);
                            value = value.join(",")
                            request += `AND ${qEntity}.${qColumn} IN (${value})\n`
                        }
                    }
                }*/    
            }
        }
    }
    if (predicates) request += `WHERE ${predicates.join("\nAND")}\n`

    if (order != null) {
        request += "ORDER BY "
        const orderArray = []
        for (let orderSpecifier of Object.keys(order)) {
            const direction = order[orderSpecifier]
            const qEntity = qi(model.properties[orderSpecifier].entity)
            const qColumn = qi(model.properties[orderSpecifier].column)
            orderArray.push(`${qEntity}.${qColumn} ${direction}`)
        }
        request += orderArray.join(", ")
        request += "\n"
    }

    if (limit) request += `LIMIT ${limit}\n`

    return request
}

module.exports = {
    select
}