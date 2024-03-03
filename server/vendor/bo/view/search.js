const renderFilterDateTime = (context, propertyId, property) => {

    return `<div class="input-group input-group-sm mb-2 mr-sm-2">
        <input type="hidden" value="0" class="searchCheckValue" id="searchCheckValue-${propertyId}" />
        <div class="input-group-prepend">
            <button type="button" class="btn btn-secondary input-group-text searchCheck" id="searchCheck-${propertyId}">${context.localize(property.labels)}</button>
        </div>
        <input class="form-control searchInput searchInputDate searchInputDateMin" type="text" id="searchMin-${propertyId}" placeholder="${context.translate("Min")}" />
        <input class="form-control searchInput searchInputDate searchInputDateMax" type="text" id="searchMax-${propertyId}" placeholder="${context.translate("Max")}" />
    </div>`
} 

const renderFilterAge = (context, propertyId, property) => {

    return `<div class="input-group input-group-sm mb-2 mr-sm-2">
        <input type="hidden" value="0" class="searchCheckValue" id="searchCheckValue-${propertyId}" />
        <div class="input-group-prepend">
            <button type="button" class="btn btn-secondary input-group-text searchCheck" id="searchCheck-${propertyId}">${context.localize(property.labels)}</button>
        </div>
        <input class="form-control searchInput searchInputAge searchInputAgeMin" type="text" id="searchMin-${propertyId}" placeholder="${context.translate("Min")}" />
        <input class="form-control searchInput searchInputAge searchInputAgeMax" type="text" id="searchMax-${propertyId}" placeholder="${context.translate("Max")}" />
    </div>`
} 

const renderFilterSelect = (context, propertyId, property, options) => {

    let restriction = null
    if (property.perimeter) {
        perimeter = context.getPerimeter(property.perimeter.type, property.perimeter.predicate)
        if (perimeter) restriction = perimeter
    }

    const modalities = []
    if (property.modalities) {
        for (let modalityId of Object.keys(property.modalities)) {
            const modality = property.modalities[modalityId]
            if (!modality.archive) {
                if (!restriction || restriction.includes(modalityId)) {
                    modalities[modalityId] = modality
                }
            }
        }
    }

    const multiple = (options.multiple) ? true : false

    const renderModalities = (modalities) => {

        let options = []
        for (let modalityId of Object.keys(modalities)) {
            const modality = modalities[modalityId]
            let clas =`restrictionParentOption-${propertyId}`
            if (property.options.restrictions) {
                clas += " restriction"
                const restrictions = []
                for (let restriction of property.options.restrictions) {
                    const restrictionProperty = restriction.property
                    clas += ` restriction-${restriction.parent} restriction-${restriction.parent}-${modality.properties[restrictionProperty].join('|')}`
                }
            }    
            options.push(`<option value="${modalityId}" class="${clas}" id="search-${propertyId}-${modalityId}">${context.localize(modality)}</option>`)
        }
        return options.join("\n")
    }

    return `<input type="hidden" value="0" class="searchCheckValue" id="searchCheckValue-${propertyId}" />
    <div class="input-group input-group-sm mb-2 mr-sm-2 ${(property["source"]) ? "searchSelectDynamic" : ""} id="searchSelectDiv-${propertyId}">
        <div class="input-group-prepend">
            <button type="button" class="btn btn-secondary input-group-text searchCheck" id="searchCheck-${propertyId}">${context.localize(property.labels)}</button>
        </div>
        <select class="form-control searchInput searchInputSelect ${(multiple) ? "selectpicker searchSelectpicker" : ""} ${(options.restrictionParent) ? `restrictionParent restrictionParent-${propertyId}` : ""}" id="search-${propertyId}" ${(multiple) ? "data-none-selected-text multiple" : ""}>
            ${(multiple) ? `<option value="empty">-- ${context.translate("Not provided")} --</option>` : ""}
            ${(!multiple && options.empty) ? `<option value="" class="restrictionParentOption-${propertyId}" id="search-${propertyId}"></option>` : ""}
            ${renderModalities(modalities)}
        </select>
    </div>`
}

