const { assert } = require("../../../core/api-utils")
const { renderDetail } = require("../view/detail")

const detail = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const id = assert.notEmpty(req.params, "id")
    const tab = (req.query.tab) ? req.query.tab : "default"
    return renderDetail(context, entity, tab, id)
}

module.exports = {
    detail
}