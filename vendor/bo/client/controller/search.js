const encodeDate = (value) => {
    return value.substr(6, 4) + "-" + value.substr(3, 2) + "-" + value.substr(0, 2)
}

const getSearchParams = () => {

    const searchParams = {}

    // all_search_filter_type: The criteria can be of the types : modality, date range, open-text. The criteria of type modality are
    // multi-selectable. The criteria of type open-text are considered as substrings (at least 2 characters) of the searched data.
    
    $(".searchInputSelect").each(function () {
        if ($(this).attr("id")) {
            let propertyId = $(this).attr("id").split("-")[1]
            let checked = $("#searchCheckValue-" + propertyId).val()
            let value = $("#search-" + propertyId).val()

            if (Array.isArray(value)) {
                value = value.map(values => {
                    if (values == "empty") {
                        return "" 
                    }
                    else
                        return values
                })
                value = value.join(",")
            }
          
            if (checked == "1" ) {         
                var isMultiple = $(this).attr("multiple")
                if (typeof isMultiple !== "undefined" && isMultiple !== false) {
                    searchParams[propertyId] = value
                }
                else {
                    searchParams[propertyId] = value
                }
            }
        }
    })

    $(".searchTagSelect").each(function () {
        if ($(this).attr("id")) {
            const propertyId = $(this).attr("id").split("-")[1]
            const checked = $("#searchCheckValue-" + propertyId).val()
            const value = $("#search-" + propertyId).val()
            let ids = ["in"]
            if (checked == "1") {
                for (const accountId of value) {
                    ids.push($(`#searchSelectTagsIds-${propertyId}-${accountId}`).val())
                }
                searchParams["id"] = ids.join(",")
            }
        }
    })

    $(".searchInputText").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#search-" + propertyId).val()
        if (value.length >= 2 || checked == "1") { searchParams[propertyId] = `contains,${value}` }
    })

    $(".searchInputTextStart").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#search-" + propertyId).val()
        if (value.length >= 2 || checked == "1") { searchParams[propertyId] = `startsWith,${value}` }
    })

    $(".searchInputTextEnd").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#search-" + propertyId).val()
        if (value.length >= 2 || checked == "1") { searchParams[propertyId] = `endsWith,${value}` }
    })

    $(".searchInputTextMin").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#searchMin-" + propertyId).val()
        if (value.length >= 2 || checked == "1") { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][0] = value
        }
    })

    $(".searchInputTextMax").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#searchMax-" + propertyId).val()
        if ((value.length >= 2 || checked == "1") && value) {
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][1] = value
        }
    })

    $(".searchInputDateMin").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#searchMin-" + propertyId).val()
        if (value) value = encodeDate(value)
        if ((value.length >= 2 || checked == "1") && value) {
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][0] = value
        }
    })

    $(".searchInputDateMax").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#searchMax-" + propertyId).val()
        if (value) value = encodeDate(value)
        if ((value.length >= 2 || checked == "1") && value) { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][1] = value
        }
    })

    $(".searchInputAgeMin").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#searchMin-" + propertyId).val()
        if (value) {
            const date = new Date()
            let year = new Date.getFullYear() - value, month = String(date.getMonth() + 1).padStart(2, "0"), day = String(date.getDate()).padStart(2, "0")
            if (month == "02" && day == "29") day = "28"
            value = `${year}-${month}-${day}`
        }
        if ((value.length >= 2 || checked == "1") && value) { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][0] = value
        }
    })

    $(".searchInputAgeMax").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#searchMax-" + propertyId).val()
        if (value) {
            const date = new Date()
            let year = new Date.getFullYear() - value, month = String(date.getMonth() + 1).padStart(2, "0"), day = String(date.getDate()).padStart(2, "0")
            if (month == "02" && day == "29") day = "28"
            value = year + "-" + month + "-" + day
        }
        if ((value.length >= 2 || checked == "1") && value) { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][1] = value
        }
    })

    $(".searchInputNumberMin").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#searchMin-" + propertyId).val()
        if (checked == "1" && value) { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][0] = value
        }
    })

    $(".searchInputNumberMax").each(function () {
        let propertyId = $(this).attr("id").split("-")[1]
        let checked = $("#searchCheckValue-" + propertyId).val()
        let value = $("#searchMax-" + propertyId).val()
        if (checked == "1" && value) {
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][1] = value
        }
    })

    if (Object.keys(searchParams).length == 0) {
        const listWhereHidden = $("#listWhereHidden").val()
        if (listWhereHidden) {
            for (const pair of $("#listWhereHidden").val().split("|")) {
                const key = pair.split(":")[0], value = pair.split(":")[1]
                searchParams[key] = value
            }
        }
    }

    return searchParams
}

