
const mdbSearchCallback = ({ context, entity, view }) => {
    $(".searchFormOutline").each(function () {
        const formOutline = $(this)
        new mdb.Input(formOutline)
    })

    document.querySelectorAll('.searchSelect').forEach((formOutline) => {
        new mdb.Select(formOutline);
    });
}
