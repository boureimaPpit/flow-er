const { assert, throwConflictError } = require("../../../../core/api-utils")
const { select } = require("../model/select")
const { dbUpdate } = require("../model/update")
const { updateCase } = require("../model/updateCase")
const { getProperties } = require("./list")
const { renderUpdate } = require("../view/update")

const update = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const id = assert.notEmpty(req.params, "id")
    const view = (req.query.view) ? req.query.view : "default"

    let where = (req.query.where) ? req.query.where : null
    const whereParam = (where != null) ? where.split("|") : []
    where = {}
    for (let param of whereParam) {
        const keyValue = param.split(":")
        const key = keyValue[0]
        let value = keyValue[1].split(",")
        where[key] = value
    }

    let updateConfig = context.config[`${entity}/update/${view}`]
    if (!updateConfig) updateConfig = context.config[`${entity}/update`]
    const propertyDefs = updateConfig.properties
    const properties = await getProperties(db, context, entity, view, propertyDefs, [])

    /**
     * Data source
     */
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        if (property.type === "source") {
            let filters = property.where
            filters = (filters) ? filters.split("|") : []
            filters = filters.map((x) => { return x.split(":") })
            const sourceEntity = property.entity
            const sourceWhere = {}
            for (let filter of filters) {
                let value = context.config[filter[1]] // Value set in config
                if (!value) {
                    if (filter[1][0] === "?") { // Value set in query
                        const key = filter[1].substr(1)
                        if (where[key]) value = where[key]
                        else value = []
                    }
                    else {
                        value = filter[1]
                        value = (value) ? value.split(",") : []
                    }
                }
                if (value.length !== 0) sourceWhere[filter[0]] = value
            }
            const sourceColumns = ["id"]
            for (let columnId of property.format[1].split(",")) sourceColumns.push(columnId)
            
            const modalities = (await db.execute(select(context, sourceEntity, sourceColumns, sourceWhere, null, null, context.config[`${property.entity}/model`])))[0]
            property.modalities = {}
            for (let modality of modalities) {
                const args = []
                for (let param of property.format[1].split(",")) {
                    args.push(modality[param])
                }
                const label = []
                const format = property.format[0].split("%s")
                for (let i = 0; i < format.length; i++) {
                    label.push(format[i])
                    if (args[i]) label.push(args[i])                    
                }
                property.modalities[modality.id] = label.join("")
            }
        }
    }

    // Retrieve the existing row

    const model = context.config[`${entity}/model`]
    let row
    if (id) {
        const columns = Object.keys(model.properties)
        row = (await db.execute(select(context,entity, columns, { "id": id }, null, null, model)))[0][0]
    }
    
    return renderUpdate(context, entity, view, id, properties, row, false, whereParam, "formJwt à construire")
}

const postUpdate = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const id = assert.notEmpty(req.params, "id")
    const view = (req.query.view) ? req.query.view : "default"

    let updateConfig = context.config[`${entity}/update/${view}`]
    if (!updateConfig) updateConfig = context.config[`${entity}/update`]
    const propertyDefs = updateConfig.properties
    const properties = await getProperties(db, context, entity, view, propertyDefs, [])

    // Retrieve the existing row

    const model = context.config[`${entity}/model`]
    let row
    if (id) {
        const columns = Object.keys(model.properties)
        row = (await db.execute(select(context, entity, columns, { "id": id }, null, null, model)))[0][0]
    }

    await db.beginTransaction()

    // Check authorization
    /*$formJwt = $this->request->getPost('formJwt');
    if (!Authorization::verifyJwt($formJwt)) {
        $this->response->setStatusCode('401');
    }*/

    const data = {}, contact_history = null, tagsToUpdate = {}
    let update_time
    for (let propertyId of Object.keys(req.body)) {
        let value = req.body[propertyId]
        if (propertyId !== "formJwt") {
            const property = properties[propertyId]

            if (propertyId == "update_time") update_time = value
            
            /**
             * Tags
             */
            else if (property.type == "tag") {
                value = (value) ? value.split(",") : []
                const tagEntity = property.entity
                const tagKey = (property.key) ? property.key : "id"
                const vectorId = property.vector
                for (let tag of property.tags) {
                    const vector = tag[vectorId]
                    if (value.includes(tag[tagKey])) {
                        if (!vector.includes(row.id)) vector.push(row.id)
                        if (!tagsToUpdate[`${tagEntity}|${vectorId}`]) tagsToUpdate[`${tagEntity}|${vectorId}`] = {}
                        tagsToUpdate[`${tagEntity}|${vectorId}`][tag[tagKey]] = vector
                    }
                    else if (vector.includes(row.id)) {
                        const newVector = []
                        for (let newId of vector) if (newId !== row.id) newVector.push(newId)
                        if (!tagsToUpdate[`${tagEntity}|${vectorId}`]) tagsToUpdate[`${tagEntity}|${vectorId}`] = {}
                        tagsToUpdate[`${tagEntity}|${vectorId}`][tag.id] = newVector
                    }
                }
            }

            else if (!row[propertyId] || value != row[propertyId]) {
                data[propertyId] = value
            }
        }
    }

    const entities = {}
    for (let propertyId of Object.keys(data)) {
        const value = data[propertyId]
        const property = model.properties[propertyId]
        const entityToUpdate = property.entity
        if (!entities[entityToUpdate]) entities[entityToUpdate] = {}
        entities[entityToUpdate][property.column] = value
    }
    
    const mainEntityData = (entities[entity]) ? entities[entity] : null

    // Update an existing row
    if (mainEntityData) {

        // Consistency: Data updated by someone else in the meantime
        if (update_time < row.update_time.toISOString().slice(0, 19).replace("T", " ")) {
            return await throwConflictError("Consistency")
        }
        await db.execute(dbUpdate(context, entity, [id], mainEntityData, model))
    }

    // Add a new row
    /*else {
        const id = Generic::insert($connection, $entity, $mainEntityData, $model);
        echo $id;
    }*/

    /**
     * Tags
     */
    if (Object.keys(tagsToUpdate).length > 0) {
        for (let key of Object.keys(tagsToUpdate)) {
            const vector = tagsToUpdate[key]
            key = key.split("|")
            const tagEntity = key[0]
            const vectorId = key[1]
            const dict = {}
            for (let tag_id of Object.keys(vector)) {
                const ids = vector[tag_id]
                dict[tag_id] = ids.join(",")
            }
            await db.execute(updateCase(context, tagEntity, vectorId, dict))
        }
    }

    await db.commit()
}

module.exports = {
    update,
    postUpdate
}