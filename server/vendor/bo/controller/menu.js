const { assert } = require("../../../core/api-utils")
const { renderMenu } = require("../view/menu")

const menu = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    return renderMenu(context, entity, view)
}

module.exports = {
    menu
}