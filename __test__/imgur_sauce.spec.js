jest.mock('axios', () => ({
	get: jest.fn(() => Promise.resolve({data: 'data'})),
	all: jest.fn(() => Promise.resolve(['source url']))
}))

jest.mock('../app/get_imgur_image_urls',    () => jest.fn(() => ['image url']))
jest.mock('../app/search_sauce_nao',        () => jest.fn((url) => Promise.resolve(url)))
jest.mock('../app/parse_sauce_nao_results', () => jest.fn((url) => Promise.resolve(url)))

const axios = require('axios')
const getImgurImageUrls = require('../app/get_imgur_image_urls')
const searchSauceNao = require('../app/search_sauce_nao')
const parseSauceNaoResults = require('../app/parse_sauce_nao_results')
const imgurSauce = require('../app/imgur_sauce')

describe('get imgur album sources', () => {

	let albumUrl, callbackSpy
	let realConsole = console

	beforeEach(() => {
		global.console = {
			log: jest.fn()
		}

		global.console.log.mockClear()

		albumUrl = 'album url'
	})

	afterEach(() => {
		global.console = realConsole
	})

	const imgurTests = () => {
		test('gets the album', () => {
			expect(axios.get).toBeCalledWith('album url')
		})

		test('gets the image urls', () => {
			expect(getImgurImageUrls).toBeCalledWith({data: 'data'})
		})

		test('searches sauce nao for each image url', () => {
			expect(searchSauceNao).toBeCalledWith('image url')
		})

		test('parses the sauce nao result for each image url', () => {
			expect(parseSauceNaoResults).toBeCalledWith('image url')
		})
	}

	describe('when the callback is not defined', () => {
		beforeEach(() => {
			imgurSauce(albumUrl)
		})

		imgurTests()

		test('logs each source url to the console', () => {
			expect(global.console.log).toBeCalledWith('source url')
		})
	})


	describe('when the callback is defined', () => {
		callbackSpy = jest.fn()

		beforeEach(() => {
			imgurSauce(albumUrl, callbackSpy)
		})

		imgurTests()

		test('calls the callback with the source urls', () => {
			expect(callbackSpy).toBeCalledWith(['source url'])
		})
	})
})

