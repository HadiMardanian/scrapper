
const cheerio = require('cheerio').default;

dayParser = (raw) => {
    const $ = cheerio.load(raw),
        title = $('.subnav-pagination div').text(),
        [day, night] = $('.half-day-card'),
        dayInfo = {
            day: { info: {} },
            night: { info: {} }
        };
    dayInfo.day['realFeel'] = $(day).find('.real-feel').children()[0].children[0].data
        .split('\t').join('')
        .split('\n').join('')
        .split('RealFeel')[1].slice(1).slice(0, -1);
    dayInfo.day['realFeelShade'] = $(day).find('.real-feel').children()[1].children[0].next.children[0].data
        .split('\t').join('')
        .split('\n').join('')
        .split('RealFeel')[1].split('Shade')[1].slice(1).slice(0, -1);
    dayInfo.day['degree'] = $(day).find('.temperature').text().trim().split('°')[0];
    dayInfo.day['phrase'] = $(day).find('.phrase').text();


    $('.panels').children('.left').each((index, item) => {
        $(item).children('p').each((i, e) => {
            const value = $(e).children().first().text(),
                key = $(e).text().split(value)[0];
            dayInfo.day.info[key] = value;
        })
    });


    dayInfo.night['realFeel'] = $(night).find('.real-feel').children()[0].children[0].data
        .split('\t').join('')
        .split('\n').join('')
        .split('RealFeel')[1].slice(1).slice(0, -1);
    
    dayInfo.night['degree'] = $(night).find('.temperature').text().trim().split('°')[0];
    dayInfo.night['phrase'] = $(night).find('.phrase').text();


    $('.panels').children('.left').each((index, item) => {
        $(item).children('p').each((i, e) => {
            const value = $(e).children().first().text(),
                key = $(e).text().split(value)[0];
            dayInfo.night.info[key] = value;
        })
    });
    return dayInfo;
},

    hasForcast = (tag) => tag.children('.history-avg').length === 0,

    getType = (tag) => tag.attr('class').split('monthly-daypanel')[1].trim()
module.exports = {
    dayParser,
    hasForcast,
    getType
}