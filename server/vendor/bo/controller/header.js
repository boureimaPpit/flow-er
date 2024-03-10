const { assert } = require("../../../core/api-utils")
const { renderHeader } = require("../view/header")

const header = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    return renderHeader(context, entity, view)
}

module.exports = {
    header
}