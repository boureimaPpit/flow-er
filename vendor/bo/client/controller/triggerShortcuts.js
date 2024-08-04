const triggerShortcuts = async ({ context, entity, view }, route) => {

    // Fetch

    const response = await fetch(route)
    if (!response.ok) {
        switch (response.status) {
        case 401:
            getLogin(loadPage)
            return
        case 500:
            toastr.error("A technical error has occured. PLease try again later")
            return
        }
    }

    const data = await response.json()
    document.getElementById("shortcutsPanel").innerHtml = shortcutsRenderer({ context, entity, view }, data)

    for (let badge of document.getElementsByClassName("flBadge")) {
        badge.style.visibility = "hidden"
    }

    for (let param of document.getElementsByClassName("shortcutsParams")) {
        const id = param.attributes.getNamedItem("id").value.split('-')[1], route = document.getElementById("countRoute").value
        const where = $(this).val()
        const params = {}
        for (let param of where.split("|")) {
            const pair = param.split(":")
            params[pair[0]] = pair[1]
        }

        getCount({ context, entity, view }, id, route, params)
        getCountCallback(id, route, params)()
    }
    const badgeRefreshButton = document.getElementById("badgeRefreshButton")
    if (badgeRefreshButton) badgeRefreshButton.onClick = refreshBadges
}
