const path = require("path")
const dotenv = require("dotenv")

const { loadContext } = require("./server/core/context-manager")
const { loadConfig } = require("./server/core/config-manager")
const { createLogger } = require("./server/core/logger")
const { startServer } = require("./server/core/server")

const CONFIG_FILE = path.resolve(__dirname, "etc", "settings.json")

dotenv.config()

const config = loadConfig(CONFIG_FILE)
const logger = createLogger(config.log)
const context = loadContext(config, logger)

startServer(context, config, logger)