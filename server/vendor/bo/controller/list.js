const { assert } = require("../../../core/api-utils")
const { renderList } = require("../view/list")

const list = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const tab = (req.query.tab) ? req.query.tab : "default"
    const orderParam = (req.query.order) ? req.query.order : ""
    const limit = (req.query.limit) ? req.query.limit : 1000
    const data = [{
        "id": 1,
        "status": "new",
        "email": "a.b@test.com",
        "n_last": "TEST"
    }]
    return renderList(context, entity, tab, data, orderParam, limit)
}

module.exports = {
    list
}