const { assert } = require("../../../../core/api-utils")
const { select } = require("../model/select");
const { renderSearch } = require("../view/search")

const search = async ({ req }, context, db) => {

    let data = {}
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
    data.n_last = (await db.execute(select(context, "account", ["n_last"], {}, { n_last: "ASC" }, null, context.config["account/model"])))[0]
    const keys = {}
    for (let row of data.n_last) { 
        keys[row.n_last] = null 
    }
    data.n_last = Object.keys(keys)
    return renderSearch(context, entity, view, properties, data)
}

module.exports = {
    search
}