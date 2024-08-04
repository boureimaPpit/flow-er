const triggerList = async ({ context, entity, view }, searchParams) => {		

    // Route with params

    let route = `${document.getElementById("searchRoute").value}`

    const columns = document.getElementById("columns")
    if (columns) route += "columns=" + columns.value

    let params = []
    for (const key of Object.keys(searchParams)) {
        let value = searchParams[key]
        if (Array.isArray(value)) {
            if (value[0] == null) value = `le,${value[1]}`
            else if (value[1] == null) value = `ge,${value[0]}`
            else value = `between,${value[0]},${value[1]}`
        }
        params.push(key + ":" + value)
    }
    const where = params.join("|")
    if (where) route += "&where=" + where

    const order = document.getElementById("listOrderHidden").value
    if (order) route += "&order=" + order

    const limit = document.getElementById("listLimitHidden").value
    if (limit) route += "&limit=" + limit

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
    document.getElementById("dataview").innerHTML = searchRenderer({ context, entity, view }, data)
    
    getListRows(context, entity, view, getSearchParams())

    // Trigger search request

    triggerSearch({ context, entity, view })

    for (let tag of document.getElementsByClassName("searchSelectTagsIds")) {
        const id = tag.attributes.getNamedItem("id").value
        const propertyId = id.split("-")[1]
        const tagId = id.split("-")[2]
        const name = document.getElementById(`searchSelectTagsName-${propertyId}-${tagId}`).value
        const ids = tag.value.split(",")
        for (const id of ids) {
            const td = document.getElementById(`listTagsName-${propertyId}-${id}`)
            if (td) {
                let label = (td.innerHtml) ? td.innerHtml.split(",") : []
                label.push(name)
                td.innerHTML = label.join(",")
            }
        }
    }

    // Trigger order request
    
    triggerOrder(context, entity, view)

    // Extend the displayed list

    for (let button of document.getElementsByClassName("listMoreButton")) {
        button.onclick = function () {
            document.getElementById("listLimitHidden").value = ""
            triggerList(context, entity, view, getSearchParams())
        }
    }

    // Enable group action

    for (let badge of document.getElementsByClassName("flBadge")) {
        badge.style.visibility = "hidden"
    }
    if (document.getElementById("listGroupButton-0")) {
        document.getElementById("listGroupButton-0").style.visibility = "hidden"
        document.getElementById("listGroupButton-1").disabled = true
        document.getElementById("listGroupTr").style.visibility = "hidden"    
    }

    // Trigger checking rows for group action

    for (let check of document.getElementsByClassName("listCheck")) {
        check.onclick = function (e) {
            if (e.shiftKey) {
                const max = check.attributes.getNamedItem("id").value.split("-")[2], state = check.checked
                let min = 0
                for (let check of document.getElementsByClassName("listCheck")) {
                    const i = parseInt(check.attributes.getNamedItem("id").value.split("-")[2])
                    if (check.checked && i < max) min = i
                }
                for (let check of document.getElementsByClassName("listCheck")) {
                    const i = parseInt(check.attributes.getNamedItem("id").value.split("-")[2])
                    if (i >= min && i <= max) check.checked = state
                }
            } 
            else {
                const id = parseInt(check.attributes.getNamedItem("id").value.split("-")[1])
            }

            let count = 0, checked = 0, sum = 0, sumChecked = 0
            for (let check of document.getElementsByClassName("listCheck")) {
                count++
                const id = parseInt(check.attributes.getNamedItem("id").value.split("-")[1]), amount = parseFloat(document.getElementById(`listAmount-${id}`).value)
                if (amount) sum += amount
                if (check.checked) {
                    checked++
                    sumChecked += amount
                } 
            }
            if (checked > 0) {
                for (let badge of document.getElementsByClassName("listGroupButton")) {
                    badge.style.visibility = "initial"
                }
                document.getElementById("listGroupButton-1").disabled = false
                document.getElementById("listDetailButton-0").style.visibility = "hidden"
                document.getElementById("listGroupTr").style.visibility = "initial"
                document.getElementById("listCount").innerText = checked
                if (sumChecked) document.getElementById("listSum").innerText = (Math.round(sumChecked * 100) / 100).toFixed(2)
            }
            else {
                document.getElementById("listGroupButton-0").style.visibility = "hidden"
                document.getElementById("listGroupButton-1").disabled = true
                document.getElementById("listDetailButton-0").style.visibility = "initial"
                document.getElementById("listGroupTr").style.visibility = "hidden"
                document.getElementById("listCount").innerText = count
                if (sum) document.getElementById("listSum").innerText = (Math.round(sum * 100) / 100).toFixed(2)
            }
        }
    }

    // Trigger checking all

    for (let checkAll of document.getElementsByClassName("listCheckAll")) {
        const state = checkAll.checked
        for (let check of document.getElementsByClassName("listCheck")) check.checked = state
        for (let checkAll of document.getElementsByClassName("listCheckAll")) checkAll.checked = state

        if (state) {
            document.getElementById("listGroupButton-0").style.visibility = "initial"
            document.getElementById("listGroupButton-1").disabled = false
            document.getElementById("listDetailButton-0").style.visibility = "hidden"
        }
        else {
            document.getElementById("listGroupButton-0").style.visibility = "hidden"
            document.getElementById("listGroupButton-1").disabled = true
            document.getElementById("listDetailButton-0").style.visibility = "initial"
        }

        let count = 0, sum = 0
        for (let check of document.getElementsByClassName("listCheck")) {
            count++
            const id = parseInt(check.attributes.getNamedItem("id").value.split("-")[1]), amount = parseFloat(document.getElementById(`listAmount-${id}`).value)
            if (amount) sum += amount
        }
        document.getElementById("listCount").innerText = count
        if (sum) document.getElementById("listSum").innerText = (Math.round(sum * 100) / 100).toFixed(2)
    }

    // Widgets
    
    for (let dateInput of document.getElementsByClassName("datepicker")) dateInput.datepicker()
    for (let dateInput of document.getElementsByClassName("timepicker")) dateInput.timepicker({ "timeFormat":"H:i:s", "step": 15, "scrollDefault": "now" })

    // Connect the grouped actions anchors
    for (let button of document.getElementsByClassName("listGroupButton")) {
        document.getElementById("listGroupModal").innerHtml = ""
        document.getElementById("groupModalForm").showModal()
        getGroup()
    }

    // Connect the detail anchors
    for (let button of document.getElementsByClassName("listDetailButton")) {
        const id = button.attributes.getNamedItem("id").value.split("-")[1]
        button.classList.remove("btn-outline-primary")
        button.classList.add("btn-primary")
        document.getElementById("listDetailModal").innerHtml = ""
        document.getElementById("listDetailModalForm").showModal()
        getDetail(context, entity, view, id, searchParams)
    }
}
