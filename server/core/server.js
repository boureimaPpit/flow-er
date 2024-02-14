const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const startServer = async (config, logger) => {
    if (!config || ! config.server || !logger) {
        throw new Error("Missing server configuration");
    }
    const bindAddress = config.server.bindAddress;
    const listenPort = config.server.listenPort;

    const app = express();
    app.disable("x-powered-by");
    app.set("trust proxy", true);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(loggerMiddleware(logger));
    
    await registerMiddlewares(config, logger, app);

    logger.info("starting server...");
    app.listen(listenPort, bindAddress, () => {
        logger.info(`server running on port ${bindAddress}:${listenPort}`);
    });
};

const registerMiddlewares = async (config, logger, app) => {
    const middlewares = config.server.middlewares;
    if (!middlewares) {
        return;
    }

    for (let key of Object.keys(middlewares)) {
        const middleware = require(middlewares[key].dir);
        if (typeof middleware.register === "function") {
            await middleware.register({config: middlewares[key], logger, app});
        }
        else {
            throw new Error(`invalid middleware for key ${key}, please check for function "register"`);
        }
    }
};

const loggerMiddleware = logger => (req, res, next) => {
    res.on("finish", () => {
        const ip = req.connection.remoteAddress;
        const date = moment().format("DD/MMM/YYYY:hh:mm:ss");
        const request = `"${req.method} ${req.url} HTTP/${req.httpVersion}"`;
        const status = res.statusCode;
        logger && logger.info(`${ip} - - [${date}] ${request} ${status}`);
    });
    next();
};

module.exports = {
    startServer
};
