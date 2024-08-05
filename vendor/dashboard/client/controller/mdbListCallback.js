
const mdbListCallback = ({ context, entity, view }) => {
    $(".listDetailButton").each(function () {
        const btn = $(this)
        new mdb.Ripple(btn, {
            rippleColor: 'light'
        })    
    })
}
