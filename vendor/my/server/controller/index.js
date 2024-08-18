const express = require("express")
const bodyParser = require("body-parser");
const multer = require("multer");
const { executeService, assert } = require("../../../../core/api-utils")
const { createDbClient2 } = require("../../../utils/db-client")

const { protectedFormAction } = require("./protectedFormAction")

const registerMy = async ({ context, config, logger, app }) => {

    const db = await createDbClient2(config.db, context.dbName)
    const execute = executeService(config, logger)
    const upload = multer()
    app.use(upload.array())
    app.get(`${config.prefix}protectedForm/:entity/:id`, execute(protectedFormAction, context, db))
}

module.exports = {
    registerMy
}