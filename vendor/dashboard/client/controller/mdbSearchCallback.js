
const mdbSearchCallback = ({ context, entity, view }) => {
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).init();
    })
    const testBtn = document.getElementById("testBtn")
    new mdb.Ripple(testBtn, {
        rippleColor: 'light'
    })
}
