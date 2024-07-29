const renderOrderSelect = (context, entity, view, orderParam, properties) => {
    const columns = Object.keys(properties)
    const renderSelectOption = () => {
        const options = []
        for (let propertyId of columns) {
            const property = properties[propertyId]
            options.push(`<option value="${propertyId}">${ context.localize(property.labels) }</option>`)
        }
        return options.join("\n")
    }

    return `<div class="row justify-content-md-center">
        <div class="col-md-4">
            <div class="input-group">
                <select class="form-select form-select-sm flOrderSelect" id="flOrderSelect">
                    <option value=""></option>
                    ${renderSelectOption()}
                </select>
                <span class="input-group-text">
                    <span class="form-check">
                        <input type="checkbox" class="form-check-input flDescendingCheck" id="flDescendingCheck">
                        <label class="form-check-label" for="flDescendingCheck">
                            ${ context.translate("Descending order") }
                        </label>
                    </span>
                </span>
            </div>
        </div>
    </div>`
}

module.exports = {
    renderOrderSelect
}
