const { assert } = require("../../../../core/api-utils")
const { renderShortcuts } = require("../view/renderShortcuts")

const shortcutsAction = async ({ req }, context, db) => {

    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"

    return renderShortcuts(context, entity, view)
}

module.exports = {
    shortcutsAction
}