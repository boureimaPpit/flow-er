const vsprintf = require("sprintf-js").vsprintf
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
            for (let tagKey of Object.keys(tags)) {
                const tag = tags[tagKey]
                tag.rowCache = []
                const vectorId = (property.vector) ? property.vector : "ids"
                const vector = tag[vectorId]
                for (let rowKey of vector) {
                    if (dictRows[rowKey]) {
                        for (let row of dictRows[rowKey]) {
                            let keep = true
                            if (property.matching) {
                                for (let tagProp of property.matching) {
                                    const dataProp = property.matching[tagProp]
                                    if (row[dataProp] != tag[tagProp]) keep = false
                                }
                            }
                            if (keep) {
                                const args = []
                                for (let param of property.format[1].split(",")) {
                                    args.push(tag[param])
                                }
                                row[column].push(vsprintf(property.format[0], args))
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
            if (!distribution[value]) distribution[value] = { code: value, value: 0 }
            distribution[value].value++    
        }
    }

    return distribution
}

module.exports = {
    getDistribution
}