const { getWhere } = require("./getWhere")
const { select } = require("../model/select")

const getMeasure = async (db, context, entity, view, column, properties, whereParam) => {

    const where = getWhere(properties, whereParam)

    const model = context.config[`${entity}/model`]
    const rows = (await db.execute(select(context, entity, [["count", "id"], ["sum", column]], where, null, null, model)))[0]
    return rows[0]
}

module.exports = {
    getMeasure
}