const express = require("express")
const bodyParser = require('body-parser');
const multer = require('multer');
const { executeService, assert } = require("../../../../core/api-utils")
const { renderIndex } = require("../view/index")
const { createDbClient2 } = require("../../../utils/db-client")
const { select } = require("../model/select")
const { shortcuts } = require("./shortcuts")
const { search } = require("./search")
const { list } = require("./list")
const { columns } = require("./columns")
const { add, postAdd } = require("./add")
const { detail } = require("./detail")
const { update, postUpdate } = require("./update")
const { history } = require("./history")
const { api } = require("./api")

const { insert } = require("../model/insert")

const registerBo = async ({ context, config, logger, app }) => {
    const db = await createDbClient2(config.db, context.dbName)
    const execute = executeService(config, logger)
    const upload = multer()
    app.use(upload.array())
    app.get(`${config.prefix}config`, execute(() => { return JSON.stringify(context.config) }))
    app.get(`${config.prefix}language`, execute(() => { return JSON.stringify(context.translations) }))
    app.get(`${config.prefix}user`, execute(() => { return JSON.stringify(context.user) }))
    app.get(`${config.prefix}index/:entity`, execute(index, context, db))
    app.get(`${config.prefix}shortcuts/:entity`, execute(shortcuts, context, db))
    app.get(`${config.prefix}search/:entity`, execute(search, context, db))
    app.get(`${config.prefix}list/:entity`, execute(list, context, db))
    app.get(`${config.prefix}columns/:entity`, execute(columns, context, db))
    app.get(`${config.prefix}detail/:entity/:id`, execute(detail, context, db))
    app.get(`${config.prefix}add/:entity`, execute(add, context, db))
    app.post(`${config.prefix}add/:entity`, execute(postAdd, context, db))
    app.get(`${config.prefix}update/:entity/:id`, execute(update, context, db))
    app.post(`${config.prefix}update/:entity/:id`, execute(postUpdate, context, db))
    app.get(`${config.prefix}history/:entity/:id`, execute(history, context, db))
    app.get(`${config.prefix}api/:entity`, execute(api, context, db))
}

const index = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const indexConfig = context.config[`${entity}/index/${view}`]
    const data = { where: (indexConfig.where) ? indexConfig.where : "", order: (indexConfig.order) ? indexConfig.order : "", limit: (indexConfig.limit) ? indexConfig.limit : 1000 }
    return renderIndex(context, entity, view, data)
}

module.exports = {
    registerBo
}