(async () => {
	const request = require("./utils/request"),
		{ Worker } = require("worker_threads"),
		cherrio = require("cheerio"),
		{ data } = await request.get(
			"/en/gb/london/ec4a-2/april-weather/328328?year=2022"
		),
		$ = cherrio.load(data),
		days = $(".content-module .monthly-calendar").children().toArray(),
		daysArray = [];

	for (let day of days) {
		const worker = new Worker(require("path").resolve("./src/worker.js"));

		worker.postMessage(day);
		worker.on("message", (msg) => {
			require("fs").writeFileSync(
				`./results/${msg.url.split("?")[1].split("=")[1]}.json`,
				JSON.stringify(msg)
			);
		});
	}
	console.log(daysArray);
})();
