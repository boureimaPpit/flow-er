const { noCacheMiddleware, notFoundMiddleware, handleCorsMiddleware } = require("../../core/api-utils")
const { registerBo } = require("./server/controller/index")
const { registerBoUnitTest } = require("./unitTest")

const register = async ({ context, config, logger, app, renderer }) => {

    app.use(`${config.prefix}/*`, noCacheMiddleware)
    app.use(`${config.prefix}/*`, handleCorsMiddleware)

    registerBo({ context, config, logger, app, renderer })
    registerBoUnitTest({ context, config, logger, app })

    // fallback : send 404
    app.use(`${config.prefix}/`, notFoundMiddleware)
}

module.exports = {
    register
}