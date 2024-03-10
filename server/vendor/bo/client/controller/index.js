
const loadPage = async (entity, view) => {
    let response = await fetch("/bo/config")
    const config = await response.json()
    response = await fetch("/bo/language")
    const translations = await response.json()

    const roles = ["sales_manager"]
    const locale = "fr_FR"

    const context = {

        instanceCaption: "flow-er.fr",
        formattedName: "LARTILLOT, Bruno",
        roles: roles,
        locale: locale,

        config: config,

        localize: (str) => {
            if (str[locale]) return str[locale]
            else return str.default
        },

        translate: (str) => {
            if (translations[locale][str]) {
                return translations[locale][str]
            }
            else return str
        },

        isAllowed: (route) => {
            if (config.guard[route]) {
                for (let role of roles) {
                    if (config.guard[route].roles.includes(role)) return true
                }
                return false
            }
            else return false
        }
    }

    getSearch(context, entity, view)
}

