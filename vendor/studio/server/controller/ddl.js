const { assert } = require("../../../../core/api-utils")

const ddl = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const model = context.config[`${entity}/model`]
    const ddl = []
    ddl.push("SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";")
    ddl.push("START TRANSACTION;")
    ddl.push("SET time_zone = \"+00:00\";\n")
    ddl.push(`CREATE TABLE \`${entity}\` (`)

    const propertyDdl = []
    for (let propertyId of Object.keys(model.properties)) {
        const property = model.properties[propertyId]
        let type = "VARCHAR(255) DEFAULT ''"
        if (property.entity == entity && property.type != "tag") {
            if (property.type == "date") type = "DATE DEFAULT NULL"
            else if (property.type == "datetime") type = "DATETIME DEFAULT NULL"
            else if (["int", "primary"].includes(property.type)) type = "INT(11) DEFAULT 0"
            else if (property.type == "tinyint") type = "TINYINT DEFAULT 0"
            
            if (property.type == "primary") {
                propertyDdl.push(`  \`${propertyId}\` ${type}`)
            }
            else {
                propertyDdl.push(`  \`${propertyId}\` ${type}`)
            }
        }
    }
    ddl.push(propertyDdl.join(",\n"))
    ddl.push(") ENGINE=InnoDB DEFAULT CHARSET=utf8;")
    ddl.push(`\nALTER TABLE \`${entity}\` ADD PRIMARY KEY (\`id\`);`)
    ddl.push(`ALTER TABLE \`${entity}\` MODIFY \`id\` int(11) NOT NULL AUTO_INCREMENT;`)
    ddl.push("COMMIT;")
    return ddl.join("\n")
}

module.exports = {
    ddl
}