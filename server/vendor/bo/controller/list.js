const { assert } = require("../../../core/api-utils")
const { select } = require("../model/select");
const { renderList } = require("../view/list")

const list = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const orderParam = (req.query.order) ? req.query.order : ""
    const limit = (req.query.limit) ? req.query.limit : 1000
    const columns = Object.keys(context.config[`${entity}/list/${view}`].properties)
    const data = await db(select(entity, columns, {}, /*{ n_last: "ASC" }*/null, null, context.config[`${entity}/model`]))
    return renderList(context, entity, view, data, orderParam, limit)
}

module.exports = {
    list
}