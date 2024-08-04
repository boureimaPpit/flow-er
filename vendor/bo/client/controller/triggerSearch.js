
const triggerSearch = ({ context, entity, view }) => {

    if (document.getElementById("flRefreshButton")) {
        document.getElementById("flRefreshButton").style.visibility = "hidden"
        document.getElementById("flEraseButton").style.visibility = "hidden"
    
        let refresh = function () {
            document.getElementById("flRefreshButton").style.visibility = "hidden"
            document.getElementById("flEraseButton").style.visibility = "initial"
            getListRows(context, entity, view, getSearchParams())
        }    
    }

    // Trigger the Entry key event that refreshes the list
    document.onkeyup = function(e) {    
        if (e.key == "Enter") {
            triggerList()
        }
    }
    
    for (let icon of document.getElementsByClassName("listHeaderIcon")) {
        icon.style.visibility = "hidden"
    }

    if (document.getElementById("flRefreshButton")) {

        // Connect the refresh button that refreshes the list
        document.getElementById("flRefreshButton").onclick = triggerList

        // Connect the erase button that reset all the search engine inputs and checks and refresh the list
        document.getElementById("flEraseButton").onclick = function() {
            document.getElementById("flEraseButton").style.visibility = "hidden"
            for (let input of document.getElementsByClassName("searchInput")) {
                input.value = ""
            }
            for (let icon of document.getElementsByClassName("listHeaderIcon")) {
                icon.style.visibility = "hidden"
            }
            getListRows(context, entity, view, getSearchParams())
        }
    }
    
    // Trigger the change event on date inputs and refresh the list
    for (let input of document.getElementsByClassName("searchInput")) {
        input.onchange = function () {
            const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
            const val = document.getElementById(`search-${propertyId}`).value, empty = (Array.isArray(val) && val.length == 0 || !val) ? true : false
            const minVal = document.getElementById(`searchMin-${propertyId}`).value, minEmpty = (!minVal) ? true : false
            const maxVal = document.getElementById(`searchMax-${propertyId}`).value, maxEmpty = (!maxVal) ? true : false
            if (empty && minEmpty && maxEmpty) document.getElementById(`listHeaderIcon-${propertyId}`).style.visibility = "hidden"
            else document.getElementById(`listHeaderIcon-${propertyId}`).style.visibility = "initial"        }
    }

    // Connect the date picker on date inputs
    //for (let input of document.getElementsByClassName("searchInputDate")) input.datepicker()

    // Trigger the change event on date inputs and refresh the list
    for (let input of document.getElementsByClassName("searchInputDate")) {
        input.onchange = function () {
            const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
            document.getElementById("flRefreshButton").style.visibility = "initial"
            document.getElementById("flEraseButton").style.visibility = "hide"
            document.getElementById("searchCheck").classList.remove("btn-default")
            document.getElementById("searchCheck").classList.add("btn-secondary")
            document.getElementById("searchCheck").classList.add("active")
            document.getElementById(`searchCheckValue-${propertyId}`).value = "1"
            for (let input of document.getElementsByClassName("searchInputDate")) {
                input.classList.remove("bg-primary")
                input.classList.add("bg-light")
            }
        }
    }

    for (let input of document.getElementsByClassName("searchInputAge")) {
        input.onkeyup = function () {
            const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
            document.getElementById("flRefreshButton").style.visibility = "initial"
            document.getElementById("flEraseButton").style.visibility = "hide"
            document.getElementById("searchCheck").classList.remove("btn-default")
            document.getElementById("searchCheck").classList.add("btn-secondary")
            document.getElementById("searchCheck").classList.add("active")
            document.getElementById(`searchCheckValue-${propertyId}`).value = "1"
            for (let input of document.getElementsByClassName("shortcut-chip")) {
                input.classList.remove("bg-primary")
                input.classList.add("bg-light")
            }
        }
    }

    // Trigger the change event on number inputs and refresh the list
    for (let input of document.getElementsByClassName("searchInputNumber")) {
        input.onchange = function () {
            const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
            document.getElementById("flRefreshButton").style.visibility = "initial"
            document.getElementById("flEraseButton").style.visibility = "hide"
            document.getElementById("searchCheck").classList.remove("btn-default")
            document.getElementById("searchCheck").classList.add("btn-secondary")
            document.getElementById("searchCheck").classList.add("active")
            document.getElementById(`searchCheckValue-${propertyId}`).value = "1"
            for (let input of document.getElementsByClassName("shortcut-chip")) {
                input.classList.remove("bg-primary")
                input.classList.add("bg-light")
            }
        }
    }

    // Trigger the change event on select inputs and refresh the list
    for (let input of document.getElementsByClassName("searchInputSelect")) {
        input.onchange = function () {
            const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
            document.getElementById("flRefreshButton").style.visibility = "initial"
            document.getElementById("flEraseButton").style.visibility = "hide"
            document.getElementById("searchCheck").classList.remove("btn-default")
            document.getElementById("searchCheck").classList.add("btn-secondary")
            document.getElementById("searchCheck").classList.add("active")
            document.getElementById(`searchCheckValue-${propertyId}`).value = "1"
            for (let input of document.getElementsByClassName("shortcut-chip")) {
                input.classList.remove("bg-primary")
                input.classList.add("bg-light")
            }
        }
    }

    // Trigger the keyup event on text inputs and refresh the list
    for (let input of document.getElementsByClassName("searchInputText")) {
        input.onkeyup = function () {
            const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
            document.getElementById("flRefreshButton").style.visibility = "initial"
            document.getElementById("flEraseButton").style.visibility = "hide"
            document.getElementById("searchCheck").classList.remove("btn-default")
            document.getElementById("searchCheck").classList.add("btn-secondary")
            document.getElementById("searchCheck").classList.add("active")
            document.getElementById(`searchCheckValue-${propertyId}`).value = "1"
            for (let input of document.getElementsByClassName("shortcut-chip")) {
                input.classList.remove("bg-primary")
                input.classList.add("bg-light")
            }
        }
    }
}