const searchSelectTags = (propertyId, restrictions, continuations = {}) => {
    const xhttp = new XMLHttpRequest(), route = getSearchTagsRoute(propertyId)
    xhttp.open("GET", route, true)
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 401) getLogin(loadPage)
            else if (xhttp.status == 200) {

                if (xhttp.statusText.substring(0, 3) == "jwt") {
                    document.cookie = `JWT-${$("#instanceCaption").val()}${xhttp.statusText.substring(4)};path=/`
                }
                const data = JSON.parse(xhttp.responseText)

                $(`#searchSelectDiv-${propertyId}`).html(renderSearchTags(propertyId, data, restrictions))

                $(`#search-${propertyId}`).selectpicker()
                $(`#search-${propertyId}`).change(function () {
                    $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
                    $("#refreshButton").attr("disabled", false)
                    $("#eraseButton").removeClass("btn-default").addClass("btn-success")
                    $("#eraseButton").attr("disabled", false)
                    $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
                    $("#searchCheckValue-" + propertyId).val("1")
                    $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
                })
                $(`#searchCheck-${propertyId}`).click(function() {
                    $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
                    $("#refreshButton").attr("disabled", false)
                    $("#eraseButton").removeClass("btn-default").addClass("btn-success")
                    $("#eraseButton").attr("disabled", false)
                    const check = `searchCheckValue-${propertyId}`
                    if ($("#" + check).val() == "1") {
                        $(this).removeClass("btn-secondary").addClass("btn-default").removeClass("active")
                        $("#" + check).val("0")
                        $("#search-" + propertyId).val("")
                        $("#searchMin-" + propertyId).val("")
                        $("#searchMax-" + propertyId).val("")
                        $("#search-" + propertyId).selectpicker("refresh")
                    }
                    else {
                        $(this).removeClass("btn-default").addClass("btn-secondary").addClass("active")
                        $("#" + check).val("1")
                    }
                    $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
                })

                for (const key of Object.keys(continuations)) {
                    if (propertyId == key) {
                        const continuation = continuations[key]
                        for (const key of Object.keys(continuation)) {
                            $(`#search-${key}`).change(() => {
                                const restrictions = {}
                                for (const restrictionKey of Object.keys(continuation)) {
                                    const val = $(`#search-${restrictionKey}`).val()
                                    if (val.length) restrictions[continuation[restrictionKey]] = val
                                }
                                searchSelectTags(propertyId, restrictions)
                            })
                        } 
                    }
                }
            }
        }
    }
    xhttp.send()
}

