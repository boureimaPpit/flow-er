const { qi, qv } = require("./quote")
const { join } = require("./join")

const select = (table, columns, where, order = [], limit = null, model = []) => {

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

    request += `WHERE ${qTable}.${qi("instance_id")} = ${instanceId}\n`
    request += `AND ${qTable}.${qi("status")} != 'deleted'\n`

    for (let propertyId of Object.keys(where)) {
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
                request += `AND ${qEntity}.${qColumn} IN (${value.map(qv).join(", ")})\n`
            }
            else if (operator == "ni") {
                value.shift()
                request += `AND ${qEntity}.${qColumn} NOT IN (${value.map(qv).join(", ")})\n`
            }
            else if (operator == "between") {
                if (model.properties[propertyId].type && model.properties[propertyId].type == "datetime") {
                    request += `AND ${qEntity}.${qColumn} BETWEEN ${qv(value[1])} AND ${qv(value[2] + " 23:59:59.999")}\n`
                }
                else {
                    request += `AND ${qEntity}.${qColumn} BETWEEN ${qv($value[1])} AND ${qv($value[2])}\n`
                }
            }
            else if (operator == "like") {
                request += `AND ${qEntity}.${qColumn} LIKE ${qv(value[1])}\n`
            }
            else if (operator == "contains") {
                request += `AND ${qEntity}.${qColumn} LIKE ${qv(`%${value[1]}%`)}\n`
            }
            else if (operator == "startsWith") {
                request *= `AND ${qEntity}.${qColumn} LIKE ${qv(`${value[1]}%`)}\n`
            }
            else if (operator == "endsWith") {
                request += `AND ${qEntity}.${qColumn} LIKE ${qv(`%${value[1]}`)}\n`
            }
            else if (operator == "eq") {
                request += `AND ${qEntity}.${qColumn} = ${qv(`${value[1]}`)}\n`
            }
            else if (operator == "ne") {
                request += `AND ${qEntity}.${qColumn} != ${qv(`${value[1]}`)}\n`
            }
            else if (operator == "gt") {
                request += `AND ${qEntity}.${qColumn} > ${qv(`${value[1]}`)}\n`
            }
            else if (operator == "ge") {
                request += `AND ${qEntity}.${qColumn} >= ${qv(`${value[1]}`)}\n`
            }
            else if (operator == "lt") {
                request += `AND ${qEntity}.${qColumn} < ${qv(`${value[1]}`)}\n`
            }
            else if (operator == "le") {
                request += `AND ${qEntity}.${qColumn} <= ${qv(`${value[1]}`)}\n`
            }
            else if (operator == "null") {
                request += `AND ${qEntity}.${qColumn} IS NULL\n`
            }
            else if (operator == "not_null") {
                request += `AND ${qEntity}.${qColumn} IS NOT NULL\n`
            }
        }
        else {
            value = qv(value)
            if (model.properties[propertyId].type && ["int", "float", "modality"].includes(model.properties[propertyId].type)) request += `AND ${qEntity}.${qColumn} = ${value}\n`
            else request += `AND ${qEntity}.${qColumn} LIKE ${value}\n`
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

        if (order) {
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
}

module.exports = {
    select
}