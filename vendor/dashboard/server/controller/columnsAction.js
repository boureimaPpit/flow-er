const { assert } = require("../../../../core/api-utils")
const { getProperties } = require("../../../bo/server/controller/getProperties")
const { getList } = require("../../../bo/server/controller/getList")
const { renderColumns } = require("../view/renderColumns")

const columnsAction = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const where = (req.query.where) ? req.query.where : null
    const order = (req.query.order) ? req.query.order : null
    const limit = (req.query.limit) ? req.query.limit : 1000
    let columns = Object.keys(context.config[`${entity}/columns/${view}`].properties)

    const whereParam = (where != null) ? where.split("|") : []

    let orderArray = null
    if (order != null) {
        orderArray = {}
        for (let orderer of order.split(",")) {
            let propertyId, direction
            if (orderer[0] == "-") {
                propertyId = orderer.substring(1)
                direction = "DESC"
            }
            else {
                propertyId = orderer
                direction = "ASC"
            }
            orderArray[propertyId] = direction    
        }    
    }

    let columnsConfig = context.config[`${entity}/columns/${view}`]
    if (!columnsConfig) columnsConfig = context.config[`${entity}/columns`]
    const propertyDefs = columnsConfig.properties
    const properties = await getProperties(db, context, entity, view, propertyDefs, whereParam)
    const propertyList = []
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        if (property.type != "tags") propertyList.push(propertyId)
    }

    if (!columns) columns = propertyList
    columns = columns.concat(["id"])

    const data = await getList(db, context, entity, view, columns, properties, whereParam, order, limit)
    return renderColumns(context, entity, view, data, order, limit, columnsConfig, properties)
}

module.exports = {
    columnsAction
}