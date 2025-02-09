const express = require("express")
const bodyParser = require("body-parser");
const multer = require("multer");
const { executeService, assert } = require("../../../../core/api-utils")
const { createDbClient2 } = require("../../../utils/db-client")
const { getModel } = require("../model/index")
const { getDBConfig } = require("../../../../vendor/studio/server/controller/getDBConfig")

const { dashboardAction } = require("./dashboardAction")

const { getAction } = require("./getAction")
const { countAction } = require("./countAction")
const { postAction } = require("./postAction")

const { shortcutsAction } = require("./shortcutsAction")
const { searchAction } = require("./searchAction")
const { listAction } = require("./listAction")
const { addAction, postAddAction } = require("./addAction")
const { detailAction } = require("./detailAction")
const { updateAction, postUpdateAction } = require("./updateAction")
const { modalListAction } = require("./modalListAction")
const { modalListTabsAction } = require("./modalListTabsAction")
const { modalListFormAction } = require("./modalListFormAction")
const { historyAction } = require("./historyAction")
const { apiAction } = require("./apiAction")
const { formAction, postFormAction } = require("./formAction")
const { publicFormAction } = require("./publicFormAction")
const { configShortcutsAction, postConfigShortcutsAction } = require("./configShortcutsAction")

const { loadViewAction } = require("./loadViewAction")

const { renderIndex } = require("../view/renderIndex")

const { select } = require("../model/select")

const registerBo = async ({ context, config, logger, app }) => {

    const model = await getModel(config, context)
    const db = model.db
    if (context.config.studio.mode == "staging") {
        getDBConfig(context, model)
    }
    const execute = executeService(config, logger)
    const upload = multer()
    app.use(upload.array())
    app.get(`${config.prefix}config`, execute(() => { return JSON.stringify(context.config) }))
    app.get(`${config.prefix}language`, execute(() => { return JSON.stringify(context.translations) }))
    app.get(`${config.prefix}user`, execute(() => { return JSON.stringify(context.user) }))
    app.get(`${config.prefix}index/:entity`, execute(index, context, db))
    app.get(`${config.prefix}dashboard/:entity`, execute(dashboardAction, context, db))
    
    app.get(`${config.prefix}shortcuts/:entity`, execute(shortcutsAction, context, db))
    app.get(`${config.prefix}search/:entity`, execute(searchAction, context, db))
    app.get(`${config.prefix}list/:entity`, execute(listAction, context, db))
    app.get(`${config.prefix}detail/:entity/:id`, execute(detailAction, context, db))
    app.get(`${config.prefix}add/:entity`, execute(addAction, context, db))
    app.post(`${config.prefix}add/:entity`, execute(postAddAction, context, db))
    app.get(`${config.prefix}update/:entity/:id`, execute(updateAction, context, db))
    app.post(`${config.prefix}update/:entity/:id`, execute(postUpdateAction, context, db))
    app.get(`${config.prefix}modalList/:entity/:id`, execute(modalListAction, context, db))
    app.get(`${config.prefix}modalListTabs/:entity/:id`, execute(modalListTabsAction, context, db))
    app.get(`${config.prefix}modalListForm/:entity/:id`, execute(modalListFormAction, context, db))
    app.get(`${config.prefix}history/:entity/:id`, execute(historyAction, context, db))
    app.get(`${config.prefix}api/:entity`, execute(apiAction, context, db)) // Deprecated
    app.get(`${config.prefix}form/:entity`, execute(formAction, context, db))
    app.post(`${config.prefix}form/:entity`, execute(postFormAction, context, db))
    app.get(`${config.prefix}publicForm/:entity`, execute(publicFormAction, context, db))
    app.get(`${config.prefix}configShortcuts/:entity/:id`, execute(configShortcutsAction, context, db))
    app.post(`${config.prefix}configShortcuts/:entity/:id`, execute(postConfigShortcutsAction, context, db))

    /**
     * JSON controllers
     */
    app.get(`${config.prefix}loadView/:entity`, execute(loadViewAction, context))

    /**
     * Internal API
     */
    app.get(`${config.prefix}v1/:entity/count`, execute(countAction, context, db))
    app.get(`${config.prefix}v1/:entity/view/:view`, execute(getAction, context, db))
    //app.get(`${config.prefix}v1/:entity/property/:property`, execute(getPropertyAction, context, db))
    app.post(`${config.prefix}v1/:entity`, execute(postAction, context, db))
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

    const data = {
        user: context.user, 
        tab: menu[`tab/${view}`], 
        indexConfig: context.config[`${entity}/index/${view}`]
    }
    return renderIndex({ context, entity, view }, data)
}

module.exports = {
    registerBo
}