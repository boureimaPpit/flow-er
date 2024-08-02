const { renderCore } = require("../../../bo/server/view/renderCore")

const renderIndex = ({ context, entity, view }, data) => {

    const user = data.user, tab = data.tab, indexConfig = data.indexConfig

    return `<!DOCTYPE html>
    <html lang="fr" ${ (tab.darkMode) ? "data-bs-theme=\"dark\"" : "" }>
    
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
        <!-- MDB -->
        <link rel="stylesheet" href="/bo/cli/resources/mdbootstrap/css/mdb.min.css" />
   </head>
    
    <body></body>

    <script src="/bo/cli/resources/jquery/jquery-3.6.3.min.js" ></script>
    <script src="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.js"></script>
    <script src="/bo/cli/resources/jquery.timepicker/jquery.timepicker.js"></script>
    <script src="/bo/cli/resources/moment/moment-with-locales.min.js"></script>

    <!-- MDB -->
    <script type="text/javascript" src="/bo/cli/resources/mdbootstrap/js/mdb.umd.min.js"></script>
    <!-- MDB -->
    
    <!-- Flow-ER -->
    ${ renderCore({ context, entity, view }, data) }

    <!-- Pluggable renderers by index config -->
    <script src="${ (indexConfig && indexConfig.header) ? indexConfig.header : "/bo/cli/bootstrap/renderHeader.js" }"></script>
    <script src="${ (indexConfig && indexConfig.body) ? indexConfig.body : "/bo/cli/bootstrap/renderBody12.js" }"></script>
    <script src="${ (indexConfig && indexConfig.menu) ? indexConfig.menu : "/bo/cli/bootstrap/renderMenu.js" }"></script>
    <script src="${ (indexConfig && indexConfig.footer) ? indexConfig.footer : "/bo/cli/bootstrap/renderFooter.js" }"></script>
    <script src="${ (indexConfig && indexConfig.shortcuts) ? indexConfig.shortcuts : "/bo/cli/bootstrap/renderShortcuts.js" }"></script>
    <script src="${ (indexConfig && indexConfig.search) ? indexConfig.search : "/bo/cli/bootstrap/renderSearch.js" }"></script>
    <script src="${ (indexConfig && indexConfig.listHeader) ? indexConfig.listHeader : "/bo/cli/bootstrap/renderListHeader.js" }"></script>
    <script src="${ (indexConfig && indexConfig.list) ? indexConfig.list : "/bo/cli/bootstrap/renderList.js" }"></script>
    <script src="${ (indexConfig && indexConfig.columns) ? indexConfig.columns : "/dashboard/cli/mdbootstrap/renderColumns.j" }s"></script>

    <!-- Alternative renderers by design block -->
    <script>const shortcutsRenderer = ${ (indexConfig && indexConfig.shortcutsRenderer) ? indexConfig.shortcutsRenderer : "renderShortcuts" }</script>
    <script>const searchRenderer = ${ (indexConfig && indexConfig.searchRenderer) ? indexConfig.searchRenderer : "renderListHeader" }</script>
    <script>const listRenderer = ${ (indexConfig && indexConfig.listRenderer) ? indexConfig.listRenderer : "renderList" }</script>
    <script>
    loadPage({ entity: "${entity}", view: "${view}" })
    </script>

    </html>`
}

module.exports = {
    renderIndex
}
