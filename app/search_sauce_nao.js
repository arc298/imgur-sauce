const axios = require('axios')

const config = require('./config')
const {sauceNaoSearch} = config.templates

const searchSauceNao = (url) => {
	const queryStringParams = {apiKey: config.sauceNaoApiKey, url: encodeURIComponent(url)}
	return axios.get(sauceNaoSearch(queryStringParams))
}

module.exports = searchSauceNao