
const triggerSearch = (context, entity, view) => {

    new bootstrap.Tooltip($("#flRefreshButton").get(0))
    new bootstrap.Tooltip($("#flEraseButton").get(0))

    $("#flRefreshButton").hide()
    $("#flEraseButton").hide()

    let refresh = function () {
        $("#flRefreshButton").hide()
        $("#flEraseButton").show()
        getListRows(context, entity, view, getSearchParams())
    }
    // Trigger the Entry key event that refreshes the list
    $(document).keyup(function(e) {    
        if (e.keyCode == 13) {
            refresh()
        }
    })
    
    $(".listHeaderIcon").hide()

    // Connect the refresh button that refreshes the list
    $("#flRefreshButton").click(refresh)

    // Connect the erase button that reset all the search engine inputs and checks and refresh the list
    $("#flEraseButton").click(function() {
        $("#flEraseButton").hide()
        $(".searchInput").val("")
        $(".listHeaderIcon").hide()
        getListRows(context, entity, view, getSearchParams())
    })
    
    // Trigger the change event on date inputs and refresh the list
    $(".searchInput").change(function () {
        const propertyId = $(this).attr("id").split("-")[1]
        const val = $(`#search-${propertyId}`).val(), empty = (Array.isArray(val) && val.length == 0 || !val) ? true : false
        const minVal = $(`#searchMin-${propertyId}`).val(), minEmpty = (!minVal) ? true : false
        const maxVal = $(`#searchMax-${propertyId}`).val(), maxEmpty = (!maxVal) ? true : false
        if (empty && minEmpty && maxEmpty) $(`#listHeaderIcon-${propertyId}`).hide()
        else $(`#listHeaderIcon-${propertyId}`).show()
    })

    // Connect the date picker on date inputs
    $(".searchInputDate").datepicker()

    // Trigger the change event on date inputs and refresh the list
    $(".searchInputDate").change(function () {
        var propertyId = $(this).attr("id").split("-")[1]
        $("#flRefreshButton").show()
        $("#flEraseButton").hide()
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    $(".searchInputAge").keyup(function () {
        var propertyId = $(this).attr("id").split("-")[1]
        $("#flRefreshButton").show()
        $("#flEraseButton").hide()
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    // Trigger the change event on number inputs and refresh the list
    $(".searchInputNumber").change(function () {
        var propertyId = $(this).attr("id").split("-")[1]
        $("#flRefreshButton").show()
        $("#flEraseButton").hide()
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })

    // Trigger the change event on select inputs and refresh the list
    $(".searchInputSelect").change(function () {
        var propertyIdAttr = $(this).attr("id")
        if (propertyIdAttr) {
            var propertyId = propertyIdAttr.split("-")[1]
            $("#flRefreshButton").show()
            $("#flEraseButton").hide()
            $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
            $("#searchCheckValue-" + propertyId).val("1")
            $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
        }
    })

    // Trigger the keyup event on text inputs and refresh the list
    $(".searchInputText").keyup(function () {
        var propertyId = $(this).attr("id").split("-")[1]
        $("#flRefreshButton").show()
        $("#flEraseButton").hide()
        $("#searchCheck-" + propertyId).removeClass("btn-default").addClass("btn-secondary").addClass("active")
        $("#searchCheckValue-" + propertyId).val("1")
        $(".shortcut-chip").removeClass("bg-primary").addClass("bg-light")
    })
}
