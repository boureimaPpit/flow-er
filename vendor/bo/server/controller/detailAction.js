const { assert } = require("../../../../core/api-utils")
const { renderDetail } = require("../view/renderDetail")

const detailAction = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const id = assert.notEmpty(req.params, "id")
    const view = (req.query.view) ? req.query.view : "default"
    return renderDetail(context, entity, view, id)
}

module.exports = {
    detailAction
}