const axios = require('axios').default.create({
    baseURL: 'https://www.accuweather.com'
});

module.exports = axios;