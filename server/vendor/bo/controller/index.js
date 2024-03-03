const { executeService, assert } = require("../../../core/api-utils")
const { renderIndex } = require("../view/index")
const { renderSearch } = require("../view/search")
const { createDbClient } = require("../../utils/db-client");
const { select } = require("../model/select");
const { list } = require("./list");
const { detail } = require("./detail");
const { update } = require("./update");

const registerBo = async ({ context, config, logger, app }) => {
    const db = await createDbClient(config.db);
    const execute = executeService(config, logger)
    app.get(`${config.prefix}index/:entity`, execute(index, context, db))
    app.get(`${config.prefix}search/:entity`, execute(search, context, db))
    app.get(`${config.prefix}list/:entity`, execute(list, context, db))
    app.get(`${config.prefix}detail/:entity/:id`, execute(detail, context, db))
    app.get(`${config.prefix}update/:entity/:id`, execute(update, context, db))
}

const index = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const tab = (req.query.tab) ? req.query.tab : "default"
    const data = { where: "", order: "+name", limit: 1000 }
    
    const request = select("account", ["id", "email"], { email: "a.b@test.com" }, { email: "ASC" }, 100, context.config.model)

    db.query(
        request,
        function (err, result) {
            if (err) throw err
        }
    )
    return renderIndex(context, entity, tab, data)
}

const search = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const tab = (req.query.tab) ? req.query.tab : "default"
    return renderSearch(context, entity, tab)
}

module.exports = {
    registerBo
}