
const mdbSearchCallback = ({ context, entity, view }) => {
    $(".searchFormOutline").each(function () {
        const formOutline = $(this)
        new mdb.Input(formOutline).init()
    })
}
