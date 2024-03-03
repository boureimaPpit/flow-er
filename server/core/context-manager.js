const path = require("path")
const fs = require("fs")
const { loadConfig } = require("./config-manager")

const loadAppConfig = middlewares => {
    const appConfig = {}
    for (let key of Object.keys(middlewares)) {
        const fileNames = fs.readdirSync(`${middlewares[key].dir}/config`)
        for (let fileName of fileNames) {
            const configFile = loadConfig(`${middlewares[key].dir}/config/${fileName}`)
            for (let key of Object.keys(configFile)) {
                if (appConfig[key]) {
                    for (let subkey of Object.keys(configFile[key])) {
                        appConfig[key][subkey] = configFile[key][subkey]
                    }
                }
                else appConfig[key] = configFile[key]
            }    
        }
    }
    console.log(appConfig)
    return appConfig
}

const loadTranslations = (middlewares, locale) => {
    const translations = {}
    translations[locale] = {}
    for (let key of Object.keys(middlewares)) {
        const lang = JSON.parse(fs.readFileSync(`${middlewares[key].dir}/language/${locale}.json`, "utf8"))
        for (let key of Object.keys(lang)) {
            translations[locale][key] = lang[key]
        }
    }
    return translations
}

const loadContext = (config, logger) => {

    const middlewares = config.server.middlewares
    if (!middlewares) {
        return
    }

    const locale = "fr_FR"
    const translations = loadTranslations(middlewares, locale)

    const context = {

        instanceCaption: "flow-er.fr",
        config: loadAppConfig(middlewares),

        localize: (str) => {
            if (str[locale]) return str[locale]
            else return str.default
        },

        translate: (str) => {
            if (translations[locale][str]) {
                return translations[locale][str]
            }
            else return str
        }
    }

    return context
}

module.exports = {
    loadContext
}
