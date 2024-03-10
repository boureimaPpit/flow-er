const renderMenu = (context, entity, view) => {
    return `<div id="main_menu">
		<ul class="nav nav-pills nav-justified flex-column flex-sm-row">
			${renderEntries(context, view)}
		</ul>
	</div>`
}

const renderEntries = (context, view) => {
    const tab = context.config[`tab/${view}`], menuDef = tab.menu
    const menu = context.config[menuDef]
    const html = []
    for (let menuTabId of menu.tabs) {
        const menuTab = context.config[menuTabId]
        if (context.isAllowed(menuTab.route)) {
            const query = menuTab.urlParams
            const active = (menuTab == tab)

            html.push(`<li class="nav-item">
				<a class="nav-link ${(active) ? "active" : ""} ${(menuTab.disabled) ? "btn disabled" : ""}" href="${`${menuTab.route}${(query) ? `?${query}` : ""}`}" id="${menuTabId}-anchor">
					${context.localize(menuTab.labels)}
				</a>
			</li>`)
        }
    }
    return html.join("\n")
}

module.exports = {
    renderMenu
}
