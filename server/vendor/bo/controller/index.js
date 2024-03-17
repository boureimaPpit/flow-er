const express = require("express")
const { executeService, assert } = require("../../../core/api-utils")
const { renderIndex } = require("../view/index")
const { createDbClient } = require("../../utils/db-client");
const { search } = require("./search");
const { list } = require("./list");
const { detail } = require("./detail");
const { update } = require("./update");
const { api } = require("./api");

const registerBo = async ({ context, config, logger, app }) => {
    const db = await createDbClient(config.db);
    const execute = executeService(config, logger)
    app.get(`${config.prefix}config`, execute(() => { return JSON.stringify(context.config) }))
    app.get(`${config.prefix}language`, execute(() => { return JSON.stringify(context.translations) }))
    app.get(`${config.prefix}user`, execute(() => { return JSON.stringify(context.user) }))
    app.get(`${config.prefix}index/:entity`, execute(index, context, db))
    app.get(`${config.prefix}search/:entity`, execute(search, context, db))
    app.get(`${config.prefix}list/:entity`, execute(list, context, db))
    app.get(`${config.prefix}detail/:entity/:id`, execute(detail, context, db))
    app.get(`${config.prefix}update/:entity/:id`, execute(update, context, db))
    app.get(`${config.prefix}api/:entity`, execute(api, context, db))
}

const index = ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const listConfig = context.config[`${entity}/list/${view}`]
    const data = { where: (listConfig.where) ? listConfig.where : "", order: (listConfig.order) ? listConfig.order : "", limit: (listConfig.limit) ? listConfig.limit : 1000 }
    console.log(data)
    return renderIndex(context, entity, view, data)
}

module.exports = {
    registerBo
}