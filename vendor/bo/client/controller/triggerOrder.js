const triggerOrder = (context, entity, view) => {

    for (let head of document.getElementsByClassName("listOrderHead")) {
        head.style.visibility = "hidden"
    }
    for (let check of document.getElementsByClassName("flDescendingCheck")) {
        check.disabled = true
    }
    triggerDirection(context, entity, view)

    if (document.getElementById("flOrderButton")) {
        const button = document.getElementById("flOrderButton")
        button.onclick = function () {
            if (button.classList.contains("btn-primary")) {
                for (let head of document.getElementsByClassName("listOrderHead")) {
                    head.style.visibility = "hidden"
                }
                button.classList.remove("btn-primary")
                button.classList.add("btn-outline-primary")
            }
            else {
                for (let head of document.getElementsByClassName("listOrderHead")) {
                    head.style.visibility = "initial"
                }
                button.classList.remove("btn-outline-primary")
                button.classList.add("btn-primary")
            }
        }
    
        const select = document.getElementById("flOrderSelect")
        if (select) select.onclick = function () {
            const propertyId = select.value
            if (propertyId) {
                for (let check of document.getElementsByClassName("flDescendingCheck")) {
                    check.disabled = false
                }
                const direction = (document.getElementById("flDescendingCheck").checked) ? "-" : ""
                document.getElementById("listOrderHidden").value = direction + propertyId
                getListRows(context, entity, view, getSearchParams())    
            }
            else {
                document.getElementById("listOrderHidden").value = ""
                getListRows(context, entity, view, getSearchParams())    
                for (let check of document.getElementsByClassName("flDescendingCheck")) {
                    check.disabled = true
                }
            }
        }    
    }
}

const triggerDirection = (context, entity, view) => {
    for (let check of document.getElementsByClassName("flDescendingCheck")) {
        check.onchange = function () {
            const propertyId = document.getElementById("flOrderSelect").value
            const direction = (check.checked) ? "-" : ""
            document.getElementById("listOrderHidden").value = direction + propertyId
            getListRows(context, entity, view, getSearchParams())
        }
    }
}