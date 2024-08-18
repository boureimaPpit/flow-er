
const renderProtectedForm = ({ context, entity, view }, data) => {

    const user = data.user, row = data.row

    return `<!DOCTYPE html>
    <html lang="fr" data-bs-theme="${ (data.formConfig.theme) ? data.formConfig.theme : "dark" }" }>
    
    <!-- Head -->
    <head><title>Flow-ER</title>
        <meta charset="utf-8">
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <link href="/bo/cli/resources/bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.css">
        <link rel="stylesheet" href="/bo/cli/resources/jquery.timepicker/jquery.timepicker.css">
        <link rel="stylesheet" href="/bo/cli/resources/toastr/build/toastr.min.css" rel="stylesheet" />
        <link rel='stylesheet' href="/bo/cli/resources/fullcalendar/fullcalendar.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/fontawesome.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/brands.css" />
        <link rel='stylesheet' href="/bo/cli/resources/fontawesome/css/solid.css" />
    </head>
    
    <body>
        
        <!-- Header -->
        <div id="headerDiv">
            ${renderHeader({ context, entity, view }, data)}
        </div>

        <div class="container-sm my-5">
            <div class="row">
                <div class="col" id="form">
                </div>
            </div>
        </div>
    
        <!-- Footer -->
        ${renderFooter({ context, entity, view }, data)}
        
    </body>

    <!-- Scripts -->
    <script src="/bo/cli/resources/jquery/jquery-3.6.3.min.js" ></script>
    <script src="/bo/cli/resources/popper/popper.min.js"></script>
    <script src="/bo/cli/resources/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="/bo/cli/resources/jquery-ui-1.13.2/jquery-ui.js"></script>
    <script src="/bo/cli/resources/jquery.timepicker/jquery.timepicker.js"></script>
    <script src="/bo/cli/resources/toastr/build/toastr.min.js"></script>

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
    
    ${(user.locale.substring(0, 2) == "fr") ? "$.datepicker.setDefaults($.datepicker.regional[\"fr\"])" : ""}
    </script>

    <!-- FullCalendar -->
    <script src="/bo/cli/resources/moment/moment-with-locales.min.js"></script>
    <script src="/bo/cli/resources/fullcalendar-6.1.15/dist/index.global.min.js"></script>

    <!-- ZingChart -->
    <script src="/bo/cli/resources/zingchart/zingchart.min.js"></script>

    <!-- Pluggable renderers by index config -->
    <script src="/my/cli/controller/loadForm.js"></script>
    <script src="/bo/cli/bootstrap/renderForm.js"></script>

    <script>
    loadForm({ entity: "${entity}", view: "${view}"}, { row: ${ JSON.stringify(row) } })
    </script>

    </html>`
}

const renderHeader = ({ context }, data) => {

	const headerParams = context.config.headerParams, instance = context.instance, user = data.user, applications = data.applications, applicationName = data.applicationName

    return `<header>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">	
					${(headerParams && headerParams.logo) 
        ? `<img height="${headerParams.logoHeight}" src="/${`${instance.caption }/logos/${headerParams.logo}`}" alt="${instance.caption} logo" />`
        : `<span>${instance.caption}&nbsp;&nbsp;|</span>`}
				</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
			</div>
		</nav>
	</header>`
}

const renderFooter = ({ context }, data) => {

    const footer = context.config.footer

    return `
    <!--Footer-->
    <footer class="container-fluid bg-body-tertiary">
        <div>
            <div class="row">
                <!--Copyright-->
                <div class="py-3 my-3 text-center container-fluid">
                    ${renderLinks({ context }, footer)}              
                </div>
        
            </div>
        </div>
    </footer>`
}

const renderLinks = ({ context }, footer) => {

    const links = []
    for (let link of footer) {
        links.push(context.localize(link.html))
    }
    return links.join("&nbsp;&nbsp;|&nbsp;&nbsp;")
}

module.exports = {
    renderProtectedForm
}
