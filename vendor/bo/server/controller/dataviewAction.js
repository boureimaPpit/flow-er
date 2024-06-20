const { assert } = require("../../../../core/api-utils")
const { getProperties } = require("./getProperties")
const { getList } = require("./getList")
const { getMeasure } = require("./getMeasure")
const { getDistribution } = require("./getDistribution")
const { renderDataview } = require("../view/renderDataview")

const util = require('util')

const dataviewAction = async ({ req }, context, db, renderer) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const where = (req.query.where) ? req.query.where : null
    const order = (req.query.order) ? req.query.order : null
    const limit = (req.query.limit) ? req.query.limit : 1000

    const whereParam = (where != null) ? where.split("|") : []

    /**
     * Properties definition
     */
    let listConfig = context.config[`${entity}/list/${view}`]
    if (!listConfig) listConfig = context.config[`${entity}/list/default`]
    const propertyDefs = listConfig.properties
    const properties = await getProperties(db, context, entity, view, propertyDefs, whereParam)

    let major = false
    if (order != null) {
        major = order.split(",")[0]
        if (major.charAt(0) == "-") major = major.substring(1)
    }

    /**
     * List of DB columns to retrieve
     */
    const columns = Object.keys(propertyDefs).concat("id")
    
    const data = await getList(db, context, entity, view, columns, properties, whereParam, order, limit)

    /**
     * Measure the data as a tuplet [count, sum]
     */
    const measure = (listConfig.measure) ? await getMeasure(db, context, entity, view, listConfig.measure, whereParam) : false

    /**
     * Retrieve distributions of the data
     */
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        property.distribution = await getDistribution(db, context, entity, view, propertyId, properties, whereParam)
    }
    
    const listRenderer = renderer.retrieve((listConfig.view) ? listConfig.view : "renderDataviewB5")
    return listRenderer(context, entity, view, data, order, limit, measure, listConfig, properties)
}

module.exports = {
    dataviewAction,
}