const renderCore = (entity, view) => {
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

    <!-- FullCalendar -->
    <script src="/bo/cli/resources/moment/moment-with-locales.min.js"></script>
    <script src="/bo/cli/resources/fullcalendar/fullcalendar.js"></script>
    
    <!-- ZingChart -->
    <script src="/flow-er/zingchart/zingchart.min.js"></script>

    <!-- Flow-ER -->
    <script src="/bo/cli/controller/index.js"></script>
    <script src="/bo/cli/controller/search.js"></script>
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
