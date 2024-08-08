const { renderCore } = require("../../../bo/server/view/renderCore")

const renderIndex = ({ context, entity, view }, data) => {

    const user = data.user, tab = data.tab, indexConfig = data.indexConfig
    console.log(tab)
    return `<!DOCTYPE html>
    <html lang="fr" ${ (tab.darkMode) ? "data-mdb-theme=\"dark\"" : "" }>
    
    <!-- Head -->
    <head><title>${context.localize(tab.labels)}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <!-- MDB icon -->
        <!-- Font Awesome -->
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <!-- Google Fonts Roboto -->
        <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
        />
        <!-- MDB ESSENTIAL -->
        <link rel="stylesheet" href="/mdb/cli/resources/mdb/css/mdb.min.css" />
        <!-- MDB PLUGINS -->
        <link rel="stylesheet" href="/mdb/cli/resources/mdb/plugins/css/all.min.css" />
   </head>
    
    <body></body>

    <script src="/bo/cli/resources/jquery/jquery-3.6.3.min.js" ></script>
    <script src="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.js"></script>
    <script src="/bo/cli/resources/jquery.timepicker/jquery.timepicker.js"></script>
    <script src="/bo/cli/resources/toastr/build/toastr.min.js"></script>
    <script src="/bo/cli/resources/moment/moment-with-locales.min.js"></script>

    <!-- MDB ESSENTIAL -->
    <script type="text/javascript" src="/mdb/cli/resources/mdb/js/mdb.umd.min.js"></script>
    <!-- MDB PLUGINS -->
    <script type="text/javascript" src="/mdb/cli/resources/mdb/plugins/js/all.min.js"></script>
    
    <!-- Flow-ER -->
    ${ renderCore({ context, entity, view }, data) }

    <!-- Pluggable renderers by index config -->
    <script src="/bo/cli/bootstrap/renderHeader.js"></script>
    <script src="/bo/cli/bootstrap/renderBody10.js"></script>
    <script src="/bo/cli/bootstrap/renderBody12.js"></script>
    <script src="/bo/cli/bootstrap/renderMenu.js"></script>
    <script src="/bo/cli/bootstrap/renderFooter.js"></script>
    <script src="/bo/cli/bootstrap/renderShortcuts.js"></script>
    <script src="/mdb/cli/mdbootstrap/renderSearch.js"></script>
    <script src="/bo/cli/bootstrap/renderListHeader.js"></script>
    <script src="/bo/cli/bootstrap/renderList.js"></script>
    <script src="/mdb/cli/mdbootstrap/renderColumns.js"></script>

    <script src="/mdb/cli/controller/mdbSearchCallback.js"></script>
    <script src="/mdb/cli/controller/mdbListCallback.js"></script>

    <!-- Alternative renderers by design block -->
    <script>
    const bodyRenderer = ${ (indexConfig && indexConfig.bodyRenderer) ? indexConfig.bodyRenderer : "renderBody12" }
    const searchRenderer = ${ (indexConfig && indexConfig.searchRenderer) ? indexConfig.searchRenderer : "renderListHeader" }
    searchCallback = mdbSearchCallback
    listCallback = mdbListCallback
    const listRenderer = ${ (indexConfig && indexConfig.listRenderer) ? indexConfig.listRenderer : "renderList" }
    loadPage({ entity: "${entity}", view: "${view}" })
    </script>

    </html>`
}

module.exports = {
    renderIndex
}
