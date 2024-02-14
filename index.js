const path = require("path");
const dotenv = require("dotenv");

const { loadConfig } = require("./server/core/config-manager");
const { createLogger } = require("./server/core/logger");
const { startServer } = require("./server/core/server");

const CONFIG_FILE = path.resolve(__dirname, "etc", "settings.json");

dotenv.config();

const config = loadConfig(CONFIG_FILE);
const logger = createLogger(config.log);

startServer(config, logger);