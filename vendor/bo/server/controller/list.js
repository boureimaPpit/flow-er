const { assert } = require("../../../../core/api-utils")
const { select } = require("../model/select")
const { renderList } = require("../view/list")

const list = async ({ req }, context, db) => {
    const entity = assert.notEmpty(req.params, "entity")
    const view = (req.query.view) ? req.query.view : "default"
    const where = (req.query.where) ? req.query.where : null
    const order = (req.query.order) ? req.query.order : null
    const limit = (req.query.limit) ? req.query.limit : 1000
    let columns = Object.keys(context.config[`${entity}/list/${view}`].properties)

    const whereParam = (where != null) ? where.split("|") : []

    let orderArray = null
    if (order != null) {
        orderArray = {}
        for (let orderer of order.split(",")) {
            let propertyId, direction
            if (orderer[0] == "-") {
                propertyId = orderer.substring(1)
                direction = "DESC"
            }
            else {
                propertyId = orderer
                direction = "ASC"
            }
            orderArray[propertyId] = direction    
        }    
    }

    let listConfig = context.config[`${entity}/list/${view}`]
    const propertyDefs = listConfig.properties
    const properties = await getProperties(db, context, entity, view, propertyDefs, whereParam)
    const propertyList = []
    for (let propertyId of properties) {
        const property = properties[propertyId]
        if (property.type != "tags") propertyList.push(propertyId)
    }

    if (!columns) columns = propertyList
    columns = columns.concat(["id"])

    const data = await getList(db, context, entity, view, columns, properties, whereParam, order, limit)

    return renderList(context, entity, view, data, order, limit)
}

const getProperties = async (db, context, entity, view, propertyDefs, whereParam) => {
    const properties = [], propertyList = Object.keys(propertyDefs)

    for (let param of whereParam) {
        const keyValue = param.split(":")
        propertyList.push(keyValue[0])
    }
    
    for (let propertyId of propertyList) {
        const options = propertyDefs[propertyId]
        const property = context.config[`${entity}/property/${propertyId}`]

        /**
         * Tags
         */
        if (property.type == "tag") {
            let filters = (property.where) ? property.where : {}
            filters = filters.split("|")
            filters = filters.map((x) => { return x.split(":") })
            const where = {}
            for (let filter of filters) {
                let value = context.config[filter[1]]
                if (!value) value = filter[1] 
                value = value.split(",")
                where[filter[0]] = value
            }
            const tagColumns = property.format[1].split(",")
            tagColumns.push("id")
            tagColumns.push(property.vector)
            let tagOrder = {}
            if (property.order[0] == "-") tagOrder[property.order.substr(1)] = "DESC" 
            else tagOrder[property.order] = "ASC"
            const rows = (await db.execute(select(context, property.entity, tagColumns, where, tagOrder, null, context.config[`${property.entity}/model`])))[0]
            property.tags = []
            for (let row of rows) {
                const vector = (row[property.vector]) ? row[property.vector].split(",") : []
                row[property.vector] = vector.map((x) => { return parseInt(x) })
                property.tags.push(row)
            }
        }

        properties[propertyId] = property
        properties[propertyId].options = options
    }
    return properties
}

const arrayIntersect = (arrays) => {
    const result = {}
    for (let array of arrays) {
        for (let value of array) result[value] = null 
    }
    return Object.keys(result)
}

const getList = async (db, context, entity, view, columns, properties, whereParam, orderParam, limit) => {

    const where = {}

    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        if (property.options && property.options.restriction) {
            where[propertyId] = property.options.restriction
        }
    }    

    const whereTags = {}
    for (let param of whereParam) {
        const keyValue = param.split(":")
        const key = keyValue[0]
        let value = keyValue[1].split(",")

        /**
         * Tags
         */
        const property = properties[key]
        if (property.type == "tag") {
            value = value.map((x) => { return parseInt(x) })
            const tags = {}
            for (let tag of property.tags) {
                if (value.includes(tag.id)) {
                    tags[tag.id] = tag
                    const vectorId = property.vector
                    const ids = tag[vectorId]
                    const tagKey = (property.key) ? property.key : "id"
                    for (let id of ids) {
                        if (!whereTags[tagKey]) whereTags[tagKey] = {}
                        if (!whereTags[tagKey][key]) whereTags[tagKey][key] = []
                        whereTags[tagKey][key][id] = null
                    }
                }
            }
            property.tags = tags
        }
        else where[key] = value
    }    

    for (let id of Object.keys(whereTags)) {
        const vectors = whereTags[id]
        where[id] = arrayIntersect(Object.values(vectors).map((x) => { return Object.keys(x) }))
    }

    const orderTags = {}
    let order = null
    if (orderParam != null) {
        order = {}
        for (let orderer of orderParam.split(",")) {
            let propertyId, direction
            if (orderer[0] == "-") {
                propertyId = orderer.substr(1)
                direction = "DESC"
            }
            else {
                propertyId = orderer
                direction = "ASC"
            }
            if (properties[propertyId].type != "tag") order[propertyId] = direction    
            else orderTags[propertyId] = direction
        }    
    }

    const model = context.config[`${entity}/model`]
    const rows = (await db.execute(select(context, entity, columns, where, order, limit, model)))[0]
    if (rows.length > 0) {
        for (let propertyId of properties) {
            const property = properties[propertyId]

            /**
             * Tags 
             */ 
            if (property.type == "tag") {

                const tagKey = property.key
                const dictRows = {}
                for (let row of rows) {
                    if (!dictRows[row[tagKey]]) dictRows[row[tagKey]] = []
                    dictRows[row[tagKey]].push(row)
                }
                
                const tags = property.tags

                for (let row of rows) row[propertyId] = []
                for (let tag of tags) {
                    tag.rowCache = []
                    const vectorId = (property.vector) ? property.vector : "ids"
                    const vector = tag[vectorId].split(",")
                    for (let rowKey of vector) {
                        if (dictRows[rowKey]) {
                            for (let row of dictRows[rowKey]) {
                                const keep = true
                                if (property.matching) {
                                    for (let tagProp of property.matching) {
                                        const dataProp = property.matching[tagProp]
                                        if (row[dataProp] != tag[tagProp]) keep = false
                                    }
                                }
                                if (keep) {
                                    const arguments = []
                                    for (let param of property.format[1].split(",")) {
                                        arguments.push(tag[param])
                                    }
                                    row[propertyId].push(vsprintf(property.format[0], arguments))
                                    if (orderTags[propertyId]) {
                                        tag.rowCache.push(row)
                                    }
                                }
                            }
                        }
                    }
                }
                for (let row of rows) {
                    if (Array.isArray(row[propertyId])) row[propertyId] = row[propertyId].join("<br>")
                }
                if (orderTags[propertyId]) {
                    const rows = []
                    const rowKeys = {}
                    for (let tag of tags) {
                        if (tag.rowCache) {
                            for (let row of tag.rowCache) {
                                if (!rowKeys[row.id]) {
                                    rowKeys[row.id] = true
                                    rows.push(row)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return rows
}

module.exports = {
    list,
    getList,
    getProperties
}