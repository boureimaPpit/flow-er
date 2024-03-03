const renderDetail = (context, entity, tab, id) => {
    const detailConfig = context.config[`${entity}/detail/${tab}`]

    const renderMenu = function () {
        const html = [`<input type="hidden" id="defaultTab" value="${Object.keys(detailConfig.tabs)[0]}">`]
        const first = true
        for (let tabId of Object.keys(detailConfig.tabs)) {
            const tab = detailConfig.tabs[tabId]
            html.push(`<li class="nav-item"><a class="nav-link detailTab ${(first) ? "active" : "disabled"}" id="detailTab-${tabId}">${context.localize(tab.labels)}</a></li>`)
        }
        return html.join("\n")
    }

    const renderRoutes = () => {
        const html = []
        for (let tabId of Object.keys(detailConfig.tabs)) {
            const tab = detailConfig.tabs[tabId]
            if (tab.route) {
                const query = []
                if (tab.query) {
                    for (key of Object.keys(tab.query)) {
                        let value = tab.query[key]
                        query.push(`${key}=${value}`)
                    }    
                }
                html.push(`<input type="hidden" id="detailTabRoute-${tabId}" value="${tab.route}/${id}?${query.join("&")}" />
                <input type="hidden" id="detailTabQuery-${tabId}" value="${query}" />`)
            }
        }
        return html.join("\n")
    }

    return `<div class="container">
        <ul class="nav nav-tabs">
            ${renderMenu()}
        </ul>
        ${renderRoutes()}
        <div id="detailPanel"></div>
    </div>`
}

module.exports = {
    renderDetail
}