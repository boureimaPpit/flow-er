const renderHeader = (context, entity, view) => {

    const menuId = context.config[`tab/${view}`].menu
    const menu = context.config[menuId]
    const applicationName = context.localize(menu.labels)

    return `<header>
		<nav class="navbar navbar-expand-lg navbar-light" ${(context.config.headerParams && context.config.headerParams.backgroundColor) ? `style="background-color: ${context.config.headerParams.backgroundColor}"` : ""}>
			<a class="navbar-brand" target="_blank" href="${(context.config.headerParams && context.config.headerParams.href) ? `${context.config.headerParams.href}` : "#"}" rel="follow">	
				${(context.config.headerParams && context.config.headerParams.logo) 
        ? `<img height="${context.config.headerParams.logoHeight}" src="/${`${context.instanceCaption }/logos/${context.config.headerParams.logo}`}" alt="${context.instanceCaption} logo" />`
        : `<span>${context.instanceCaption}&nbsp;&nbsp;|</span>`}
			</a>

			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						&nbsp;&nbsp;<a class="navbar-brand" href="#" rel="follow">${context.formattedName}</a>
					</li>
					<li class="nav-item">
						<a class="nav-link"  href="#" rel="follow">${context.translate("Home")}</a>
					</li>
					<li class="nav-item dropdown active">
						<a class="nav-link dropdown-toggle"  href="#" id="navbarDropdownAppLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							${applicationName}
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdownAppLink">
							${renderApplications(context)}
						</div>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownVcardLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span class="material-symbols-outlined">person</span>
						<div class="dropdown-menu" aria-labelledby="navbarDropdownVcardLink">
							<a class="dropdown-item" id="logoutAnchor" href="#">
								${context.translate("Logout")}
							</a>
						</div>
					</li>

					<li class="nav-item">
						<a class="nav-link" title="${context.translate("Show the documentation")}">
							<span class="material-symbols-outlined">help</span>
						</a>
					</li>

				</ul>
			</div>
		</nav>
	</header>`
}

const renderApplications = (context) => {
    const html = []
    for (let applicationId of Object.keys(context.config.applications)) {
        const application = context.config.applications[applicationId]
        if (context.config[`menu/${applicationId}`]) {
            const m = context.config[`menu/${applicationId}`]
            const menuEntry = context.config[m.defaultTab]
            const urlParams = (menuEntry.urlParams) ? menuEntry.urlParams : ""
            const url = `/${menuEntry.route}?${urlParams}`

            html.push(`<a class="dropdown-item" href="${url}">
				${context.localize(application.labels)}
			</a>`)
        }
    }
    return html
}

module.exports = {
    renderHeader
}
