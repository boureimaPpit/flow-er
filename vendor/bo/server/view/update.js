const moment = require("moment")

const renderUpdate = (context, entity, view, id, properties, row, isDeletable, whereParam, formJwt) => {

    const renderProperty = () => {

        const html = []

        for (let propertyId of Object.keys(properties)) {

            const property = properties[propertyId]

            const options = property.options
            const label = (options.labels) ? context.localize(options.labels) : context.localize(property.labels)
            const propertyType = (options.type) ? options.type : property.type
            let readonly = (property.options.readonly) ? true : false
            const immutable = (property.options.immutable) ? true : false
            const mandatory = (property.options.mandatory) ? true : false

            let currentDate = new Date()
            const year = currentDate.getFullYear(), month = String(currentDate.getMonth() + 1).padStart(2, "0"), day = String(currentDate.getDate()).padStart(2, "0")
            currentDate = `${year}-${month}-${day}`

            let value = (row[propertyId]) ? row[propertyId] : ""
            if (options.value && !Array.isArray(options.value)) {
                value = options.value
                if (value && value.charAt(5) == "+") value = moment().add(value.substring(6), "days").format("YYYY-MM-DD")
                else if (value && value.charAt(5) == "-") value = moment().subtract(value.substring(6), "days").format("YYYY-MM-DD")
                else value = moment().format("YYYY-MM-DD")    
            }
            if (!id && options.initialValue) {
                value = options.initialValue
                if (value && value.charAt(5) == "+") value = moment().add(value.substring(6), "days").format("YYYY-MM-DD")
                else if (value && value.charAt(5) == "-") value = moment().subtract(value.substring(6), "days").format("YYYY-MM-DD")
                else value = moment().format("YYYY-MM-DD")    
            }
        
            if (!id && readonly) continue
            if (id && immutable) readonly = true
    
            if (propertyType == "title") {
                html.push(`<hr><h5 class="text-center mb-4">${label}</h5>`)
            }
    
            else if (propertyId == "bank_identifier") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateIban" id="${propertyId}" value="${value}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""} placeholder="${context.localize("Uniquement lettres et chiffres sans espaces")}" />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}"></div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "input") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateInput" id="${propertyId}" value="${value}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""} maxlength="${(property.options.max_length) ? property.options.max_length : 255}" />
                        <div class="invalid-feedback" id="inputError-${propertyId} ?>"></div>
                    </div>
                </div>`)
            }
    
            else if (row.id && propertyId == "email" && row.email_validity == -1) {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateEmail" id="${propertyId}" value="${value}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""} maxlength="255" />
                        <p class="text-danger"> Email invalide</p>
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}"></div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "email") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateEmail" id="${propertyId}" value="${value}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""} maxlength="255" />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid email")}</div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "phone") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updatePhone" id="${propertyId}" value="${value}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""} maxlength="255" />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid phone")}</div>
                    </div>
                </div>`)              
            }
        
            else if (["date", "datetime", "closing_date"].includes(propertyType)) {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm"><${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateDate" id="${propertyId}" value="${context.decodeDate(value)}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : "placeholder=\"DD/MM/YYYY\""} autocomplete="off" />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid date")}</div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "birth_year") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <select class="form-control form-control-sm updateBirthYear" id="${propertyId}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""}>
                            <option />
                            ${() => { for (let year = 1950; year < new Date.getFullYear(); year++) `<option value="${year}" ${(value == year) ? "selected=\"selected\"" : ""}>${year}</option>` }}
                        </select>
                    </div>
                </div>`)
            }

            else if (propertyType == "time") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateTime" id="${propertyId}" value="${value}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""} />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid time")}</div>
                    </div>
                </div>`)              
            }
    
            else if (propertyType == "number") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateNumber" id="${propertyId}" value="${context.formatFloat(value, 2)}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""} />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid number")}</div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "textarea") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <textarea class="form-control form-control-sm updateTextarea" rows="5" id="${propertyId}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "* " : ""}${label} maxlength="${(property.options.max_length) ? property.options.max_length : 2047}">${value}</textarea>
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("The input is too long")}</div>
                    </div>
                </div>`)
            }

            else if (propertyType == "select") {
                const multiple = property.multiple
                const values = (value) ? value.split(",") : []
                html.push(`<div class="form-group row" id="updateSelectDiv-${propertyId}">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7 ${(property.source) ? "selectDynamic" : ""}" ${(property.source) ? `id="selectDynamic-${propertyId}"})` : ""}>
            
                    ${(property.modalities) ?
        `<select class="${(!multiple) ? "form-control form-control-sm" : ""} updateSelect" id="${propertyId}" ${(multiple) ? "multiple" : ""} ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""}>
                        <option />
                        ${function () {
        const html = []
        for (let key of Object.keys(property.modalities)) {
            const labels = property.modalities[key]
            let selectable = true
            if (!values[key] && labels.archive) selectable = false                
            if (selectable) {
                html.push(`<option value="${key}" ${(values.includes(key)) ? "selected" : ""} ${(labels.archive) ? "disabled" : ""}>${context.localize(labels)}</option>`)
            }
        }
        return html.join("\n")
    } ()}
                        </select>` : ""}
            
                    </div>
                </div>`)
            }
        
            else if (propertyType == "multiselect") {
                const values = (value) ? value.split(",") : []
                html.push(`<input type="hidden" class="updateSelectedValue" id="updateSelectedValue-${propertyId}" value="${row[propertyId]}" />
                    <div class="form-group row" id="updateSelectDiv-${propertyId}">
                        <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                        <div class="col-sm-7">
                            ${(property.modalities) ?
        `<select class="selectpicker updateSelectpicker updateSelect" id="${propertyId}" multiple ${(readonly) ? "disabled" : ""}>
                                    ${function () {
        const html = []
        for (let key of Object.keys(property.modalities)) {
            const labels = property.modalities[key]
            html.push(`<option value="${key}" ${(values.includes(key)) ? "selected" : ""}>${context.localize(labels)}</option>`)
        }
        return html.join("\n")
    } ()}
                                </select>` : ""}
                        </div>
                    </div>`)
            }
    
            else if (propertyType == "tag") {
                const values = (value) ? value.split(",") : []
                html.push(`<div class="form-group row" id="updateSelectDiv-${propertyId}">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7 selectTags" id="selectTags-${propertyId}">
                        ${`<select class="form-control form-control-sm selectpicker updateSelectpicker updateSelect" id="${propertyId}" multiple data-none-selected-text ${(readonly) ? "disabled" : ""}>
                        ${function () {
        const html = []
        for (let tag of property.tags) {
            html.push(`<option value="${tag.id}" ${(values.includes(tag.id)) ? "selected" : ""}>${tag.name}</option>`)
        }
        return html.join("\n")
    } ()}
                        </select>`}
                    </div>
                </div>`)
            }
    
            else if (propertyType == "source") {
                html.push(`<div class="form-group row" id="updateSelectDiv-${propertyId}">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        ${`<select class="form-control form-control-sm selectpicker updateSelectpicker updateSelect" id="${propertyId}" multiple data-none-selected-text ${(readonly) ? "disabled" : ""}>
                        ${function () {
        const html = []
        for (let modalityId of Object.keys(property.modalities)) {
            const modality = property.modalities[modalityId]
            html.push(`<option value="${modalityId}" ${(value == modalityId) ? "selected" : ""}>${modality}</option>`)
        }
        return html.join("\n")
    } ()}
                        </select>`}
                    </div>
                </div>`)
            }
    
            else if (propertyType == "photo") {
                html.push(`<div class="form-group row photo-group">
                    <label class="col-sm-5 col-form-label col-form-label-sm"></label>
                    <div class="col-sm-7">
                        <img height="150" src="photos/${(row.photo_link_id) ? row.photo_link_id : row.contact_1_id.jpg}" />
                    </div>
                </div>`)
                if (!readonly) {
                    html.push(`<div class="form-group row photo-group">
                        <label class="col-sm-5 col-form-label col-form-label-sm"></label>
                        <div class="col-sm-7">
                            <input type="file" id="${propertyId}" class="form-control form-control-sm updateFile" />
                        </div>
                    </div>`)
                }
            }

            else if (propertyType == "log") {          

                html.push(`<div class="form-group row">
                    <div>${label}</div>
                    <textarea class="form-control form-control-sm updateTextarea" id="${propertyId}" ${(mandatory) ? "required" : ""} maxlength="${(property.options.max_length) ? property.options.max_length : 65535}"></textarea>
                    <input type="hidden" id="updateLogRoute-${propertyId}" value="${property.source.route}?${property.source.query}" />
                    <div class="invalid-feedback text-danger" id="updateError-${propertyId}"></div>
                </div>
                ${($id) ? `<div class="card my-3 text-muted updateLog" id="updateLog-${propertyId}"></div>` : ""}`)
            }

            else {
                html.push(`<div class="form-group row">
                <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                <div class="col-sm-7">
                  <input class="form-control form-control-sm updateInput" id="${propertyId}" value="${value}" ${(readonly) ? "disabled" : ""} ${(mandatory) ? "required" : ""} maxlength="${(property.options.max_length) ? property.options.max_length : 255}" />
                  <div class="invalid-feedback" id="inputError-${propertyId}"></div>
                </div>
              </div>`)
            }
        }

        return html.join("\n")
    }

    return `<form class="was-validated" id="tabForm">

        <input type="hidden" id="formJwt" name="formJwt" value="${formJwt}" />

        <!-- Form status messages -->

        <div class="updateMessage" id="updateMessageOk">
            <h5 class="alert alert-success my-3 text-center">${context.translate("Your request has been registered")}</h5>
        </div>

        <div class="updateMessage" id="updateMessageExpired">
            <h5 class="alert alert-danger my-3 text-center">${context.translate("The form has expired, please input again")}</h5>
        </div>

        <div class="updateMessage" id="updateMessageConsistency">
            <h5 class="alert alert-danger  my-3 text-center">${context.translate("The database has evolved in the meantime, please input again")}</h5>
        </div>

        <div class="updateMessage" id="updateMessageDuplicate">
            <h5 class="alert alert-danger  my-3 text-center">${context.translate("The data already exists")}</h5>
        </div>

        <div class="updateMessage" id="updateMessageServerError">
            <h5 class="alert alert-danger  my-3 text-center">${context.translate("A technical error has occured. PLease try again later")}</h5>
        </div>

        ${(id) ? `<input type="hidden" id="update_time" value="${row.update_time.toISOString().slice(0, 19).replace("T", " ")}" />` : ""}

        <div class="my-3">

            <div class="form-group row submitDiv">
                <div class="col-sm-5">&nbsp;</div>
                <div class="col-sm-7">
                    <input name="submit" type="submit" id="upSubmitButton" class="btn btn-warning submitButton" value="${context.translate((id) ? "Update" : "Add")}">
                </div>
            </div>

            <div class="form-group row submitSpinner">
                <div class="col-sm-5">&nbsp;</div>
                <div class="col-sm-7">
                    <div class="spinner-border" role="status">
                    <span class="sr-only">${context.translate("Loading")}...</span>
                </div>
            </div>
        </div>

        ${renderProperty()}

        <div class="form-group row submitDiv">
            <div class="col-sm-5">&nbsp;</div>
            <div class="col-sm-7">
                <input name="submit" type="submit" id="submitButton" class="btn btn-warning submitButton" value="${context.translate((id) ? "Update" : "Add")}">
            </div>
        </div>

        <div class="form-group row submitSpinner">
            <div class="col-sm-5">&nbsp;</div>
            <div class="col-sm-7">
            <div class="spinner-border" role="status">
                <span class="sr-only">${context.translate("Loading")}...</span>
            </div>
        </div>
    </form>`
}

module.exports = {
    renderUpdate
}