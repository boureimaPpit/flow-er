const renderSearch = ({ context, entity, view }, data) => {

    const properties = data.properties
    data = data.rows
    
    return `<div class="row mb-3">
        <div class="col-md-12">
            <!-- Filters -->
            <form class="form-inline">
                <div class="row">

                    ${renderFilters(context, entity, view, properties, data)}
        
                    <div class="col-md-12">    
                        <div class="input-group input-group-sm mb-2 mr-sm-2">
                            <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="tooltip" title="${context.translate("Order the list")}" id="flOrderButton">
                                <i class="fas fa-arrow-down-a-z"></i>
                            </button>
                            <button type="button" class="btn btn-default" disabled title="<?php echo $this->translate('Refresh the list', 'ppit-core', $context->getLocale()) ?>" id="flRefreshButton">
                                <i class="fa fa-sync-alt text-center"></i>
                            </button>
                            <button type="button" class="btn btn-default input-group-text" disabled title="<?php echo $this->translate('Erase', 'ppit-core', $context->getLocale()) ?>" id="flEraseButton">
                                <i class="fa fa-times text-center"></i>
                            </button>
                
                            ${renderButtons(context, entity, view)}
                
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    </div>`
}

const renderFilters = (context, entity, view, properties, data) => {
    let filters = []
    for (let propertyId of Object.keys(properties)) {
        const property = properties[propertyId]
        const options = (property.options) ? property.options : []
        const propertyType = (options.type) ? options.type : property.type

        let input
        
        if (["date", "time", "datetime"].includes(propertyType)) {
            input = renderFilterDateTime(context, propertyId, property)
        }

        else if (["age"].includes(propertyType)) {
            input = renderFilterAge(context, propertyId, property)
        }

        else if (["select", "multiselect", "tags"].includes(propertyType)) {
            input = renderFilterSelect(context, propertyId, property, options)
        }        

        else if (["source"].includes(propertyType)) {
            input = renderFilterSource(context, propertyId, property, options)
        }        

        else if (["tag"].includes(propertyType)) {
            input = renderFilterTag(context, propertyId, property, options)
        }        

        else if (["number"].includes(propertyType)) {
            input = renderFilterNumber(context, propertyId, property, options)
        }        

        else {
            input = renderFilterInput(context, propertyId, property, options, properties)
        }        

        filters.push(`<div class="col-md-12">${input}</div>`)
    }

    return filters.join("\n")
}

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

            if (!property.options.options || property.options.options.includes(modalityId)) {
                options.push(`<option value="${modalityId}" class="${clas}" id="search-${propertyId}-${modalityId}">${context.localize(modality)}</option>`)
            }
        }
        return options.join("\n")
    }

    return `${(property.options.value) ? `<input type="hidden" class="searchInputValue" id="searchInputValue-${propertyId}" value="${property.options.value}" />` : ""}
    <input type="hidden" value="0" class="searchCheckValue" id="searchCheckValue-${propertyId}" />
    <div class="mb-3">
        <select class="searchSelect" data-mdb-size="sm" data-mdb-select-init="" multiple="" id="search-${propertyId}" ${(multiple) ? "multiple" : ""}>
            ${(multiple) ? `<option value="empty">-- ${context.translate("Not provided")} --</option>` : ""}
            ${(!multiple) ? `<option value="" class="restrictionParentOption-${propertyId}" id="search-${propertyId}"></option>` : ""}
            ${renderModalities(modalities)}
        </select>
        <label class="form-label select-label">${context.localize(property.labels)}</label>
        
    </div>`
}

/* 
<select data-mdb-size="sm" data-mdb-select-init="" multiple="">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
    <option value="7">Seven</option>
    <option value="8">Eight</option>
</select>
<label class="form-label select-label">Example label</label>
*/

/* 
<select class="form-control form-control-sm searchInput searchInputSelect" id="search-${propertyId}" ${(multiple) ? "multiple" : ""}>
    ${(multiple) ? `<option value="empty">-- ${context.translate("Not provided")} --</option>` : ""}
    ${(!multiple) ? `<option value="" class="restrictionParentOption-${propertyId}" id="search-${propertyId}"></option>` : ""}
    ${renderModalities(modalities)}
</select> 
<label for="search-${propertyId}" class="form-label">${context.localize(property.labels)}</label>
*/

const renderFilterSource = (context, propertyId, property) => {

    return `${(property.options.value) ? `<input type="hidden" class="searchInputValue" id="searchInputValue-${propertyId}" value="${property.options.value}" />` : ""}
    <div class="input-group input-group-sm mb-2 mr-sm-2 searchSelectDynamic" id="searchSelectDiv-${propertyId}">
    </div>`
} 

const renderFilterTag = (context, propertyId, property) => {

    return `<div class="input-group input-group-sm mb-2 mr-sm-2 searchSelectDynamic" id="searchSelectDiv-${propertyId}">
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

const renderDatalist = (propertyId, properties) => {
    const property = properties[propertyId]
    const options = []
    for (let modality of Object.keys(property.distribution)) {
        const { code, value } = property.distribution[modality]
        options.push(`<option value="${code}">${code} (${value})</option>`)
    }
    return options.join("\n")
}

const renderFilterInput = (context, propertyId, property, options, properties) => {
    const datalist = []
    return `<div class="form-outline searchFormOutline mb-3" data-mdb-input-init>
                <input class="form-control form-control-sm" list="searchDatalistOptions-${propertyId}" type="text" />
                <label class="form-label" for="form12">${context.localize(property.labels)}</label>
                <datalist id="searchDatalistOptions-${propertyId}">${renderDatalist(propertyId, properties)}</datalist>
            </div>`
}

/* 
<div class="form-outline mb-3 border rounded" data-mdb-input-init>
    <input class="form-control form-control-sm" list="searchDatalistOptions-${propertyId}" type="text" />
    <label class="form-label" for="form12">${context.localize(property.labels)}</label>
    <datalist id="searchDatalistOptions-${propertyId}">${renderDatalist(propertyId, properties)}</datalist>
</div>*/

/*
<div class="input-group input-group-sm mb-2 mr-sm-2">
    <input type="hidden" value="0" class="searchCheckValue" id="searchCheckValue-${propertyId}" />
    <input class="form-control form-control-sm searchInput searchInputText" placeholder="${context.localize(property.labels)}" list="searchDatalistOptions-${propertyId}" id="search-${propertyId}">
    <datalist id="searchDatalistOptions-${propertyId}">${renderDatalist(propertyId, properties)}</datalist>
</div> 
*/

const renderButtons = (context, entity, view) => {
    let buttons = []
    if (context.config[`${entity}/global/${view}`]) {
        const actions = context.config[`${entity}/global/${view}`]["actions"]
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
    }
    return buttons.join("\n")
}
