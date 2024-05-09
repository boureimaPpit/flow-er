const { getWhere } = require("./getWhere")
const { select } = require("../model/select")

const getMeasure = async (db, context, entity, view, column, whereParam) => {

    const searchConfig = context.config[`${entity}/search/${view}`]
    const properties = {}
    for (let propertyId of Object.keys(searchConfig.properties)) {
        const options = searchConfig.properties[propertyId]
        let property = context.config[`${entity}/property/${propertyId}`]
        if (property.definition != "inline") property = context.config[property.definition]
        properties[propertyId] = Object.assign({}, property)
        properties[propertyId].options = options 
        if (properties[propertyId].options.modalities) listModalities.push({ propertyId: properties[propertyId].options.modalities }) 
    }

    const where = getWhere(properties, whereParam)

    const model = context.config[`${entity}/model`]
    const rows = (await db.execute(select(context, entity, [["count", "id"], ["sum", column]], where, null, null, model)))[0]
    return rows[0]
}

module.exports = {
    getMeasure
}