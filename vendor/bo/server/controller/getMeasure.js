const { getWhere } = require("./getWhere")
const { select } = require("../model/select")
const { getProperties } = require("./getProperties")

const getMeasure = async (db, context, entity, view, column, whereParam) => {

    let listConfig = context.config[`${entity}/list/${view}`]
    if (!listConfig) listConfig = context.config[`${entity}/list/default`]
    const propertyDefs = listConfig.properties
    const properties = await getProperties(db, context, entity, view, propertyDefs, whereParam)

    const where = getWhere(properties, whereParam)

    const model = context.config[`${entity}/model`]
    const rows = (await db.execute(select(context, entity, [["count", "id"], ["sum", column]], where, null, null, model)))[0]
    return rows[0]
}

module.exports = {
    getMeasure
}