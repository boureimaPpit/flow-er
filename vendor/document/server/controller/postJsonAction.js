const { assert, throwConflictError } = require("../../../../core/api-utils")
const { select } = require("../../../bo/server/model/select")
const { update } = require("../../../bo/server/model/update")
const { insert } = require("../../../bo/server/model/insert")
const { updateCase } = require("../../../bo/server/model/updateCase")

const constructPartsVector = async (context, partModel, parts, db) => {
    const partsVector = []
    for (const part of parts) {
        if (part.id) partsVector.push(part.id)
        else {
            const [insertedRow] = (await db.execute(insert(context, "document_text", { "data": JSON.stringify(part) }, partModel)))
            partsVector.push(insertedRow.insertId)
        }
    }
    return partsVector
}

const postJsonAction = async ({ req }, context, db) => {
    const folder = assert.notEmpty(req.params, "folder")
    const name = assert.notEmpty(req.params, "name")

    const model = context.config[`document/model`]
    const partModel = context.config[`document_text/model`]

    /**
     * Retrieve existing version
     */
    const existing = (await db.execute(select(context, "document", [["max", "version", ["folder", "name"]]], { "folder": folder, "name": name }, null, null, model)))[0][0]
    await db.beginTransaction()

    const parts = req.body
    const partsVector = constructPartsVector(context, partModel, parts, db)

    const data = {
        "type": "text",
        "folder": folder,
        "name": name,
        "mime": "application/json",
        "version": (existing) ? existing.version + 1 : 1,
        "content_vector": (await partsVector).join(",")
    }
    const [insertedRow] = (await db.execute(insert(context, "document", data, model)))
    data.id = insertedRow.insertId

    await db.commit()
    return JSON.stringify({ "status": "ok", "stored": data })
}

module.exports = {
    postJsonAction
}