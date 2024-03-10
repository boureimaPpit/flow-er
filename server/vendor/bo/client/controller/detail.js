const selectTags = (propertyId, prefix, id) => {
    const xhttp = new XMLHttpRequest(), route = getUpdateTagsRoute(propertyId)
    const segmented = route.split("$%7B")
    let evaluatedRoute = [segmented[0]]
    for (let i = 1; i < segmented.length; i++) {
        const splitted = segmented[i].split("%7D")
        evaluatedRoute.push($(`#${prefix}${splitted[0]}`).val())
        evaluatedRoute.push(splitted[1])
    }
    xhttp.open("GET", evaluatedRoute.join(""), true)
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 401) getLogin(loadPage)
            else if (xhttp.status == 200) {
                const data = JSON.parse(xhttp.responseText)
                $(`#selectTags-${propertyId}`).html(renderUpdateTags(propertyId, data, id))
                $(`#${propertyId}`).selectpicker()
            }
        }
    }
    xhttp.send()
}

const selectDynamic = (propertyId, prefix) => {
    const xhttp = new XMLHttpRequest(), route = getRoute(propertyId)
    const segmented = route?.split("$%7B") || [];
    let evaluatedRoute = [segmented[0]]
    for (let i = 1; i < segmented.length; i++) {
        const splitted = segmented[i].split("%7D")
        evaluatedRoute.push($(`#${prefix}${splitted[0]}`).val())
        evaluatedRoute.push(splitted[1])
    }
    xhttp.open("GET", evaluatedRoute.join(""), true)
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 401) getLogin(loadPage)
            else if (xhttp.status == 200) {

                if (xhttp.statusText.substring(0, 3) == "jwt") {
                    document.cookie = `JWT-${$("#instanceCaption").val()}${xhttp.statusText.substring(4)};path=/`
                }
                const data = JSON.parse(xhttp.responseText)
                const selectedValue = $(`#updateSelectedValue-${propertyId}`).val()
                $(`#selectDynamic-${propertyId}`).html(renderUpdateSelect(propertyId, data, selectedValue))
                $(`#${propertyId}`).selectpicker()
                //trigerUpdateSelectChange(propertyId)
            }
        }
    }
    xhttp.send()
}

const getSelect = (propertyId) => {
    const xhttp = new XMLHttpRequest()
    const route = $("#updateSelectRoute-" + propertyId).val()
    xhttp.open("GET", route, true)
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 401) {
                $(".modal-body").html("")
                $("#listDetailModalForm").modal("hide")
                getLogin(loadPage)
            }
            else if (xhttp.status == 200) {

                if (xhttp.statusText.substring(0, 3) == "jwt") {
                    document.cookie = `JWT-${$("#instanceCaption").val()}${xhttp.statusText.substring(4)};path=/`
                }

                $("#updateSelectDiv-" + propertyId).html(xhttp.responseText)
                $(".updateSelectpicker-" + propertyId).selectpicker()
                if (propertyId == "place_id") $(`#${propertyId}`).change(function () { selectDynamic("owner_id", "") })
            }
            else toastr.error("A technical error has occured. PLease try again later")
        }
    }
    xhttp.send()
}

