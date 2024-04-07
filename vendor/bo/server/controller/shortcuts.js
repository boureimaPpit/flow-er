const { assert } = require("../../../../core/api-utils")
const { renderShortcuts } = require("../view/shortcuts")

const shortcuts = async ({ req }, context, db) => {

    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"

    return renderShortcuts(context, entity, view)
}

module.exports = {
    shortcuts
}