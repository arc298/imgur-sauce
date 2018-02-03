jest.mock('axios', () => {
	return {
		get: jest.fn(() => new Promise(() => {}))
	}
})

jest.mock('../app/config', () => {
	return {
		templates: {
			sauceNaoSearch: () => 'image url'
		}
	}
})

const axios = require('axios')
const searchSauceNao = require('../app/search_sauce_nao')

describe('search SauceNao for image sources', () => {
	let imgUrl, pendingRequest

	beforeEach(() => {
		imgUrl = 'image url'
		pendingRequest = searchSauceNao(imgUrl)
	})

	test('searches SauceNao for the image source', () => {
		expect(axios.get).toBeCalledWith(imgUrl)
	})

	test('returns a promise for the SauceNao request', () => {
		expect(pendingRequest).toBeInstanceOf(Promise)
	})
})