const postTab = (tab, id) => {
    const form = document.getElementById("tabForm")
    if (form) {
        form.onsubmit = function(event) {
        
            event.preventDefault();
            form.checkValidity();
            var validity = true;

            // IBAN check
            $(".inputIban").each( function () {
                const iban = $(this).val();
                if (iban && controleIBAN($(".inputIban").val()) != 0) validity = false; 
            });

            if (validity) {

                $(".submitDiv").hide()
                $(".submitSpinner").show()

                // Create a new FormData object.
                var formData = new FormData()
                formData.append("formJwt", $("#formJwt").val())
                formData.append("update_time", $("#update_time").val())

                $(".updateInput").each(function () {
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, $(this).val())
                })

                $(".updateIban").each(function () {
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, $(this).val())
                })

                $(".updateEmail").each(function () {
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, $(this).val())
                })
                
                $(".updatePhone").each(function () {
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, $(this).val())
                })

                $(".updateDate").each(function () {
                    const propertyId = $(this).attr("id"), val = $(this).val()
                    if (val) formData.append(propertyId, val.substring(6, 10) + "-" + val.substring(3, 5) + "-" + val.substring(0, 2))
                    else formData.append(propertyId, 0)
                })

                $(".updateDatetimeDate").each(function () {
                    const propertyId = $(this).attr("id"), dateval = $(this).val(), timeval = $(`#updateDatetimeTime-${propertyId}`).val()
                    if (dateval) formData.append(propertyId, `${dateval.substring(6, 10)}-${dateval.substring(3, 5)}-${dateval.substring(0, 2)} ${timeval}`)
                    else formData.append(propertyId, 0)
                })
                
                $(".updateBirthYear").each(function () { 
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, ($(this).val()) ? $(this).val() + "-01-01" : "")
                })

                $(".updateNumber").each(function () {
                    const propertyId = $(this).attr("id")
                    const value = $(this).val().replace(",", ".")
                    formData.append(propertyId, value)
                })

                $(".updateTime").each(function () {
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, $(this).val())
                })
                
                $(".updateSelect").each(function () {
                    const propertyId = $(this).attr("id")
                    if (propertyId) formData.append(propertyId, $(this).val())
                })

                $(".updateTags").each(function () {
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, $(this).val())
                })
                
                $(".updateTextarea").each(function () {
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, $(this).val())
                })

                $(".updateCheck").each(function () {
                    const propertyId = $(this).attr("id")
                    formData.append(propertyId, $(this).prop("checked") ? 1 : 0)
                })
                
                $(".updateFile").each(function () {
                    const propertyId = $(this).attr("id")
                    const fileSelect = document.getElementById(propertyId)
                    if (fileSelect) {
                        var files = fileSelect.files
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i]
                            formData.append(propertyId, file, file.name)
                        }
                    }
                })

                $(".user-update-input").each(function (e) {
                    let propertyId = $(this).attr("id"), val = $("#" + propertyId).val()
                    if (val.length > 255) {
                        $("#" + propertyId + "_group").addClass("has-error")
                        $("#" + propertyId + "_error").html("The input is too long")
                        $("#" + propertyId + "_error").css("display", "block")
                        $("#" + propertyId).focus()
                        validity = false
                    }
                    else {
                        formData.append(propertyId, $("#" + propertyId).val())
                        $("#" + propertyId + "_error").css("display", "none")
                    }
                })

                $(".user-update-check").each(function () {
                    let propertyId = $(this).attr("id"), checked = ($("#" + propertyId).prop("checked") ? 1: 0)
                    formData.append(propertyId, checked)
                })

                $(".user-update-select").each(function () {
                    let propertyId = $(this).attr("id"), val = $("#" + propertyId).val()
                    formData.append(propertyId, $("#" + propertyId).val())
                })

                $(".user-update-textarea").each(function () {
                    let propertyId = $(this).attr("id"), val = $("#" + propertyId).val()
                    if (val.length > 65535) {
                        $("#" + propertyId + "_group").addClass("has-error")
                        $("#" + propertyId + "_error").html("The input is too long")
                        $("#" + propertyId + "_error").css("display", "block")
                        $("#" + propertyId).focus()
                        validity = false
                    }
                    else {
                        formData.append(propertyId, $("#" + propertyId).val())
                        $("#" + propertyId + "_error").css("display", "none")
                    }
                })

                /*
                 * - AccountController -> updateUserAction
                 **/

                let route = $(`#detailTabRoute-${tab}`).val() + "?tab=<?= $tab ?>"
                let ControllerTypeId = $(`#detailTabControllerTypeId-${tab}`).val()
                let foreignKeyId = $(`#foreignKeyProperty-${id}-${ControllerTypeId}`).val()
                if(!!foreignKeyId){
                    route = $(`#detailTabRouteControllerTypeId-${tab}`).val()+ "/" + foreignKeyId + "?tab=<?= $tab ?>"
                }

                let ControllerTypeIdQuery = $(`#detailTabControllerTypeIdQuery-${tab}`).val()
                if(!!ControllerTypeIdQuery){
                    let foreignKeyIdQuery = $(`#foreignKeyProperty-${id}-${ControllerTypeIdQuery}`).val()
                    if(!!foreignKeyIdQuery){
                        route = $(`#detailTabRouteControllerTypeIdQuery-${tab}`).val()+ "?"+ControllerTypeIdQuery+"="+foreignKeyIdQuery+"&tab=<?= $tab ?>"
                    }
                }

                var xhttp = new XMLHttpRequest()
                //const route = $(`#detailTabRoute-${tab}`).val()
                xhttp.open("POST", route, true)
                xhttp.onload = function () {
                    if (xhttp.readyState == 4) {
                        if (xhttp.status == 200) {

                            if (xhttp.statusText.substring(0, 3) == "jwt") {
                                document.cookie = `JWT-${$("#instanceCaption").val()}${xhttp.statusText.substring(4)};path=/`
                            }

                            if (id == 0) id = xhttp.responseText
                            getTab(tab, id, "ok")
                        }
                        else if (xhttp.status == 401) getTab(tab, id, "expired")
                        else if (xhttp.status == 409) getTab(tab, id, xhttp.statusText)
                        else getTab(tab, id, "serverError")
                    }
                };
                xhttp.send(formData)
            }
            else return false
        }
    }
}

