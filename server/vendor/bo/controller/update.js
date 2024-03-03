const { assert } = require("../../../core/api-utils")
const { renderUpdate } = require("../view/update")

const update = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const id = assert.notEmpty(req.params, "id")
    const tab = (req.query.tab) ? req.query.tab : "default"
    const data = [{
        "status": "new",
        "email": "a.b@test.com",
        "n_last": "TEST"
    }]
    return renderUpdate(context, entity, tab, id, data, false, "formJwt à construire")
}

module.exports = {
    update
}