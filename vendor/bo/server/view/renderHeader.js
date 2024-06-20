const renderHeader = (context, entity, view) => {

    const menuId = context.config[`tab/${view}`].menu
    const menu = context.config[menuId]
    const applicationName = context.localize(menu.labels)

    return `<header>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">	
					${(context.config.headerParams && context.config.headerParams.logo) 
        ? `<img height="${context.config.headerParams.logoHeight}" src="/${`${context.instance.caption }/logos/${context.config.headerParams.logo}`}" alt="${context.instance.caption} logo" />`
        : `<span>${context.instance.caption}&nbsp;&nbsp;|</span>`}
				</a>

				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">

						${renderApplications(context, applicationName)}

						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<span class="far fa-lg fa-user"></span>
							</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">${context.user.formattedName}</a></li>
								<li><hr class="dropdown-divider"></li>
								<li><a class="dropdown-item" id="logoutAnchor" href="#">${context.translate("Logout")}</a></li>
							</ul>
						</li>

						<li class="nav-item">
							<a class="nav-link" title="${context.translate("Show the documentation")}">
								<span class="far fa-lg fa-question-circle"> </span>
							</a>
						</li>

					</ul>
				</div>
			</div>
		</nav>
	</header>`
}

const renderApplications = (context, applicationName) => {
    const html = []
    for (let applicationId of Object.keys(context.config.applications)) {
        const application = context.config.applications[applicationId]
        if (context.config[`menu/${applicationId}`]) {
            const m = context.config[`menu/${applicationId}`]
            const menuEntry = context.config[m.defaultTab]
            const urlParams = (menuEntry.urlParams) ? menuEntry.urlParams : ""
            const url = `${menuEntry.route}?${urlParams}`
            const label = context.localize(application.labels)

            html.push(`<li class="nav-item">
				<a class="nav-link ${ (label.localeCompare(applicationName) == 0) ? "active" : "" }" href="${url}">
					${label}
				</a>
			</li>`)
        }
    }
    return html.join("\n")
}

module.exports = {
    renderHeader
}
