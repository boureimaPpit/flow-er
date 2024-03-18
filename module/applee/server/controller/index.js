const { executeService, assert } = require("../../../../core/api-utils")

const registerApplee = async ({ context, config, logger, app }) => {
    const execute = executeService(config, logger)
    app.get(`${config.prefix}index`, execute(index, context))
}

const index = ({ req }, context) => {
    console.log("Hello world")
}

module.exports = {
    registerApplee
}