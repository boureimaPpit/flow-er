const express = require("express")
const bodyParser = require("body-parser");
const multer = require("multer");
const { executeService, assert } = require("../../../../core/api-utils")
const { createDbClient2 } = require("../../../utils/db-client")

const { columnsAction } = require("./columnsAction")

const { renderIndex } = require("../view/renderIndex")

const registerDashboard = async ({ context, config, logger, app }) => {

    const db = await createDbClient2(config.db, context.dbName)
    const execute = executeService(config, logger)
    const upload = multer()
    app.use(upload.array())
    app.get(`${config.prefix}index/:entity`, execute(index, context, db))
    app.get(`${config.prefix}columns/:entity`, execute(columnsAction, context, db))
}

const index = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const indexConfig = context.config[`${entity}/index/${view}`]

    const menuId = context.config[`tab/${view}`].menu
    const menu = {}
    for (let menuTabId of context.config[menuId].tabs) {
        const menuTab = context.config[menuTabId]
        menu[menuTabId] = menuTab
    }

    const where = (indexConfig && indexConfig.where) ? indexConfig.where : ""
    const order = (indexConfig && indexConfig.order) ? indexConfig.order : ""
    const limit = (indexConfig && indexConfig.limit) ? indexConfig.limit : 1000
    return renderIndex(context, entity, view, context.user, menu[`tab/${view}`], context.config[`${entity}/index/${view}`])
}

module.exports = {
    registerDashboard
}