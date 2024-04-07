const { assert } = require("../../../../core/api-utils")

const ddl = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const model = context.config[`${entity}/model`]
    const ddl = []
    for (let propertyId of Object.keys(model.properties)) {
        const property = model.properties[propertyId]
        let type = "VARCHAR(255)"
        if (property.entity == entity && property.type != "tag") {
            if (property.type == "date") type = "DATE"
            else if (property.type == "datetime") type = "DATETIME"
            else if (property.type == "int") type = "INT(11)"
            else if (property.type == "tinyint") type = "TINYINT"    
            ddl.push(`\`${propertyId}\` ${type} DEFAULT NULL,`)
        }
    }
    return ddl.join("\n", ddl)
}

module.exports = {
    ddl
}