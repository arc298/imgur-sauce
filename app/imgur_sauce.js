const axios = require('axios')

const getImgurImageUrls = require('./get_imgur_image_urls')
const searchSauceNao = require('./search_sauce_nao')
const parseSauceNaoResults = require('./parse_sauce_nao_results')

const printSources = sources => sources.forEach((source) => { console.log(source) })

const imgurSauce = (albumUrl, callback = printSources) => {
	return axios
		.get(albumUrl)
		.then(getImgurImageUrls)
		.then(imageUrls => {
			const sourceRequests = imageUrls.map(url => searchSauceNao(url).then(parseSauceNaoResults))

			return axios
				.all(sourceRequests)
				.then(callback)
		})
		.catch(console.error)
}


module.exports = imgurSauce