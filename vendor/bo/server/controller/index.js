const express = require("express")
const bodyParser = require("body-parser");
const multer = require("multer");
const { executeService, assert } = require("../../../../core/api-utils")
const { createDbClient2 } = require("../../../utils/db-client")
const { shortcutsAction } = require("./shortcutsAction")
const { searchAction } = require("./searchAction")
const { dataviewAction } = require("./dataviewAction")
const { listAction } = require("./listAction")
const { columnsAction } = require("./columnsAction")
const { addAction, postAddAction } = require("./addAction")
const { detailAction } = require("./detailAction")
const { updateAction, postUpdateAction } = require("./updateAction")
const { historyAction } = require("./historyAction")
const { apiAction } = require("./apiAction")
const { formAction, postFormAction } = require("./formAction")

const { renderIndex } = require("../view/renderIndex")
const { renderIndexB5 } = require("../view/renderIndexB5")
const { renderSearch } = require("../view/renderSearch")
const { renderSearchB5 } = require("../view/renderSearchB5")
const { renderDataview } = require("../view/renderDataview")
const { renderDataviewB5 } = require("../view/renderDataviewB5")
const { renderCalendar } = require("../view/renderCalendar")
const { renderChart } = require("../view/renderChart")

const registerBo = async ({ context, config, logger, app, renderer }) => {
    const db = await createDbClient2(config.db, context.dbName)
    const execute = executeService(config, logger)
    const upload = multer()
    registerViews(renderer)
    app.use(upload.array())
    app.get(`${config.prefix}config`, execute(() => { return JSON.stringify(context.config) }))
    app.get(`${config.prefix}language`, execute(() => { return JSON.stringify(context.translations) }))
    app.get(`${config.prefix}user`, execute(() => { return JSON.stringify(context.user) }))
    app.get(`${config.prefix}index/:entity`, execute(index, context, db, renderer))
    app.get(`${config.prefix}shortcuts/:entity`, execute(shortcutsAction, context, db))
    app.get(`${config.prefix}search/:entity`, execute(searchAction, context, db, renderer))
    app.get(`${config.prefix}dataview/:entity`, execute(dataviewAction, context, db, renderer))
    app.get(`${config.prefix}list/:entity`, execute(listAction, context, db))
    app.get(`${config.prefix}columns/:entity`, execute(columnsAction, context, db))
    app.get(`${config.prefix}detail/:entity/:id`, execute(detailAction, context, db))
    app.get(`${config.prefix}add/:entity`, execute(addAction, context, db))
    app.post(`${config.prefix}add/:entity`, execute(postAddAction, context, db))
    app.get(`${config.prefix}update/:entity/:id`, execute(updateAction, context, db))
    app.post(`${config.prefix}update/:entity/:id`, execute(postUpdateAction, context, db))
    app.get(`${config.prefix}history/:entity/:id`, execute(historyAction, context, db))
    app.get(`${config.prefix}api/:entity`, execute(apiAction, context, db))
    app.get(`${config.prefix}form/:entity`, execute(formAction, context, db))
    app.post(`${config.prefix}form/:entity`, execute(postFormAction, context, db))
}

const index = async ({ req }, context, db, renderer) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const indexConfig = context.config[`${entity}/index/${view}`]
    const data = { where: (indexConfig.where) ? indexConfig.where : "", order: (indexConfig.order) ? indexConfig.order : "", limit: (indexConfig.limit) ? indexConfig.limit : 1000 }
    const indexRenderer = renderer.retrieve((context.config[`${entity}/index/${view}`].view) ? context.config[`${entity}/index/${view}`].view : "renderIndex")
    return indexRenderer(context, entity, view, data)
}

const registerViews = (renderer) => {
    renderer.register("renderIndex", renderIndex)
    renderer.register("renderIndexB5", renderIndexB5)
    renderer.register("renderSearch", renderSearch)
    renderer.register("renderSearchB5", renderSearchB5)
    renderer.register("renderDataview", renderDataview)
    renderer.register("renderDataviewB5", renderDataviewB5)
    renderer.register("renderCalendar", renderCalendar)
    renderer.register("renderChart", renderChart)
}

module.exports = {
    registerBo
}