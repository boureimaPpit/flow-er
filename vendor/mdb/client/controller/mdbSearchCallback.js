
const mdbSearchCallback = ({ context, entity, view }) => {
    $(".searchFormOutline").each(function () {
        const formOutline = $(this)
        new mdb.Input(formOutline).init()
    })

    document.querySelectorAll('.searchSelect').forEach((formOutline) => {
        new mdb.Select(formOutline);
    });

    $(".DatePickerOutline").each(function () {
        const formOutline = $(this)
        new mdb.Datepicker(formOutline, {datepicker: { format: 'dd-mm-yyyy'}})
    })

    $(".multi-range-slider").each(function () {
        const formOutline = $(this)
        new mdb.MultiRangeSlider(formOutline)
    })
}
