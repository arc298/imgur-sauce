const axios = require('axios')
const parseDanbooruForSource = require('./parse_danbooru_for_source')

const getSourceFromDanbooru = (url) => axios.get(url).then(response => {
	return parseDanbooruForSource(response.data, response.config.url)
})

module.exports = getSourceFromDanbooru