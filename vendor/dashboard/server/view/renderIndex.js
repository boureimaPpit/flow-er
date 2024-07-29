const renderIndex = (context, entity, view, user, tab, indexConfig) => {

    return `<!DOCTYPE html>
    <html lang="fr" ${ (tab.darkMode) ? "data-bs-theme=\"dark\"" : "" }>
    
    <!-- Head -->
    <head><title>${context.localize(tab.labels)}</title>
        <meta charset="utf-8">
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link href="/bo/cli/resources/bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.css">
        <link rel="stylesheet" href="/bo/cli/resources/jquery.timepicker/jquery.timepicker.css">
        <link rel="stylesheet" href="/bo/cli/resources/toastr/build/toastr.min.css" rel="stylesheet" />
        <link rel='stylesheet' href="/bo/cli/resources/json-viewer/jquery.json-viewer.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fullcalendar/fullcalendar.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/fontawesome.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/brands.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/solid.css" />
   </head>
    
    <body></body>

    <!-- Scripts -->
    <script src="/bo/cli/resources/jquery/jquery-3.6.3.min.js" ></script>
    <script src="/bo/cli/resources/popper/popper.min.js"></script>
    <script src="/bo/cli/resources/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.js"></script>
    <script src="/bo/cli/resources/jquery.timepicker/jquery.timepicker.js"></script>
    <script src="/bo/cli/resources/toastr/build/toastr.min.js"></script>
    <script src="/bo/cli/resources/json-viewer/jquery.json-viewer.js"></script>
   
    <!-- Flow-ER -->
    <script src="/bo/cli/controller/check-form.js"></script>
    <script src="/bo/cli/controller/index.js"></script>
    <script src="/bo/cli/controller/getSearchParams.js"></script>
    <script src="/bo/cli/controller/loadView.js"></script>
    <script src="/bo/cli/controller/triggerCount.js"></script>
    <script src="/bo/cli/controller/triggerList.js"></script>
    <script src="/bo/cli/controller/triggerOrder.js"></script>
    <script src="/bo/cli/controller/triggerSearch.js"></script>
    <script src="/bo/cli/controller/triggerShortcuts.js"></script>
    <script src="/bo/cli/controller/getListRows.js"></script>
    <script src="/bo/cli/controller/calendar.js"></script>
    <script src="/bo/cli/controller/chart.js"></script>
    <script src="/bo/cli/controller/detail.js"></script>

    <script src="/bo/cli/view/search.js"></script>
    <script src="${ (indexConfig && indexConfig.header) ? indexConfig.header : "/bo/cli/bootstrap/renderHeader.js" }"></script>
    <script src="${ (indexConfig && indexConfig.body) ? indexConfig.body : "/bo/cli/bootstrap/renderBody.js" }"></script>
    <script src="${ (indexConfig && indexConfig.menu) ? indexConfig.menu : "/bo/cli/bootstrap/renderMenu.js" }"></script>
    <script src="${ (indexConfig && indexConfig.footer) ? indexConfig.footer : "/bo/cli/bootstrap/renderFooter.js" }"></script>

    <script>
    loadPage("${entity}", "${view}")
    </script>

    </html>`
}

module.exports = {
    renderIndex
}