const searchSelectDynamic = async (context, entity, view, propertyId, restrictions, continuations = {}) => {

    const sourceConfig = context.config[`${entity}/property/${propertyId}`]
    sourceConfig.options = context.config[`${entity}/search/${view}`].properties[propertyId]

    const query = []
    if (sourceConfig.where) query.push(`where=${sourceConfig.where}`)
    if (sourceConfig.order) query.push(`order=${sourceConfig.order}`)
    const format = sourceConfig.format[0].split("%s"), paramKeys = sourceConfig.format[1].split(","), params = []
    for (let key of paramKeys) params[key] = context.config[`${sourceConfig.entity}/property/${key}`]
    query.push(`columns=${sourceConfig.format[1]}`)

    const response = await fetch(`/bo/api/${sourceConfig.entity}?${query.join("&")}`)
    const modalities = {}
    for (let row of await response.json()) {
        const key = (sourceConfig.key) ? sourceConfig.key : "id"
        const value = []
        for (let i = 0; i < format.length; i++) {
            value.push(format[i])
            if (i < format.length - 1) {
                const argument = row[paramKeys[i]], param = params[paramKeys[i]]
                if (param.type == "select") value.push(context.localize(param.modalities[argument]))
                else value.push(argument)
            }
        }
        modalities[row[key]] = value.join("")
    }

    $(`#searchSelectDiv-${propertyId}`).html(renderSearchSelect(context, propertyId, sourceConfig, modalities, restrictions))

    $(`#search-${propertyId}`).selectpicker()
    $(`#search-${propertyId}`).change(function () {
        $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
        $("#refreshButton").attr("disabled", false)
        $("#eraseButton").removeClass("btn-default").addClass("btn-success")
        $("#eraseButton").attr("disabled", false)
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })
    $(`#searchCheck-${propertyId}`).click(function() {
        $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
        $("#refreshButton").attr("disabled", false)
        $("#eraseButton").removeClass("btn-default").addClass("btn-success")
        $("#eraseButton").attr("disabled", false)
        const check = `searchCheckValue-${propertyId}`
        if ($("#" + check).val() == "1") {
            $(this).removeClass("btn-secondary").addClass("btn-default").removeClass("active")
            $("#" + check).val("0")
            $("#search-" + propertyId).val("")
            $("#searchMin-" + propertyId).val("")
            $("#searchMax-" + propertyId).val("")
            $("#search-" + propertyId).selectpicker("refresh")
        }
        else {
            $(this).removeClass("btn-default").addClass("btn-secondary").addClass("active")
            $("#" + check).val("1")
        }
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    for (const key of Object.keys(continuations)) {
        if (propertyId == key) {
            const continuation = continuations[key]
            for (const key of Object.keys(continuation)) {
                $(`#search-${key}`).change(() => {
                    const restrictions = {}
                    for (const restrictionKey of Object.keys(continuation)) {
                        const val = $(`#search-${restrictionKey}`).val()
                        if (val.length) restrictions[continuation[restrictionKey]] = val
                    }
                    searchSelectDynamic(context, entity, view, propertyId, restrictions)
                })
            } 
        }
    }
}

const getSearch = async (context, entity, view) => {
    let route = $("#searchRoute").val()

    let response = await fetch(route)
    if (!response.ok) {
        switch (response.status) {
        case 401:
            getLogin(loadPage)
            return
        case 500:
            toastr.error("A technical error has occured. PLease try again later")
            return
        }
    }

    const html = await response.text()
    $("#searchPanel").html(html)

    let refresh = function () {
        $("#refreshButton").removeClass("btn-warning").addClass("btn-default")
        $("#refreshButton").attr("disabled", "disabled")
        getList(getSearchParams())
    }
    // Trigger the Entry key event that refreshes the list
    $(document).keyup(function(e) {    
        if (e.keyCode == 13) {
            refresh()
        }
    })
    
    // Connect the refresh button that refreshes the list
    $("#refreshButton").click(refresh)

    // Connect the erase button that reset all the search engine inputs and checks and refresh the list
    $("#eraseButton").click(function() {
        $(".searchInput").val("")
        $(".searchSelectpicker").selectpicker("refresh")
        $(".searchCheckValue").val("0")
        $(".searchCheck").removeClass("btn-secondary").addClass("btn-default").removeClass("active")
        getList(getSearchParams())
    })

    $(".searchSelectpicker").selectpicker("refresh")
    
    // Connect the date picker on date inputs
    $(".searchInputDate").datepicker()

    // Trigger the change event on date inputs and refresh the list
    $(".searchInputDate").change(function () {
        var propertyId = $(this).attr("id").split("-")[1]
        $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
        $("#refreshButton").attr("disabled", false)
        $("#eraseButton").removeClass("btn-default").addClass("btn-success")
        $("#eraseButton").attr("disabled", false)
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    $(".searchInputAge").keyup(function () {
        var propertyId = $(this).attr("id").split("-")[1]
        $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
        $("#refreshButton").attr("disabled", false)
        $("#eraseButton").removeClass("btn-default").addClass("btn-success")
        $("#eraseButton").attr("disabled", false)
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    // Trigger the change event on number inputs and refresh the list
    $(".searchInputNumber").change(function () {
        var propertyId = $(this).attr("id").split("-")[1]
        $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
        $("#refreshButton").attr("disabled", false)
        $("#eraseButton").removeClass("btn-default").addClass("btn-success")
        $("#eraseButton").attr("disabled", false)
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    // Trigger the change event on select inputs and refresh the list
    $(".searchInputSelect").change(function () {
        var propertyIdAttr = $(this).attr("id")
        if (propertyIdAttr) {
            var propertyId = propertyIdAttr.split("-")[1]
            $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
            $("#refreshButton").attr("disabled", false)
            $("#eraseButton").removeClass("btn-default").addClass("btn-success")
            $("#eraseButton").attr("disabled", false)
            $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
            $("#searchCheckValue-" + propertyId).val("1")
            $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
        }
    })

    // Trigger the keyup event on text inputs and refresh the list
    $(".searchInputText").keyup(function () {
        var propertyId = $(this).attr("id").split("-")[1]
        $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
        $("#refreshButton").attr("disabled", false)
        $("#eraseButton").removeClass("btn-default").addClass("btn-success")
        $("#eraseButton").attr("disabled", false)
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    // Trigger the click event on per-property checks (allowing to search on empty values) and refresh the list
    $(".searchCheck").click(function() {
        $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
        $("#refreshButton").attr("disabled", false)
        $("#eraseButton").removeClass("btn-default").addClass("btn-success")
        $("#eraseButton").attr("disabled", false)
        var propertyId = $(this).attr("id").split("-")[1], check = "searchCheckValue-" + propertyId
        if ($("#" + check).val() == "1") {
            $(this).removeClass("btn-secondary").addClass("btn-default").removeClass("active")
            $("#" + check).val("0")
            $("#search-" + propertyId).val("")
            $("#searchMin-" + propertyId).val("")
            $("#searchMax-" + propertyId).val("")
            $("#search-" + propertyId).selectpicker("refresh")
        }
        else {
            $(this).removeClass("btn-default").addClass("btn-secondary").addClass("active")
            $("#" + check).val("1")
        }
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    $(".searchSelectTags").each(function () {
        const propertyId = $(this).attr("id").split("-")[1]
        searchSelectTags(propertyId, {}, {}/*getSearchRestrictions(propertyId)*/)
    })

    $(".searchSelectDynamic").each(function () {
        const propertyId = $(this).attr("id").split("-")[1]
        searchSelectDynamic(context, entity, view, propertyId, {}, {}/*getSearchRestrictions(propertyId)*/)
    })

    // Connect the global actions buttons
    $(".globalButton").click(function () {
        const actionId = $(this).attr("id").split("-")[1]
        getGlobal(actionId)
    })

    //Connect the comment actions buttons 
    $(".commentButton").click(function () {
        const actionId = $(this).attr("id").split("-")[1]
        getComment(actionId)
    })
}
