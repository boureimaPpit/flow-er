const renderLayout = ({ context }, { config, properties, row }) => {

    const result = []

    for (let propertyId of Object.keys(config.layout)) {
        const value = row[config.distribution.variable]
        const markup = config.layout[propertyId]
        const modalities = (markup.modalities) ? markup.modalities.split(",") : false
        if (!modalities || modalities.includes(value)) {
            const args = []
            for (let param of markup.params.split(",")) {
                const property = properties[param]
                if (property.type == "select") {
                    args.push((row[param]) ? context.localize(property.modalities[row[param]]) : "")
                }
                else if (property.type == "date") {
                    args.push(context.decodeDate(row[param]))
                }
                else if (property.type == "datetime") {
                    args.push(context.decodeTime(row[param]))
                }        
                else {
                    args.push(row[param])
                }
            }
            const format = markup.format.split("%s")
            const text = []
            for (let i = 0; i < format.length; i++) {
                text.push(format[i])
                if (i < args.length) text.push(args[i])
            }
            result.push(text.join(""))
        }
    }

    return result.join("\n")
}
