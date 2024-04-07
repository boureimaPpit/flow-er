const renderCore = (context, entity, view) => {
    return `
    <script src="/bo/cli/resources/jquery/jquery-3.6.3.min.js" ></script>
    <script src="/bo/cli/resources/popper/popper.min.js"></script>
    <script src="/bo/cli/resources/bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>
    <script src="/bo/cli/resources/bootstrap-select-1.13.1/dist/js/bootstrap-select.min.js"></script>
    <script src="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.js"></script>
    <script src="/bo/cli/resources/jquery.timepicker/jquery.timepicker.js"></script>
    <script src="https://kit.fontawesome.com/a57cef3c40.js" crossorigin="anonymous"></script>
    <script src="/bo/cli/resources/toastr/build/toastr.min.js"></script>
    <script src="/bo/cli/resources/json-viewer/jquery.json-viewer.js"></script>

    <script>
    $.datepicker.regional['fr'] = {
        prevText: "${context.translate("Previous")}",
        nextText: "${context.translate("Next")}",
        monthNames: [
            "${context.translate("January")}",
            "${context.translate("February")}",
            "${context.translate("March")}",
            "${context.translate("April")}",
            "${context.translate("May")}",
            "${context.translate("June")}",
            "${context.translate("July")}",
            "${context.translate("August")}",
            "${context.translate("September")}",
            "${context.translate("October")}",
            "${context.translate("November")}",
            "${context.translate("December")}"
        ],
        dayNamesMin: [
            "${context.translate("Su")}",
            "${context.translate("Mo")}",
            "${context.translate("Tu")}",
            "${context.translate("We")}",
            "${context.translate("Th")}",
            "${context.translate("Fr")}",
            "${context.translate("Sa")}"
        ],
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        yearSuffix: ""
    }
    
    ${(context.user.locale.substring(0, 2) == "fr") ? "$.datepicker.setDefaults($.datepicker.regional[\"fr\"])" : ""}
    </script>

    <!-- FullCalendar -->
    <script src="/bo/cli/resources/moment/moment-with-locales.min.js"></script>
    <script src="/bo/cli/resources/fullcalendar/fullcalendar.js"></script>

    <!-- Flow-ER -->
    <script src="/bo/cli/controller/check-form.js"></script>
    <script src="/bo/cli/controller/index.js"></script>
    <script src="/bo/cli/controller/search.js"></script>
    <script src="/bo/cli/controller/shortcuts.js"></script>
    <script src="/bo/cli/controller/list.js"></script>
    <script src="/bo/cli/controller/detail.js"></script>

    <script src="/bo/cli/view/search.js"></script>

    <script>
    loadPage("${entity}", "${view}")
    $('#listPanel').each(getList)
    </script>
    `
}

module.exports = {
    renderCore
}
