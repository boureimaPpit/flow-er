const { executeService, assert } = require("../../../../core/api-utils")
const { createDbClient } = require("../../../utils/db-client")
const { createMailClient } = require("../../../utils/mail-client")
const { register } = require("./register")

const registerUser = async ({ context, config, logger, app }) => {
    const db = await createDbClient(config.db)
    const mailClient = createMailClient({ config: config.smtp, logger })
    const execute = executeService(config, logger)

    app.get(`${config.prefix}register`, execute(register, context, db, mailClient))
}

module.exports = {
    registerUser
}