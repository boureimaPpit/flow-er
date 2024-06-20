var viewBeginDate = new Date()
const year = viewBeginDate.getFullYear(), month = String(viewBeginDate.getMonth() + 1).padStart(2, "0"), day = String(viewBeginDate.getDate()).padStart(2, "0")
viewBeginDate = `${year}-${month}-${day}`

const getPlanning = (context, entity, view, params) => {
    let start = new Date($("#calendar").fullCalendar("getView").intervalStart)
    start = start.toISOString().substring(0, 10)
    let end = new Date($("#calendar").fullCalendar("getView").intervalEnd)
    end = end.toISOString().substring(0, 10)
    const where = "" //`end_date:ge,${start}|date:le,${end}`
    let route = `/bo/api/${entity}/${view}?where=${where}`
    const xhttp = new XMLHttpRequest()
    xhttp.open("GET", route, true)
    const jwt = `JWT-${ $("#instanceCaption") }`
    xhttp.setRequestHeader("Authorization", `Bearer ${localStorage.getItem(jwt)}`)
    xhttp.onreadystatechange = function() {
        if (xhttp.status == 401) location.href = ""
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            if (xhttp.statusText.substring(0, 3) == "jwt") {
                document.cookie = `JWT-${$("#instanceCaption").val()}${xhttp.statusText.substring(4)};path=/`
            }

            $("#calendar").fullCalendar("removeEvents")
            let obj = jQuery.parseJSON(xhttp.responseText)
            jQuery.each(obj, function (name, value) {
                var event = {
                    id: value.id,
                    allDay: false,
                    title: value.caption,
                    textColor: "grey",
                    start: $.fullCalendar.moment(value.date + " " + value.start_time), 
                    end: $.fullCalendar.moment(value.date + " " + value.end_time)
                }
                $("#calendar").fullCalendar("renderEvent", event, true)
            })
        }
    }
    xhttp.send()
}

const createCalendar = (context, entity, view) => {
    $("#calendar").fullCalendar({
        lang: context.user.locale,
        locale: context.user.locale,
        height: 650,
        defaultView: "agendaWeek",
        scrollTime: "08:00:00",
        businessHours: {
            dow: [ 1, 2, 3, 4, 5, 6], // Monday - Thursday
            start: "08:00",
            end: "18:00"
        },
        allDayText: context.translate("Day"),
        buttonText: {
            today: context.translate("Today"),
            month: context.translate("Month"),
            week: context.translate("Week"),
            day: context.translate("Day"),
        },

        customButtons: {
            addButton: {
                text: context.translate("Add"),
                click: function() {
                    getEventDetail(null)
                }
            },
        },

        header: {
            left: "prev,next today addButton testButton",
            center: "title",
            right: "month,agendaWeek,agendaDay"
        }
    })

    $(".fc-prev-button").click(function(){
        var moment = $("#calendar").fullCalendar("getDate")
        viewBeginDate = moment.format().slice(0, 10)
        getPlanning(context, entity, view, getSearchParams(""))
    })
	
    $(".fc-next-button").click(function(){
        var moment = $("#calendar").fullCalendar("getDate")
        viewBeginDate = moment.format().slice(0, 10)
        getPlanning(context, entity, view, getSearchParams(""))
    })
}

const activateCalendar = (context, entity, view) => {
    createCalendar(context, entity, view)
}
