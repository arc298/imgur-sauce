const template = require('lodash.template')
const merge = require('lodash.merge')

const defaultEnv = 'local'

const defaults = {
	env: process.env.NODE_ENV || defaultEnv,
	sauceNao: {
		apiKey: '',
    chunkSize: 12
  },
	similarityThreshold: 70,
	templates: {
		imgurAlbum: template('https://imgur.com/a/${ hash }'),
		sauceNaoSearch: template('https://saucenao.com/search.php?api_key=${ apiKey }&db=999&output_type=2&testmode=1&numres=2&url=${ url }'),
		directImgurImg: template('https://i.imgur.com/${ hash }.png')
	}
}

const config = {
	local: merge({}, defaults, require('./local.config')),
	test: merge({}, defaults, require('./test.config'))
}

module.exports = config[process.env.NODE_ENV || defaultEnv]