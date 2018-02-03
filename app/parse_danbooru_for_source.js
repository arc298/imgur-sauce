const cheerio = require('cheerio')

const parseDanbooruForSource = (content, url) => {
	const $ = cheerio.load(content)
	const normalizedSource = $('#image-container').data('normalizedSource')

	return normalizedSource || url
}

module.exports = parseDanbooruForSource