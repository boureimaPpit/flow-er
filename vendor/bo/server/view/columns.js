/** List to transform to cards */
const renderColumns = (context, entity, view, rows, orderParam, limit) => {

    const columnsConfig = context.config[`${entity}/columns/${view}`]
    const properties = {}
    for (let propertyId of Object.keys(columnsConfig.properties)) {
        const options = columnsConfig.properties[propertyId]
        let property = context.config[`${entity}/property/${propertyId}`]
        if (property.definition != "inline") property = context.config[property.definition]
        properties[propertyId] = Object.assign({}, property)
        properties[propertyId].options = options 
    }

    const pipe = {}
    for (let modality of columnsConfig.distribution.modalities.split(",")) {
        pipe[modality] = { count: 0, sum : 0, rows: [] }
    }
    for (let row of rows) {
        pipe[row[columnsConfig.distribution.variable]].count ++
        pipe[row[columnsConfig.distribution.variable]].sum += parseFloat(row[columnsConfig.distribution.sum])
        pipe[row[columnsConfig.distribution.variable]].rows.push(row)
    }

    const result = ["<div class=\"row\">"]
    
    for (let key of Object.keys(pipe)) {
        const modality = pipe[key]
        const property = properties[columnsConfig.distribution.variable]
        result.push(`<div class="col-md-3">
            <div class="card border-secondary">
                <div class="card-header text-center">
                    <strong>${modality.count} ${context.localize(property.modalities[key])}</strong> <em>(${modality.sum} €)</em>
                </div>
            </div>
            ${renderRows(context, columnsConfig, properties, modality.rows)}
        </div>`)
    }

    result.push("</div>")
    return result.join("\n")
}

const renderRows = (context, columnsConfig, properties, rows) => {

    const result = []

    for (let row of rows) {
        result.push(`<div class="card" draggable="true">
            <div class="card-body">
                ${renderLayout(context, columnsConfig, properties, row)}
            </div>
        </div>`)
    }

    return result.join("\n")
}

const renderLayout = (context, columnsConfig, properties, row) => {

    const result = []

    for (let propertyId of Object.keys(columnsConfig.layout)) {
        const value = row[columnsConfig.distribution.variable]
        const markup = columnsConfig.layout[propertyId]
        const modalities = (markup.modalities) ? markup.modalities.split(",") : false
        if (!modalities || modalities.includes(value)) {
            const args = []
            for (let param of markup.params.split(",")) {
                const property = properties[param]
                if (property.type == "select") {
                    args.push((row[param]) ? context.localize(property.modalities[row[param]]) : "")
                }
                else if (property.type == "date") {
                    args.push(context.decodeDate(row[param]))
                }
                else if (property.type == "datetime") {
                    args.push(context.decodeTime(row[param]))
                }
                else {
                    args.push(row[param])
                }
            }
            const format = markup.format.split("%s")
            const text = []
            for (let i = 0; i < format.length; i++) {
                text.push(format[i])
                if (i < args.length) text.push(args[i])
            }
            result.push(text.join(""))
        }
    }

    return result.join("\n")
}

const renderProperties = (context, row, properties) => {

    const html = []

    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]

        if (property.type == "select") {
            html.push(`<td class="${(property.options.class) ? property.options.class[row[propertyId]] : ""}">
                ${(row[propertyId]) ? context.localize(property.modalities[row[propertyId]]) : ""}
            </td>`)
        }
        
        else if (property.type == "multiselect") {
            const captions = []
            for (let modalityId of row[propertyId].split(",")) {
                captions.push(context.localize(property.modalities[modalityId]))
            }
            html.push(`<td>${captions.join(",")}</td>`)                  
        }

        else if (property.type == "date") {
            html.push(`<td>${context.decodeDate(row[propertyId])}</td>`)
        }
      
        else if (property.type == "datetime") {
            html.push(`<td>${context.decodeTime(row[propertyId])}</td>`)
        }

        else if (property.type == "email") {
            html.push(`<td><a href="mailto:${row[propertyId]}">${row[propertyId]}</a></td>`)
        }              

        else if (property.type == "phone") {
            html.push(`<td><a href="tel:${row[propertyId]}">${row[propertyId]}</a></td>`)
        }

        else if (property.type == "tags") {
            html.push(`<td class="listTagsName" id="listTagsName-${propertyId}-${row.id}">${row[propertyId]}</td>`)
        }

        else {
            html.push(`<td>${row[propertyId]}</td>`)                  
        }
    }
    return html.join("\n")
}

module.exports = {
    renderColumns
}
