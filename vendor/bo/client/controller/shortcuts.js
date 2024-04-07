const getCountCallback = (id, route, params) => {
    let query = "?"
    Object.keys(params).forEach(function(paramId) { 
        let param = params[paramId]
        query += `&${paramId}=${param}`
    });

    // Update the counter badge
    return function () {
        let xhttp = new XMLHttpRequest()
        route += `${query}`
        xhttp.open('GET', route, true)
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 401) getLogin(loadPage)
                else if (xhttp.status == 200) {

                    $(`#badge-${id}`).removeClass('badge-light').addClass('badge-success')
                    $(`#badge-${id}`).text(xhttp.responseText)
                }
            }
        }
        xhttp.send()
    }
}

const refreshBadges = () => {
    $('.shortcutsParams').each(function () {
        const id = $(this).attr('id').split('-')[1], route = $("#countRoute").val(), params = JSON.parse($(this).val())
        $(`#badge-${id}`).removeClass('badge-success').addClass('badge-light')
        getCountCallback(id, route, params)()
    })
}

const getCount = (id, route, params) => {

    $(`#anchor-${id}`).click(function () {
        $(".searchInput").val("")
        $(".searchSelectpicker").selectpicker("refresh")
        $(".searchCheckValue").val("0")
        $(".searchCheck").removeClass("btn-secondary").addClass("btn-default").removeClass("active")
        $("#refreshButton").removeClass("btn-default").addClass("btn-warning")
        $("#refreshButton").attr("disabled", false)

        Object.keys(params).forEach(function(paramId) {
            let value = params[paramId], propertyId, searchId
            if (paramId.substring(0, 4) === "min_") {
                propertyId = paramId.substring(4)
                searchId = `searchMin-${propertyId}`
                value = `${value.substring(8,10)}/${value.substring(5,7)}/${value.substring(0,4)}`
            }
            else if (paramId.substring(0, 4) === "max_") {
                propertyId = paramId.substring(4)
                searchId = `searchMax-${propertyId}`
                value = `${value.substring(8,10)}/${value.substring(5,7)}/${value.substring(0,4)}`
            }
            else {
                propertyId = paramId
                searchId = "search-" + paramId
            }

            if (Array.isArray(value)) {
                let modalities = []
                value.forEach(function(modality) {
                    modalities.push(modality)
                    $(`#${searchId}-${modality}`).prop("selected", true)
                })
                $(`#${searchId}`).selectpicker("val", modalities)
            }
            else $(`#${searchId}`).val(value)
            $(`#searchCheck-${propertyId}`).addClass("btn-secondary").addClass("active")
            $(`#searchCheckValue-${propertyId}`).val("1")
        })

        $(".search_selectpicker").selectpicker("refresh")
        $("#erase-button").removeClass("btn-default").addClass("btn-success")
        $("#erase-button").attr("disabled", false)
        $(".chip").removeClass("bg-primary").addClass("bg-light")
        $(this).removeClass("bg-light").addClass("bg-primary")
        if (route) {
            getCountCallback(id, route, params)()
        }
    })
}

const getShortcuts = () => {
    const route = $('#shortcutsRoute').val()
    if (route) {
        const xhttp = new XMLHttpRequest()
        xhttp.open("GET", route, true)
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 401) getLogin(loadPage)
                else if (xhttp.status == 200) {

                    $('#shortcutsPanel').html(xhttp.responseText)
                    $('.shortcutsParams').each(function () {
                        const id = $(this).attr('id').split('-')[1], route = $("#countRoute").val(), params = JSON.parse($(this).val())
                        getCount(id, route, params)
                        getCountCallback(id, route, params)()
                    })
                    $("#badgeRefreshButton").click(refreshBadges)
                }
            } 
        }
        xhttp.send()
    }
}
