const renderDetail = (context, entity, view, id) => {
    const detailConfig = context.config[`${entity}/detail/${view}`]

    return `<div class="container">
        <ul class="nav nav-tabs">
            ${renderMenu(context, detailConfig, id)}
        </ul>
        ${renderRoutes(context, detailConfig, id)}
        <div id="detailPanel"></div>
    </div>`
}

const renderMenu = function (context, detailConfig, id) {
    const html = [`<input type="hidden" id="defaultTab" value="${Object.keys(detailConfig.tabs)[0]}">`]
    const first = true
    for (let tabId of Object.keys(detailConfig.tabs)) {
        const tab = detailConfig.tabs[tabId]
        if (tab.key == "id" && id != 0 || !tab.key && id == 0) {
            html.push(`<li class="nav-item"><a class="nav-link detailTab ${(first) ? "active" : "disabled"}" id="detailTab-${tabId}">${context.localize(tab.labels)}</a></li>`)
        }
    }
    return html.join("\n")
}

const renderRoutes = (context, detailConfig, id) => {
    const html = []
    for (let tabId of Object.keys(detailConfig.tabs)) {
        const tab = detailConfig.tabs[tabId]
        if (tab.key == "id" && id != 0 || !tab.key && id == 0) {
            if (tab.route) {
                const query = []
                if (tab.query) {
                    for (let key of Object.keys(tab.query)) {
                        let value = tab.query[key]
                        query.push(`${key}=${value}`)
                    }    
                }
                html.push(`<input type="hidden" id="detailTabRoute-${tabId}" value="${tab.route}${ (id != 0) ? `/${id}` : ""}?${query.join("&")}" />
                <input type="hidden" id="detailTabQuery-${tabId}" value="${query}" />`)
            }
        }
    }
    return html.join("\n")
}

module.exports = {
    renderDetail
}