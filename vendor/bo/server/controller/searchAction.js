const { assert } = require("../../../../core/api-utils")
const { select } = require("../model/select");

const searchAction = async ({ req }, context, db, renderer) => {

    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"

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

    const searchRenderer = renderer.retrieve((context.config[`${entity}/search/${view}`].view) ? context.config[`${entity}/search/${view}`].view : "renderSearch")
    return searchRenderer(context, entity, view, properties, await getCompletionData(context, entity, view, db, properties))
}

const getCompletionData = async (context, entity, view, db, properties) => {
    let data = {}
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        if (property.options.completion) {
            const order = {}
            order[propertyId] = "ASC"
            const rows = (await db.execute(select(context, "candidat", [propertyId], {}, order, null, context.config[`${entity}/model`])))[0]
            const keys = {}
            for (let row of rows) { 
                keys[row[propertyId]] = null 
            }
            data[propertyId] = Object.keys(keys)
        }
    }
    return data
}

module.exports = {
    searchAction
}