const submitDelete = (id) => {
    const formData = new FormData()
    formData.append("formJwt", $("#formJwt").val())
    formData.append("update_time", $("#update_time").val())

    const xhttp = new XMLHttpRequest()
    const route = $(`#deleteRoute-${id}`).val()
    xhttp.open("POST", route, true)
    xhttp.onload = function () {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {

                if (xhttp.statusText.substring(0, 3) == "jwt") {
                    document.cookie = `JWT-${$("#instanceCaption").val()}${xhttp.statusText.substring(4)};path=/`
                }

                $(".modal-body").html("")
                $("#listDetailModalForm").modal("hide")
            }
            else if (xhttp.status == 401) getTab(tab, id, "expired")
            else if (xhttp.status == 409) getTab(tab, id, "consistency")
            else getTab(tab, id, "serverError")
        }
    }
    xhttp.send(formData)
}

const getTab = (tab, id, message) => {

    let route = $(`#detailTabRoute-${tab}`).val() + "?"
    const xhttp = new XMLHttpRequest()
    let restrictions = $("#detailTabRestrictions").val()
    if (restrictions) {
        restrictions = restrictions.split(",")
        restrictionsQuery = []        
        for (const restriction of restrictions) {
            const value = $(`#search-${restriction}`).val()
            if (value.length > 0) restrictionsQuery.push(`${restriction}:${value}`)
        }
        route += "&restrictions=" + restrictionsQuery.join("|")
    }

    let params = []
    for (const key of Object.keys([] /*searchParams*/)) {
        let value = searchParams[key]
        if (Array.isArray(value)) {
            if (value[0] == null) value = `le,${value[1]}`
            else if (value[1] == null) value = `ge,${value[0]}`
            else value = `between,${value[0]},${value[1]}`
        }
        params.push(key + ":" + value)
    }
    const where = params.join("|")
    if (where) route += "&where=" + where

    xhttp.open("GET", route, true)
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 401) {
                $(".modal-body").html("")
                $("#listDetailModalForm").modal("hide")
                getLogin(loadPage)
            }
            else if (xhttp.status == 200) {

                if (xhttp.statusText.substring(0, 3) == "jwt") {
                    document.cookie = `JWT-${$("#instanceCaption").val()}${xhttp.statusText.substring(4)};path=/`
                }

                $("#detailPanel").html(xhttp.responseText)

                if (typeof getUpdateViewRules != "undefined") getUpdateViewRules()
                
                $(".document-cancel-btn").hide()

                $(".updateMessage").hide()
                if (message == "ok") {
                    $("#updateMessageOk").show()
                    document.location = "#updateMessageOk"
                }
                else if (message == "expired") {
                    $("#updateMessageExpired").show()
                    document.location = "#updateMessageExpired"
                }
                else if (message == "consistency") {
                    $("#updateMessageConsistency").show()
                    document.location = "#updateMessageConsistency"
                }
                else if (message == "duplicate") {
                    $("#updateMessageDuplicate").show()
                    document.location = "#updateMessageDuplicate"
                }
                else if (message == "serverError") {
                    $("#updateMessageServerError").show()
                    document.location = "#updateMessageServerError"
                }

                $("#deleteButton").click(function () {
                    $("#deleteButton").removeClass("btn-outline-primary").addClass("btn-danger")
                    $("#deleteButton").click(function () {
                        submitDelete(id)
                    })
                })

                $(".submitSpinner").hide()
                
                checkForm()

                $(".input-iban").each(function () {
                    const propertyId = $(this).attr("id")
                    if ($(this).val() != "" && controleIBAN($(this).val()) != 0) {
                        $(this).addClass("is-invalid")
                        $(`#inputError-${propertyId}`).text("Invalid IBAN")
                        $(".submit-button").addClass("disabled")
                    }
                })

                $(".updateIban").change(function () {
                    const propertyId = $(this).attr("id")
                    if ($(this).val() != "" && controleIBAN($(this).val()) != 0) {
                        $(this).addClass("is-invalid")
                        $(`#inputError-${propertyId}`).text("Invalid IBAN")
                        $(".submitButton").addClass("disabled")
                    }
                    else {
                        $(".submitButton").removeClass("disabled")
                        $(this).removeClass("is-invalid")
                        $(`#inputError-${propertyId}`).text("")
                    }
                })

                $("#commitment-select-document").unbind("change");
                $("#commitment-select-document").change(function () {
                    let template = $(this).val()
                    $("#commitment-generate-message-target").html("")
                    if (template) {
                        let xhttp = new XMLHttpRequest();
                        xhttp.open("GET", $(this).val() + "&commitment_id=" + id + "&start_date=" + encodeDate($("#input-start_date").val()) + "&end_date=" + encodeDate($("#input-end_date").val()) + "&user_field=" + $("#input-user_field").val(), false)
                        xhttp.onreadystatechange = function() {
                            if (xhttp.status == 401) console.log("ERROR 401")
                            if (xhttp.readyState == 4 && xhttp.status == 200) {
                                $("#commitment-generate-message-target").html(xhttp.responseText)
                            }   
                        }
                        xhttp.send();
                    }
                })
              
                $(".updateDate").datepicker()
                $(".updateDatetimeDate").datepicker()
                $(".updateTime").timepicker({ "timeFormat":"H:i:s", "step": 15, "scrollDefault": "now" })
                $(".updateDatetimeTime").timepicker({ "timeFormat":"H:i:s", "step": 15, "scrollDefault": "now" })
                $(".updateSelectpicker").selectpicker()

                $(".updateSelectRoute").each(function () {
                    const propertyId = $(this).attr("id").split("-")[1]
                    getSelect(propertyId)
                })

                $(".selectTags").each(function () {
                    const propertyId = $(this).attr("id").split("-")[1]
                    selectTags(propertyId, "updateSelectedValue-", id)
                })

                $(".selectDynamic").each(function () {
                    const propertyId = $(this).attr("id").split("-")[1]
                    selectDynamic(propertyId, "updateSelectedValue-")
                })

                postTab(tab, id)

                $(".detailPanel").each(function () {
                    const panel = $(this).attr("id")
                    getPanel(tab, panel, id)
                })
            }
            else toastr.error("A technical error has occured. PLease try again later")
        }
    }
    xhttp.send()
}

