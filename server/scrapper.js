const axios = require("axios");

const clean = (text) => {
    let result = "", split = text.split("\n");
    split.forEach( part => {
        const split = part.split("<div");
        split.forEach( part => {
            const split = part.split("class=\"");
            split.forEach( part => {
                const split = part.split("\">");
                split.forEach( part => {
                    const split = part.split("</div>");
                    split.forEach( part => {
                        const split = part.split("<h2");
                        split.forEach( part => {
                            const split = part.split("</h2>");
                            split.forEach( part => {
                                const split = part.split("text-uppercase");
                                split.forEach( part => {
                                    const split = part.split("mb-4");
                                    split.forEach( part => {
                                        result += part;
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    return result;
}

const philharmoniedeparis_fr = async (searchString) => {
    const result = {};
    let now = new Date(), year = now.getFullYear(), month = now.getMonth() + 1, day = now.getDate();
    let monthText = (month > 9) ? month : "0" + month;
    if (day < 10) day = "0" + day;
    const today = year + "-" + monthText + "-" + day;
    let currentMonth = month, currentDay = 0, currentYear = year;

    let url = "https://philharmoniedeparis.fr/fr/agenda-ajax?startDate=" + today + "&types=1&op=init";
    if (searchString != "") url += "&search=" + searchString;
    let content = await axios.get(url).then(async (res) => res.data.content);
    content = clean(content);
    content = content.split("calendar-date container");
    content.shift();
    for (const dateBlock of content) {
        const split1 = dateBlock.split("agenda-event-wrapper");
        const split2 = dateBlock.split("BlockColor");
        let split = (split1[0].length < split2[0].length) ? split1 : split2;
        const dateText = split[0].trim().split(" ")[1];
        let date, year, month, monthText, day;
        if (dateText.trim().length < 3) {
            if (parseInt(dateText.trim()) < currentDay) {
                currentMonth++;
                if (currentMonth == 13) {
                    currentMonth = 1;
                    currentYear++;
                }
            }
            year = currentYear;
            month = (currentMonth > 9) ? currentMonth : "0" + currentMonth;
            monthText = { "01": "janvier", "0é": "février", "03": "mars", "04": "avril", "05": "mai", "06": "juin", "07": "juillet", "08": "août", "09": "septembre", "10": "octbre", "11": "novembre", "12": "décembre" }[month];
            day = ((dateText.length == 2) ? dateText : "0" + dateText);
            currentDay = parseInt(dateText.trim());
        }
        else {
            const months = { "janvier": "01", "février": "02", "mars": "03", "avril": "04", "mai": "05", "juin": "06", "juillet": "07", "août": "08", "septembre": "09", "octbre": "10", "novembre": "11", "décembre": "12" };
            year = dateText[3];
            monthText = dateText[2];
            month = months[monthText];
            day = dateText;
        }
        date = year + "-" + month + "-" + day;

        let rest = split[1];
        rest = rest.split("agendaTimer-time pr-gutter");
        for (const timeBlock of rest) {
            let split = timeBlock.split("data-performance-eid");
            let time = split[0].trim(), eid = "", category = "", title = "", subtitle = "", description = "", img = "", href = "";
            time = day + " " + monthText + " " + year + " " + time;
            if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(time.substring(0, 1))) time = null;

            if (split.length > 1) {
                let eidSplit = split[1].split("data-cycle-eid");
                eid = eidSplit[0].trim();
                eid = eid.substring(2, eid.length - 1);

                let imgSplit = split[1].split("src=\"");
                imgSplit = imgSplit[1].split("\"");
                img = imgSplit[0];

                let categorySplit = split[1].split("EventCard-category separator");
                categorySplit = categorySplit[1].split("EventCard-titles");
                category = categorySplit[0].trim();

                let titleSplit = categorySplit[1].split("EventCard-title");
                titleSplit = titleSplit[1].split("EventCard-subtitle");
                title = titleSplit[0].trim();

                let subtitleSplit = categorySplit[1].split("EventCard-subtitle");
                subtitleSplit = subtitleSplit[1].split("EventCard-description");
                subtitle = subtitleSplit[0].trim();

                let descriptionSplit = subtitleSplit[1].split("EventCard-info");
                description = descriptionSplit[0].trim();

                let hrefSplit = descriptionSplit[1].split("href=\"");
                hrefSplit = hrefSplit[1].split("\"");
                href = "https://philharmoniedeparis.fr/" + hrefSplit[0].trim();
            }
            
            if (title) {
                result[eid] = {
                    type: "event",
                    date: date,
                    image: { default: img },
                    place: "Philharmonie de Paris",
                    time: time,
                    category: category,
                    eventName: title,
                    works: [subtitle],
                    eventUrl: href,
                    eventText: {"default": description }
                };
            }
        }
    }
    return result;
};

const laseinemusicale_com = async () => {
    const value = {};
    let url = "https://www.laseinemusicale.com/programmation/?genre%5B%5D=130&daterange=30-10+%7C+30-10&date-start=&date-end=";
    let content = await axios.get(url).then(async (res) => res.data);
    content = clean(content);
    content = content.split("card__image");
    content.shift();
    for (let item of content) {
        let image = item.split("<img data-src=\""), title, time, eventUrl;
        if (image) {
            image = image[1];
            item = image.split("\" alt=\"\" />")[1];
            image = image.split("\"")[0];
        }
        const card = item.split("card__content");
        if (card) {
            item = card[1];
            title = item.split("<h6>")[1];
            if (title) {
                item = title.split("</h6>")[1];
                title = title.split("</h6>")[0];
            }
            time = item.split("<p>")[1];
            if (time) {
                item = time.split("</p>")[1];
                time = time.split("</p>")[0];
            }
            eventUrl = item.split("<a href=\"")[1];
            if (eventUrl) {
                item = eventUrl.split("\"")[1];
                eventUrl = eventUrl.split("\"")[0];
            }
        }
        if (image && title && time && eventUrl) {
            let date = time.split(" "), months = { "janvier": "01", "février": "02", "mars": "03", "avril": "04", "mai": "05", "juin": "06", "juillet": "07", "août": "08", "septembre": "09", "octbre": "10", "novembre": "11", "décembre": "12" };
            if (date[1] == "&") date = date[4] + "-" + months[date[3]] + "-" + ((date[0].length == 2) ? date[0] : "0" + date[0]);
            else date = date[3] + "-" + months[date[2]] + "-" + ((date[1].length == 2) ? date[1] : "0" + date[1]);
            value["seinemusicale_" + time] = {
                type: "event",
                date: date,
                image: { default: image },
                place: "La Seine Musicale",
                time: time,
                category: "Musique classique",
                eventName: title,
                works: [],
                eventUrl: eventUrl,
                eventText : { default: "" }
            };
        }
    }
    console.log(value);
    return;
};

module.exports = {
    philharmoniedeparis_fr,
    laseinemusicale_com,
};