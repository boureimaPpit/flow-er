const { renderHead } = require("./renderHead")
const { renderCore } = require("./renderCore")
const moment = require("moment")

const renderForm = (context, entity, view, properties, where, formJwt) => {

    const renderSection = () => {

        let addConfig = context.config[`${entity}/form/${view}`]
        const html = []

        for (let sectionId of Object.keys(addConfig.layout)) {
            const section = addConfig.layout[sectionId]
            if (section.labels) {
                html.push(`<hr>
                <div class="row">
                    <div class="col-sm-11">
                        <h5 id="${sectionId}" class="text-center mb-4">${ context.localize(section.labels) }</h5>
                    </div>
                </div>`)
            }
            html.push(renderProperty(section.properties))
        }

        return html.join("\n")
    }

    const renderProperty = (section) => {

        const html = []

        for (let propertyId of section) {

            const property = properties[propertyId]
            const options = property.options
            const label = (options.labels) ? context.localize(options.labels) : context.localize(property.labels)
            const propertyType = (options.type) ? options.type : property.type
            const immutable = (property.options.immutable) ? true : false
            const mandatory = (property.options.mandatory) ? true : false

            let currentDate = new Date()
            const year = currentDate.getFullYear(), month = String(currentDate.getMonth() + 1).padStart(2, "0"), day = String(currentDate.getDate()).padStart(2, "0")
            currentDate = `${year}-${month}-${day}`

            let value = ""
            if (options.value && !Array.isArray(options.value)) {
                value = options.value
                if (value && value.charAt(5) == "+") value = moment().add(value.substring(6), "days").format("YYYY-MM-DD")
                else if (value && value.charAt(5) == "-") value = moment().subtract(value.substring(6), "days").format("YYYY-MM-DD")
                else value = moment().format("YYYY-MM-DD")    
            }
            if (options.initialValue) {
                value = options.initialValue
                if (value && value.charAt(5) == "+") value = moment().add(value.substring(6), "days").format("YYYY-MM-DD")
                else if (value && value.charAt(5) == "-") value = moment().subtract(value.substring(6), "days").format("YYYY-MM-DD")
                else value = moment().format("YYYY-MM-DD")    
            }

            else if (propertyType == "title") {
                html.push(`<hr><h5 class="text-center mb-4">${label}</h5>`)
            }
    
            else if (propertyId == "bank_identifier") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateIban" id="${propertyId}" value="${value}" ${(mandatory) ? "required" : ""} placeholder="${context.localize("Uniquement lettres et chiffres sans espaces")}" />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}"></div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "input") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateInput" id="${propertyId}" value="${value}" ${(mandatory) ? "required" : ""} maxlength="${(property.options.max_length) ? property.options.max_length : 255}" />
                        <div class="invalid-feedback" id="inputError-${propertyId} ?>"></div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "email") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateEmail" id="${propertyId}" value="${value}" ${(mandatory) ? "required" : ""} maxlength="255" />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid email")}</div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "phone") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updatePhone" id="${propertyId}" value="${value}" ${(mandatory) ? "required" : ""} maxlength="255" />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid phone")}</div>
                    </div>
                </div>`)              
            }
        
            else if (["date", "datetime", "closing_date"].includes(propertyType)) {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateDate" id="${propertyId}" value="${context.decodeDate(value)}" ${(mandatory) ? "required" : "placeholder=\"DD/MM/YYYY\""} autocomplete="off" />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid date")}</div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "birth_year") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <select class="form-control form-control-sm updateBirthYear" id="${propertyId}" ${(mandatory) ? "required" : ""}>
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
                        <input class="form-control form-control-sm updateTime" id="${propertyId}" value="${value}" ${(mandatory) ? "required" : ""} />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid time")}</div>
                    </div>
                </div>`)              
            }
    
            else if (propertyType == "number") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <input class="form-control form-control-sm updateNumber" id="${propertyId}" value="${value}" ${(mandatory) ? "required" : ""} />
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("Missing or invalid number")}</div>
                    </div>
                </div>`)
            }
    
            else if (propertyType == "textarea") {
                html.push(`<div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">
                        <textarea class="form-control form-control-sm updateTextarea" rows="5" id="${propertyId}" ${(mandatory) ? "* " : ""}${label} maxlength="${(property.options.max_length) ? property.options.max_length : 2047}">${value}</textarea>
                        <div class="invalid-feedback text-danger" id="inputError-${propertyId}">${context.translate("The input is too long")}</div>
                    </div>
                </div>`)
            }

            else if (propertyType == "select") {
                const multiple = property.multiple
                const values = (value) ? value.split(",") : []
                html.push(`<div class="form-group row" id="updateSelectDiv-${propertyId}">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7">            
                        <select class="${(!multiple) ? "form-control form-control-sm" : ""} updateSelect" id="${propertyId}" ${(multiple) ? "multiple" : ""} ${(mandatory) ? "required" : ""}>
                            <option />
    ${function () {
        const restriction = (property.options.restriction) ? property.options.restriction : {}
        const html = []
        for (let key of Object.keys(property.modalities)) {
            let keep = true
            if (restriction[key]) {
                for (let filterId of Object.keys(restriction[key])) {
                    if (where[filterId]) {
                        if (restriction[key][filterId] && !restriction[key][filterId].includes(where[filterId][0])) keep = false
                    }
                }
            }
            const labels = property.modalities[key]
            let selectable = true
            if (!values[key] && labels.archive) selectable = false                
            if (selectable && keep) {
                html.push(`<option value="${key}" ${(values.includes(key)) ? "selected" : ""} ${(labels.archive) ? "disabled" : ""}>${context.localize(labels)}</option>`)
            }
        }
        return html.join("\n")
    } ()}
                        </select>            
                    </div>
                </div>`)
            }
        
            else if (propertyType == "multiselect") {
                const values = (value) ? value.split(",") : []
                html.push(`<input type="hidden" class="updateSelectedValue" id="updateSelectedValue-${propertyId}" />
                    <div class="form-group row" id="updateSelectDiv-${propertyId}">
                        <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                        <div class="col-sm-7">
                            ${(property.modalities) ?
        `<select class="selectpicker updateSelectpicker updateSelect" id="${propertyId}" multiple>
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
                html.push(`<div class="form-group row" id="updateSelectDiv-${propertyId}">
                    <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                    <div class="col-sm-7 selectTags" id="selectTags-${propertyId}">
                        ${`<select class="form-control form-control-sm selectpicker updateSelectpicker updateSelect" id="${propertyId}" multiple data-none-selected-text>
                            <option />
    ${function () {
        const html = []
        for (let tag of property.tags) {
            const vectorId = property.vector
            const ids = tag[vectorId]
            const tagKey = (property.key) ? property.key : "id"
            const selected = false
            html.push(`<option value="${tag.id}" ${(selected) ? "selected" : ""}>${tag.name}</option>`)
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
                        ${`<select class="form-control form-control-sm updateSelect" id="${propertyId}">
                            <option />
    ${function () {
        const restriction = (property.options.restriction) ? property.options.restriction : {}
        const html = []
        for (let modalityId of Object.keys(property.modalities)) {
            let keep = true
            if (restriction[modalityId]) {
                for (let filterId of Object.keys(restriction[modalityId])) {
                    if (where[filterId]) {
                        if (restriction[modalityId][filterId] && !restriction[modalityId][filterId].includes(where[filterId][0])) keep = false
                        console.log(propertyId, modalityId, keep, restriction[modalityId], filterId, where[filterId])
                    }
                }
            }
            const modality = property.modalities[modalityId]
            if (keep) {
                html.push(`<option value="${modalityId}" ${(value == modalityId) ? "selected" : ""}>${modality}</option>`)
            }
        }
        return html.join("\n")
    } ()}
                        </select>`}
                    </div>
                </div>`)
            }

            else if (propertyType == "history") {          

                html.push(`<div class="form-group row">
                    <div>${label}</div>
                    <textarea class="form-control form-control-sm updateTextarea" id="${propertyId}" ${(mandatory) ? "required" : ""} maxlength="${(property.options.max_length) ? property.options.max_length : 65535}"></textarea>
                    <input type="hidden" id="updateHistoryRoute-${propertyId}" value="/bo/history/${property.entity}/1" />
                    <div class="invalid-feedback text-danger" id="updateError-${propertyId}"></div>
                </div>`)
            }

            else {
                html.push(`<div class="form-group row">
                <label class="col-sm-5 col-form-label col-form-label-sm">${(mandatory) ? "* " : ""}${label}</label>
                <div class="col-sm-7">
                  <input class="form-control form-control-sm updateInput" id="${propertyId}" value="${value}" ${(mandatory) ? "required" : ""} maxlength="${(property.options.max_length) ? property.options.max_length : 255}" />
                  <div class="invalid-feedback" id="inputError-${propertyId}"></div>
                </div>
              </div>`)
            }
        }

        return html.join("\n")
    }

    const html = [`<!DOCTYPE html>
    <html lang="fr">
    
    <!-- Head -->
    ${renderHead(context, entity, view)}
    
    <body>`]

    html.push(`<form class="has-validation" id="tabForm">

        ${renderSection()}

        <div class="form-group row submitDiv">
            <div class="col-sm-5">&nbsp;</div>
            <div class="col-sm-7">
                <input name="submit" type="submit" id="submitButton" class="btn btn-warning submitButton" value="${context.translate("Add")}">
            </div>
        </div>

        <div class="form-group row submitSpinner">
            <div class="col-sm-5">&nbsp;</div>
            <div class="col-sm-7">
            <div class="spinner-border" role="status">
                <span class="sr-only">${context.translate("Loading")}...</span>
            </div>
        </div>
    </form>`)

    html.push(`</div><hr></body>

    <!-- Scripts -->
    ${renderCore(context, entity, view)}

    </html>`)

    return html.join("\n")
}

module.exports = {
    renderForm
}