const getDetail = (id) => {
    
    $(".modal-body").unbind()

    var ListForeignKeyProperty = []
    $("input.foreignKeyProperty-"+id).each(function(i){
        var key = $(this).attr("id").split("-")[1]
        var value = $(this).val()
        ListForeignKeyProperty.push(`${key}:${value}`)
    });
    let queryForeignKeyProperty = ""
    if(ListForeignKeyProperty.length > 0){
        queryForeignKeyProperty = "foreign_key_property="+ListForeignKeyProperty.join("|")+"&";
    }

    var xhttp = new XMLHttpRequest()
    var route = `${$("#detailRoute").val()}/` + id + "?"

    const checkIds = []
    $(`.listCheckId-${id}`).each(function () {
        const propertyId = $(this).attr("id").split("-")[2], value = $(this).val()
        checkIds.push(`${propertyId}:${value}`)
    })
    route += `&ids=${checkIds.join("|")}`

    xhttp.open("GET", route, true)
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 401) {
                $(".modal-body").html("")
                $("#listDetailModalForm").modal("hide")
                getLogin(loadPage)
            }
            else if (xhttp.status == 200) {

                if (xhttp.statusText.substring(0, 3) == "jwt") {
                    document.cookie = `JWT-${$("#instanceCaption").val()}${xhttp.statusText.substring(4)};path=/`
                }

                if (id != 0) {
                    const n_fn = $("#listName-" + id).val()
                    $("#listDetailModalLabel").text(n_fn)
                }
                else $("#listDetailModalLabel").text("Add")

                $(".updateBirthYear").unbind()
                $(".updateDate").unbind()
                $(".updateEmail").unbind()
                $(".updateFile").unbind()
                $(".updateNumber").unbind()
                $(".updatePhone").unbind()
                $(".updateSelect").unbind()
                $(".updateTexArea").unbind()
                $(".updateTime").unbind()

                $(".modal-body").html("")
                $("#listDetailModal").html(xhttp.responseText)

                $(".detailTab").click(function () {
                    const tabId = $(this).attr("id").split("-")[1]
                    $(".detailTab").removeClass("active")
                    $(this).addClass("active")
                    getTab(tabId, id)
                })

                getTab($("#defaultTab").val(), id)
            }
            else toastr.error("A technical error has occured. PLease try again later")
        }
    }
    xhttp.send()
}
