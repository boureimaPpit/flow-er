const { assert } = require("../../../../core/api-utils")
const { getProperties } = require("../../../bo/server/controller/getProperties")
const { getList } = require("../../../bo/server/controller/getList")
const { select } = require("../../../bo/server/model/select")

const util = require('util')

const getAction = async ({ req }, context, db) => {
    const folder = req.params.folder
    const name = req.params.name
    const version = req.params.version

    const where = (req.query.where) ? req.query.where : null
    const order = (req.query.order) ? req.query.order : "name"
    const limit = (req.query.limit) ? req.query.limit : 1000

    const whereParam = (where != null) ? where.split("|") : []
    if (folder) whereParam.push(`folder:${folder}`)
    if (name) whereParam.push(`name:${name}`)
    if (version) whereParam.push(`version:${version}`)

    /**
     * Properties definition
     */
    let viewConfig = context.config[`document/view/default`]
    const propertyDefs = viewConfig.properties
    const properties = await getProperties(db, context, "document", "default", propertyDefs, whereParam)
        
    /**
     * List of DB columns to retrieve
     */
    let columns
    if (version) {
        columns = null
    }
    else {
        columns = Object.keys(context.config[`document/view/default`].properties)
        if (!name) columns = columns.concat([["max", "version", ["type", "folder", "name", "mime"]]])    
    }
console.log(name)
    /**
     * List of DB columns to retrieve
     */
    const data = await getList(db, context, "document", "default", columns, properties, whereParam, order, limit)

    const result = []
    for (let row of data) {
        const obj = {}
        for (let key of Object.keys(row)) {
            if (row[key] != null) obj[key] = row[key]
        }

        /**
         * Retrieve single document parts
         */
        if (version) {
            const partModel = context.config[`document_text/model`]
            const parts = (await db.execute(select(context, "document_text", null, { "id": row.content_vector.split(",") }, null, null, partModel)))[0]
            obj.parts = parts
        }

        result.push(obj)
    }
    return { "status": "ok", "data": result, "properties": properties }
}

module.exports = {
    getAction
}