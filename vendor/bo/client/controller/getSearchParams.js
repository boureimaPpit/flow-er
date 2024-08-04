const getSearchParams = () => {

    const encodeDate = (value) => {
        return value.substr(6, 4) + "-" + value.substr(3, 2) + "-" + value.substr(0, 2)
    }
    
    const searchParams = {}
    
    for (let select of document.getElementsByClassName("searchInputSelect")) {
        if (select.attributes.getNamedItem("id")) {
            let propertyId = select.attributes.getNamedItem("id").value.split("-")[1]
            let value = document.getElementById(`search-${propertyId}`).value

            if (Array.isArray(value)) {
                value = value.map(values => {
                    if (values == "empty") {
                        return "" 
                    }
                    else return values
                })
                value = value.join(",")
            }
            if (value) searchParams[propertyId] = value
        }
    }

    for (let select of document.getElementsByClassName("searchTagSelect")) {
        if (select.attributes.getNamedItem("id")) {
            const propertyId = select.attributes.getNamedItem("id").value.split("-")[1]
            const value = document.getElementById(`search-${propertyId}`).value
            let ids = ["in"]
            if (value) {
                for (const accountId of value) {
                    ids.push(document.getElementById(`searchSelectTagsIds-${propertyId}-${accountId}`).value)
                }
                searchParams["id"] = ids.join(",")
            }
        }
    }

    for (let select of document.getElementsByClassName("searchInputText")) {
        const propertyId = select.attributes.getNamedItem("id").value.split("-")[1]
        const value = document.getElementById(`search-${propertyId}`).value
        if (value.length >= 2) { searchParams[propertyId] = `contains,${value}` }
    }

    for (let input of document.getElementsByClassName("searchInputDateMin")) {
        const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
        let value = document.getElementById(`searchMin-${propertyId}`).value
        if (value) value = encodeDate(value)
        if ((value.length >= 2) && value) {
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][0] = value
        }
    }

    for (let input of document.getElementsByClassName("searchInputDateMax")) {
        const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
        let value = document.getElementById(`searchMax-${propertyId}`).value
        if (value) value = encodeDate(value)
        if ((value.length >= 2) && value) { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][1] = value
        }
    }

    for (let input of document.getElementsByClassName("searchInputAgeMin")) {
        const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
        let value = document.getElementById(`searchMin-${propertyId}`).value
        if (value) {
            const date = new Date()
            let year = new Date.getFullYear() - value, month = String(date.getMonth() + 1).padStart(2, "0"), day = String(date.getDate()).padStart(2, "0")
            if (month == "02" && day == "29") day = "28"
            value = `${year}-${month}-${day}`
        }
        if ((value.length >= 2) && value) { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][0] = value
        }
    }

    for (let input of document.getElementsByClassName("searchInputAgeMax")) {
        const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
        let value = document.getElementById(`searchMax-${propertyId}`).value
        if (value) {
            const date = new Date()
            let year = new Date.getFullYear() - value, month = String(date.getMonth() + 1).padStart(2, "0"), day = String(date.getDate()).padStart(2, "0")
            if (month == "02" && day == "29") day = "28"
            value = year + "-" + month + "-" + day
        }
        if ((value.length >= 2) && value) { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][1] = value
        }
    }

    for (let input of document.getElementsByClassName("searchInputNumberMin")) {
        const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
        console.log(input.attributes.getNamedItem("id").value)
        let value = document.getElementById(`searchMin-${propertyId}`).value
        if (value) { 
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][0] = value
        }
    }

    for (let input of document.getElementsByClassName("searchInputNumberMax")) {
        const propertyId = input.attributes.getNamedItem("id").value.split("-")[1]
        let value = document.getElementById(`searchMax-${propertyId}`).value
        if (value) {
            if (!searchParams[propertyId]) searchParams[propertyId] = [null, null]
            searchParams[propertyId][1] = value
        }
    }

    if (Object.keys(searchParams).length == 0) {
        const listWhereHidden = document.getElementById("listWhereHidden").value
        if (listWhereHidden) {
            for (const pair of document.getElementById("listWhereHidden").value.split("|")) {
                const key = pair.split(":")[0], value = pair.split(":")[1]
                searchParams[key] = value
            }
        }
    }

    return searchParams
}
