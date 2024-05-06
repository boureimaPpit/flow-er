const renderListHeader = (context, entity, view, measure, distribution, orderParam, properties) => {

    const listConfig = context.config[`${entity}/list/${view}`]
    /*const properties = {}
    for (let propertyId of Object.keys(listConfig.properties)) {
        const options = listConfig.properties[propertyId]
        let property = context.config[`${entity}/property/${propertyId}`]
        if (property.definition != "inline") property = context.config[property.definition]
        properties[propertyId] = Object.assign({}, property)
        properties[propertyId].options = options 
    }*/

    let major = "n_last", dir = "ASC"
    if (orderParam) {
        for (let orderer of orderParam.split(",")) {
            if (orderer.charAt(0) == "-") {
                major = orderer.substring(1)
                dir = "DESC"
            }
            else major = orderer
            break
        }    
    }

    let measureValues = (measure) ? Object.values(measure) : false, count = (measure) ? measureValues[0] : false, sum = (measure) ? parseFloat(measureValues[1]) : false
    const average = (sum && count) ? Math.round(sum / count * 10) / 10 : false

    const renderSelectOption = (propertyId) => {
        const property = properties[propertyId]
        const options = []
        for (let modality of Object.keys(property.distribution)) {
            const { code, value } = property.distribution[modality]
            let label
            if (["select", "source", "tag"].includes(property.type)) label = context.localize(property.modalities[code])
            else if (property.type == "date") label = context.decodeDate(code)
            else if (property.type == "number") label = parseFloat(code).toLocaleString("fr-FR")
            else label = code
            options.push(`<option value="${modality}">${ (modality) ? label : "Vide" } (${value})</option>`)
        }
        return options.join("\n")
    }

    const head = [`<thead>
    <th colspan="2">
        <a type="button" class="btn btn-sm sort_anchor" role="button">
            <b id="listCount" title="Nombre de lignes">${count}</b>
            ${ (sum) ? `<br><b id="listCount" title="Somme">${sum.toLocaleString("fr-FR")}</b>` : "" }
            ${ (average) ? `<br><em id="listAverage" title="Moyenne">${average.toLocaleString("fr-FR")}</em>`: "" }
        </a>
    </th>`]
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        head.push(`<th>
            <a type="button" class="btn listSortAnchor ${(major == propertyId) ? `btn-secondary active ${(dir == "ASC") ? "sortAnchorUp" : "sortAnchorDown"}` : "" }" data-bs-toggle="collapse" href="#listSortCollapse-${propertyId}" role="button" id="listSortAnchor-${propertyId}" aria-expanded="false" aria-controls="listSortCollapse-${propertyId}">
            
                <span ${ ( ["school_year", "level"].includes(propertyId) ) ? "class=\"fw-bold\"" : "" }>${ context.localize(property.labels) }</span>

                ${(major == propertyId) ? `<i class="fas fa-caret-${(dir == "ASC") ? "up" : "down"}"></i>` : ""}
            </a>
            <div class="collapse" id="listSortCollapse-${propertyId}">
                <div class="card card-body">
                    <select class="custom-select custom-select-sm" size="${ Object.keys(property.distribution).length }" id="distributionSelect" multiple>${renderSelectOption(propertyId)}</select>
                </div>
            </div>
        </th>`)
    }
    head.push("</thead>")
    head.push(`<input type="hidden" id="caption_0" value="${context.translate("Add")}" />
    <tr>
        <td>
          <input type="checkbox" class="listCheckAll" data-toggle="tooltip" data-placement="top" title="${context.translate("Check all")}"></input>
        </td>

        <td style="text-align: center">
            <div class="input-group input-group-sm">
                <button type="button" class="btn btn-sm btn-outline-primary index-btn listDetailButton" title="${context.translate("Add")}" id="listDetailButton-0">
                    <span class="fas fa-plus"></span>
                </button>
            </div>
        </td>

        <td colspan="${Object.keys(properties).length + 2}"></td>
    </tr>`)
    return head.join("\n")
}

module.exports = {
    renderListHeader
}
