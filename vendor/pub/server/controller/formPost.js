const { assert } = require("../../../../core/api-utils")

const formPost = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const formConfig = context.config[`${entity}/form/${view}`]

    console.log(req.body)
    if (formConfig.redirect) return { "redirect": formConfig.redirect }
    else return {}
}

module.exports = {
    formPost
}