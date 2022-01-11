(async () => {
    const request = require("./utils/request"),
        cherrio = require("cheerio"),
        { dayParser, getType, hasForcast } = require('./utils/daysTools'),
        monthes = {
            "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, "July": 7,
            "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
        };

    const { data } = await request.get("/en/gb/london/ec4a-2/april-weather/328328?year=2022"),
        $ = cherrio.load(data),
        days = $(".content-module .monthly-calendar").children().toArray(),
        daysArray = [],
        initMonth = monthes[$('.monthly-dropdowns  .map-dropdown-toggle').children('h2').first().text().trim()];
        
    for (let day of days) {
        const Day = $(day),
            type = getType(Day);
        if ((type === 'is-today' || !type) && hasForcast(Day)) {
            
            const date = Day.children(".monthly-panel-top").children().text().trim(),
                url = day.attribs.href,
                { data: raw } = await request.get(url);

            daysArray.push({
                url,
                date,
                content: dayParser(raw)
            });
        }
        break;

    }


})();