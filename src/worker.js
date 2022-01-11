const request = require("./utils/request"),
	cheerio = require("cheerio"),
	{ parentPort } = require("worker_threads"),
	{ dayParser, getType, hasForcast } = require("./utils/daysTools");

parentPort.once("message", async (day) => {
	$ = cheerio.load(day);
    
	const Day = $(day),
		type = getType(Day);
	if ((type === "is-today" || !type) && hasForcast(Day)) {
        
		const date = Day.children(".monthly-panel-top").children().text().trim(),
			url = day.attribs.href,
			{ data: raw } = await request.get(url);
        
        const result = {
			url,
			date,
			content: dayParser(raw),
		};
		parentPort.postMessage(result);
	}
});
