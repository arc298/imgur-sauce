const get = require('lodash.get')
const {similarityThreshold} = require('./config')

const getSourceFromDanbooru = require('./get_source_from_danbooru')

const parseSauceNaoResults = (response, index) => {
	const imgUrl =  decodeURIComponent(response.request.path.split('url=')[1])
	const firstResult = get(response.data, 'results[0]')
	let source = get(firstResult, 'data.ext_urls[0]')

	if (!source) {
		console.warn(`No results for #${index} ${imgUrl}, defaulting to original image for source`)
		return Promise.resolve(imgUrl)
	}

	const similarity = get(firstResult, 'header.similarity')

	if (similarity < similarityThreshold) {
		console.warn(`Similarity=${similarity} ${source} (source) for #${index} ${imgUrl} (original) is <${similarityThreshold} threshold`)
		source = imgUrl
	}

	return source.includes('danbooru')
		? getSourceFromDanbooru(source)
		: Promise.resolve(source)
}

module.exports = parseSauceNaoResults