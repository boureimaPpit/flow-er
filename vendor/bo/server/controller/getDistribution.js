const { getWhere } = require("./getWhere")
const { select } = require("../model/select")

const getDistribution = async (db, context, entity, view, column, properties, whereParam) => {

    const where = getWhere(properties, whereParam)

    const model = context.config[`${entity}/model`]
    const rows = (await db.execute(select(context, entity, ["id", column], where, null, null, model)))[0]
    if (rows.length > 0) {
        const property = properties[column]

        /**
         * Tags 
         */ 
        if (property.type == "tag") {

            const tagKey = property.key
            const dictRows = {}
            for (let row of rows) {
                if (!dictRows[row[tagKey]]) dictRows[row[tagKey]] = []
                dictRows[row[tagKey]].push(row)
            }
            
            const tags = property.tags

            for (let row of rows) row[column] = []
            for (let tag of tags) {
                tag.rowCache = []
                const vectorId = (property.vector) ? property.vector : "ids"
                const vector = tag[vectorId].split(",")
                for (let rowKey of vector) {
                    if (dictRows[rowKey]) {
                        for (let row of dictRows[rowKey]) {
                            const keep = true
                            if (property.matching) {
                                for (let tagProp of property.matching) {
                                    const dataProp = property.matching[tagProp]
                                    if (row[dataProp] != tag[tagProp]) keep = false
                                }
                            }
                            if (keep) {
                                const arguments = []
                                for (let param of property.format[1].split(",")) {
                                    arguments.push(tag[param])
                                }
                                row[propertyId].push(vsprintf(property.format[0], arguments))
                                if (orderTags[propertyId]) {
                                    tag.rowCache.push(row)
                                }
                            }
                        }
                    }
                }
            }
            for (let row of rows) {
                if (Array.isArray(row[column])) row[column] = row[column].join("<br>")
            }
        }
    }

    let distribution = {}, code

    for (let row of rows) {
        const values = (row[column] != null) ? row[column].split(",") : ""
        for (let value of values) {
            code = (row[column])
            if (!distribution[value]) distribution[value] = { code: code, value: 0 }
            distribution[value].value++    
        }
    }

    return distribution
}

module.exports = {
    getDistribution
}