const { select } = require("../model/select")

const getProperties = async (db, context, entity, view, propertyDefs, whereParam) => {
    const properties = {}, propertyList = Object.keys(propertyDefs)

    for (let param of whereParam) {
        const keyValue = param.split(":")
        propertyList.push(keyValue[0])
    }
    
    for (let propertyId of propertyList) { console.log(propertyId)
        const options = propertyDefs[propertyId]
        let property = context.config[`${entity}/property/${propertyId}`]
        if (property.definition != "inline") property = context.config[property.definition]

        /**
         * Tags
         */
        if (property.type == "tag") {
            let filters = (property.where) ? property.where : {}
            filters = filters.split("|")
            filters = filters.map((x) => { return x.split(":") })
            const where = {}
            for (let filter of filters) {
                let value = context.config[filter[1]]
                if (!value) value = filter[1] 
                value = value.split(",")
                where[filter[0]] = value
            }
            const tagColumns = property.format[1].split(",")
            tagColumns.push("id")
            tagColumns.push(property.vector)
            let tagOrder = {}
            if (property.order[0] == "-") tagOrder[property.order.substr(1)] = "DESC" 
            else tagOrder[property.order] = "ASC"
            const rows = (await db.execute(select(context, property.entity, tagColumns, where, tagOrder, null, context.config[`${property.entity}/model`])))[0]
            property.tags = []
            for (let row of rows) {
                const vector = (row[property.vector]) ? row[property.vector].split(",") : []
                row[property.vector] = vector.map((x) => { return parseInt(x) })
                property.tags.push(row)
            }
        }

        properties[propertyId] = property
        properties[propertyId].options = options
    }
    return properties
}

module.exports = {
    getProperties
}