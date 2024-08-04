const getListRows = (context, entity, view, searchParams) => {		

    // Execute the ajax request
    const xhttp = new XMLHttpRequest()
    let route = `/bo/list/${entity}?view=${view}`

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

    xhttp.open("GET", route, true)
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 401) getLogin(loadPage)
            else if (xhttp.status == 200) {

                if (xhttp.statusText.substring(0, 3) == "jwt") {
                    document.cookie = `JWT-${document.getElementById("instanceCaption").value}${xhttp.statusText.substring(4)};path=/`
                }

                const data = JSON.parse(xhttp.responseText)
                document.getElementById("listParent").innerHTML = listRenderer({ context, entity, view }, data)

                if (document.getElementById("listGroupButton-0")) {
                    document.getElementById("listGroupButton-0").style.visibility = "hidden"
                    document.getElementById("listGroupButton-1").disabled = true
                    document.getElementById("llistGroupTr").style.visibility = "hidden"
                }

                // Connect the more anchor
                if (document.getElementById("listMoreButton")) {
                    document.getElementById("listMoreButton").onClick = function () {
                        document.getElementById("listLimitHidden").value = ""
                        getListRows(context, entity, view, getSearchParams())
                    }
                }

                // Able the group action button

                const manageInputs = () => {
                    let selected = false
                    for (let check of document.getElementsByClassName("listGroupCheck")) {
                        if (check.checked) selected = true
                    }
                    if (selected) {
                        for (let button of document.getElementsByClassName("listEditButton")) {
                            button.classList.remove("btn-outline-primary")
                            button.classList.add("btn-warning")
                        }
                    }
                    else {
                        for (let button of document.getElementsByClassName("listEditButton")) {
                            button.classList.remove("btn-warning")
                            button.classList.add("btn-outline-primary")
                        }
                    }
                }

                for (let check of document.getElementsByClassName("listCheck")) {
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
                        document.getElementById("listGroupButton-0").style.visibility = "initial"
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

                // Connect the check all checkbox
                for (let check of document.getElementsByClassName("listCheckAll")) {
                    const state = check.checked
                    for (let check of document.getElementsByClassName("listCheck")) {
                        check.checked = state
                    }
                    for (let check of document.getElementsByClassName("listCheckAll")) {
                        check.checked = state
                    }
        
                    if (document.getElementById("listGroupButton-0")) {
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
                    }

                    let count = 0, sum = 0
                    for (let check of document.getElementsByClassName("listCheck")) {
                        count++
                        const id = parseInt(check.attributes.getNamedItem("id").value.split("-")[1]), amount = parseFloat($(`#listAmount-${id}`).val())
                        if (amount) sum += amount
                    }
                    document.getElementById("listCount").innerText = count
                    if (sum) document.getElementById("listSum").innerText = (Math.round(sum * 100) / 100).toFixed(2)
                }

                for (let check of document.getElementsByClassName("listInput")) {
                    check.onchange = function () {
                        let propertyId = check.attributes.getNamedItem("name")
                        document.getElementById(`listGroupCheck-${propertyId}`).checked = true
                
                        let selected = false
                        for (let check of document.getElementsByClassName("listGroupCheck")) {
                            if (check.checked) selected = true
                        }
                        if (selected) {
                            for (let button of document.getElementsByClassName("listEditButton")) {
                                button.disabled = false
                            }
                            for (let button of document.getElementsByClassName("listEditButton")) {
                                button.classList.remove("btn-outline-primary")
                                button.classList.add("btn-warning")
                            }
                        } 
                        else {
                            for (let button of document.getElementsByClassName("listEditButton")) {
                                button.disabled = true
                            }
                            for (let button of document.getElementsByClassName("listEditButton")) {
                                button.classList.remove("btn-warning")
                                button.classList.add("btn-outline-primary")
                            }
                        } 
                        manageInputs()    
                    } 
                }

                for (let input of document.getElementsByClassName("listInput")) {
                    input.onchange = function () {
                        let selected = false
                        for (let input of document.getElementsByClassName("listGroupCheck")) {
                            if (check.checked) selected = true
                        }
                        if (selected) {
                            for (let button of document.getElementsByClassName("listEditButton")) {
                                button.disabled = false
                            }
                            for (let button of document.getElementsByClassName("listEditButton")) {
                                button.classList.remove("btn-outline-primary")
                                button.classList.add("btn-warning")
                            }
                        } 
                        else {
                            for (let button of document.getElementsByClassName("listEditButton")) {
                                button.disabled = true
                            }
                            for (let button of document.getElementsByClassName("listEditButton")) {
                                button.classList.remove("btn-warning")
                                button.classList.add("btn-outline-primary")
                            }
                        } 
                        manageInputs()
                    }
                }

                for (let button of document.getElementsByClassName("listEditButton")) {
                    button.onclick = function () {
                        getListGroupUpdate()
                    }
                }

                // Connect the grouped actions anchors
                for (let button of document.getElementsByClassName("listGroupButton")) {
                    button.onclick = function () {
                        document.getElementById("listGroupModal").innerHTML = ""
                        document.getElementById("groupModalForm").showModal()
                        getGroup()
                    }
                }

                // Connect the detail anchors
                for (let button of document.getElementsByClassName("listDetailButton")) {
                    button.onclick = function () {
                        const id = button.attributes.getNamedItem("id").value.split("-")[1]
                        button.classList.remove("btn-outline-primary")
                        button.classList.add("btn-warning")
                        document.getElementById("listDetailModal").innerHTML = ""
                        document.getElementById("listDetailModalForm").showModal()
                        getDetail(context, entity, view, id, searchParams)
                    }
                }
            }
            else toastr.error("A technical error has occured. PLease try again later")
        }
    }
    xhttp.send()
}
