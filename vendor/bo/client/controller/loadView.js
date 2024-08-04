const loadView = async ({ context, entity, view }) => {

    // Fetch body

    const response = await fetch(`/bo/loadView/${entity}?view=${view}`)
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

    const body = renderBody({ context, entity, view }, data)
    document.body.innerHTML = body
}
