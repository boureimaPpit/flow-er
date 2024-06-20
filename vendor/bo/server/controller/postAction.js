const { assert, throwConflictError } = require("../../../../core/api-utils")
const { select } = require("../model/select")
const { update } = require("../model/update")
const { insert } = require("../model/insert")
const { updateCase } = require("../model/updateCase")
const { getProperties } = require("./getProperties")
const { renderAdd } = require("../view/renderAdd")

const dataToStore = (entity, model, form) => {

    const cellsToStore = {}, cellsToReject = {}

    for (let propertyId of Object.keys(form)) {
        const property = model.properties[propertyId]
        if (!property) cellsToReject[propertyId] = "unknown"
        else if (property.type == "primary") cellsToReject[propertyId] = "primary"
        else /*if (property.entity == entity)*/ {
            let value = form[propertyId]
            if (property.type == "int" && !Number.isInteger(value)) cellsToReject[propertyId] = "type"
            else if (property.type == "float" && typeof(value) != "number") cellsToReject[propertyId] = "type"
            else cellsToStore[propertyId] = value    
        }
        //else cellsToReject[propertyId] = "joined"
    }

    return { "cellsToStore": cellsToStore, "cellsToReject": cellsToReject }
}

const entitiesToStore = (mainEntity, model, cellsToStore, data, audit) => {

    /**
     * Retrieve foreign keys on already existing joined entities
     */
    for (let entityId of Object.keys(model.entities)) {
        const entity = model.entities[entityId]
        if (cellsToStore[entity.foreignKey]) data[entity.foreignKey] = cellsToStore[entity.foreignKey]
    }

    const entitiesToInsert = {}, entitiesToUpdate = {}
    for (let propertyId of Object.keys(cellsToStore)) {
        if (model.properties[propertyId]) {
            const value = cellsToStore[propertyId]
            const property = model.properties[propertyId]

            const { table, foreignEntity, foreignKey } = 
                (model.entities[property.entity])
                ? { 
                    table: model.entities[property.entity].table,
                    foreignEntity: model.entities[property.entity].foreignEntity,
                    foreignKey: model.entities[property.entity].foreignKey
                }
                : { table: mainEntity, foreignKey: "id" }

            let idToUpdate = data[foreignKey]
            if (!idToUpdate || idToUpdate === null) idToUpdate = 0
            if (idToUpdate == 0) {
                if (!entitiesToInsert[table]) entitiesToInsert[table] = {
                    cells: {},
                    foreignEntity: foreignEntity,
                    foreignKey: foreignKey,
                }
                entitiesToInsert[table].cells[property.column] = value
            }
            else {
                if (!entitiesToUpdate[table]) entitiesToUpdate[table] = { 
                    rowId: idToUpdate,
                    cells: {}
                }
                entitiesToUpdate[table].cells[property.column] = value
            }
        }
    }

    return { "entitiesToInsert": entitiesToInsert, "entitiesToUpdate": entitiesToUpdate }
}

const storeEntities = async (context, mainEntity, entitiesToInsert, entitiesToUpdate, model, db) => {

    const insertEntity = async (table, entity) => {
        const entityToInsert = entitiesToInsert[table]
        const insertModel = context.config[`${table}/model`]
        const [insertedRow] = (await db.execute(insert(context, table, entityToInsert.cells, insertModel)))
        entityToInsert.rowId = insertedRow.insertId
        if (entity.foreignEntity) {
            if (entitiesToInsert[entity.foreignEntity]) {
                entitiesToInsert[entity.foreignEntity].cells[entity.foreignKey] = insertedRow.insertId
            }

            if (entitiesToUpdate[entity.foreignEntity]) {
                entitiesToUpdate[entity.foreignEntity].cells[entity.foreignKey] = insertedRow.insertId
            }
        }
    }

    /**
     * Insert new entities in order defined in the model and propagate the foreign keys
     */
    for (let entityId of Object.keys(model.entities).reverse()) {
        const entity = model.entities[entityId]
        if (entitiesToInsert[entity.table]) await insertEntity(entity.table, entity)
    }
    if (entitiesToInsert[mainEntity]) await insertEntity(mainEntity, {})

    /**
     * Update existing entities
     */
    for (let entityId of Object.keys(entitiesToUpdate)) {
        if (entitiesToUpdate[entityId]) {
            const entity = model.entities[entityId], entityToUpdate = entitiesToUpdate[entityId]
            const updateModel = context.config[`${entityId}/model`]
            await db.execute(update(context, entity.table, [entityToUpdate.rowId], entityToUpdate.cells, updateModel))
        }
    }
    console.log(entitiesToInsert, entitiesToUpdate)
}

const auditCells = async (context, insertedEntities, updatedEntities, db) => {

    const insertAudit = async (entity, data, model) => {
        const auditTable = (model.audit) ? model.audit : "audit", auditModel = context.config[`${auditTable}/model`]
        for (let propertyId of Object.keys(data.cells)) {
            const property = model.properties[propertyId]
            if (property.audit) {
                const value = data.cells[propertyId]
                const auditToInsert = {
                    entity: entity,
                    row_id: data.rowId,
                    property: propertyId,
                    value: value
                }
                await db.execute(insert(context, auditTable, auditToInsert, auditModel))
                console.log(auditTable, auditToInsert)
            }
        }
    }

    for (let entity of Object.keys(insertedEntities)) {
        const insertedEntity = insertedEntities[entity], model = context.config[`${entity}/model`]
        await insertAudit(entity, insertedEntity, model)
    }

    for (let entity of Object.keys(updatedEntities)) {
        const updatedEntity = updatedEntities[entity], model = context.config[`${entity}/model`]
        await insertAudit(entity, updatedEntity, model)
    }
}

const postAction = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const id = (req.query.id) ? req.query.id : 0

    // Check authorization
    /*$formJwt = $this->request->getPost('formJwt');
    if (!Authorization::verifyJwt($formJwt)) {
        $this->response->setStatusCode('401');
    }*/

    const model = context.config[`${entity}/model`]

    await db.beginTransaction()

    const form = req.body
    
    /**
     * Find out the data to actually store in the database 
     */
    let { cellsToStore, cellsToReject } = dataToStore(entity, model, form)

    if (Object.keys(cellsToReject).length !== 0) {
        return JSON.stringify({ "status": "ko", "errors": cellsToReject })
    }
    
    /**
     * Find out the entities to insert vs update in the database 
     */
    let { entitiesToInsert, entitiesToUpdate } = entitiesToStore(entity, model, cellsToStore, {})

    await storeEntities(context, entity, entitiesToInsert, entitiesToUpdate, model, db)
    await auditCells(context, entitiesToInsert, entitiesToUpdate, db)

    await db.commit()

    return JSON.stringify({ "status": "ok", "inserted": cellsToStore })
}

module.exports = {
    postAction
}