const renderFilterNumber = (context, propertyId, property) => {

    return `<div class="input-group input-group-sm mb-2 mr-sm-2">
        <input type="hidden" value="0" class="searchCheckValue" id="searchCheckValue-<${propertyId}" />
        <div class="input-group-prepend">
            <button type="button" class="btn btn-secondary input-group-text searchCheck" id="searchCheck-${propertyId}">${context.localize(property.labels)}</button>
        </div>
        <input class="form-control searchInput searchInputNumber searchInputNumberMin" type="text" id="search_min-${propertyId}" placeholder="${context.translate("Min")}" />
        <input class="form-control searchInput searchInputNumber searchInputNumberMax" type="text" id="search_max-${propertyId}" placeholder="${context.translate("Max")}" />
    </div>`
}

const renderFilterInput = (context, propertyId, property, options) => {
    return `<div class="input-group input-group-sm mb-2 mr-sm-2">
        <input type="hidden" value="0" class="searchCheckValue" id="searchCheckValue-${propertyId}" />
        <div class="input-group-prepend">
            <button type="button" class="btn btn-secondary input-group-text searchCheck" id="searchCheck-${propertyId}">${context.localize(property.labels)}</button>
        </div>
        <input class="form-control" list="datalistOptions" id="exampleDataList">
        <datalist id="datalistOptions">
            <option value="San Francisco">
            <option value="New York">
            <option value="Seattle">
            <option value="Los Angeles">
            <option value="Chicago">
        </datalist>
    </div>`
}

const renderFilters = (context, entity, tab, properties) => {
    
    let filters = []
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        const options = (property.options) ? property.options : []
        const propertyType = (options.type) ? options.type : property.type

        let input;
        
        if (["date", "time", "datetime"].includes(propertyType)) {
            input = renderFilterDateTime(context, propertyId, property)
        }

        else if (["age"].includes(propertyType)) {
            input = renderFilterAge(context, propertyId, property)
        }

        else if (["select", "multiselect", "tags"].includes(propertyType)) {
            input = renderFilterSelect(context, propertyId, property, options)
        }        

        else if (["number"].includes(propertyType)) {
            input = renderFilterNumber(context, propertyId, property, options)
        }        

        else {
            input = renderFilterInput(context, propertyId, property, options)
        }        

        filters.push(`<div class="col-md-3">${input}</div>`)
    }

    return filters.join("\n")
}

const renderButtons = (context, entity, tab) => {
    let buttons = []
    const actions = context.config[`${entity}/global/${tab}`]["actions"]
    for (let actionId of Object.keys(actions)) {
        const action = actions[actionId]
        buttons.push(`<input type="hidden" class="globalRoute" id="globalRoute-${actionId}" value="${action.route}" />
            <button type="button" class="btn btn-default input-group-text globalButton" id="globalButton-${actionId}" title="${context.localize(action.labels)}">
                <i class="fa <?php echo $action['glyph']; ?> text-center, ext-justify" style="font-size: 12px;">
                    ${(action.glyphTitle) ? action.glyphTitle : ""}
                </i>
                ${(action.span) ? context.localize(action.span) : ""}
            </button>`)
    }
    return buttons.join("\n")
}

const renderSearch = (context, entity, tab) => {

    const searchConfig = context.config[`${entity}/search/${tab}`]
    const properties = {}
    for (let propertyId of Object.keys(searchConfig.properties)) {
        const options = searchConfig.properties[propertyId]
        const property = context.config[`${entity}/property/${propertyId}`]
        if (property.definition != "inline") property = context.config[property.definition]
        properties[propertyId] = property
        properties[propertyId].options = options 
        if (properties[propertyId].options.modalities) listModalities.push({ propertyId: properties[propertyId].options.modalities }) 
    }
    
    return `<div class="row mb-3">
        <div class="col-md-12">
            <!-- Filters -->
            <form class="form-inline">
                <div class="row">

                    ${renderFilters(context, entity, tab, properties)}
        
                    <div class="col-md-3">    
                        <div class="input-group input-group-sm mb-2 mr-sm-2">
                            <button type="button" class="btn btn-default" disabled title="<?php echo $this->translate('Refresh the list', 'ppit-core', $context->getLocale()) ?>" id="refreshButton">
                            <i class="fa fa-sync-alt text-center"></i>
                            </button>
                            <button type="button" class="btn btn-default input-group-text" disabled title="<?php echo $this->translate('Erase', 'ppit-core', $context->getLocale()) ?>" id="eraseButton">
                            <i class="fa fa-times text-center"></i>
                            </button>
                
                            ${renderButtons(context, entity, tab)}
                
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    </div>`
}

module.exports = {
    renderSearch
}
