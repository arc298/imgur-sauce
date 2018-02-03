jest.mock('../app/get_source_from_danbooru', () => {
	return jest.fn(() => Promise.resolve('danbooru source url'))
})

const parseSauceNaoResults = require('../app/parse_sauce_nao_results')

describe('parse sauce nao search results', () => {
	let response

	describe('when there are results for the image', () => {
		beforeEach(() => {
			response = {
				request: {path: 'https://example.com?url=imgurl'},
				data: {
					results: [
						{
							data: {},
							header: {}
						}
					]
				}
			}
		})

		describe('the similarity is greater than or equal to the threshold', () => {

			beforeEach(() => {
				response.data.results[0].header.similarity = Number.MAX_VALUE
			})

			describe('the source is not from danbooru', () => {
				beforeEach(() => {
					response.data.results[0].data.ext_urls = ['a source url']
				})

				test('when resolved returns the source from sauce nao', () => {
					return parseSauceNaoResults(response).then(source => expect(source).toEqual('a source url'))
				})
			})

			describe('the source is from danbooru', () => {
				beforeEach(() => {
					response.data.results[0].data.ext_urls = ['danbooru']
				})

				test('when resolved returns the source from danbooru', () => {
					return parseSauceNaoResults(response).then(source => expect(source).toEqual('danbooru source url'))
				})
			})
		})

		describe('the similarity is less than the threshold', () => {
			let realConsole = console
			let pendingSauceNaoQuery

			beforeEach(() => {
				response.data.results[0].data.ext_urls = ['a source url']
				response.data.results[0].header.similarity = Number.MIN_VALUE

				global.console = {
					warn: jest.fn()
				}

				global.console.warn.mockClear()

				pendingSauceNaoQuery = parseSauceNaoResults(response)
			})

			afterEach(() => {
				global.console = realConsole
			})

			test('when resolved returns the source from sauce nao', () => {
				return pendingSauceNaoQuery.then(source => expect(source).toEqual('a source url'))
			})
      
			test('logs low similarity warning to console', () => {
				expect(global.console.warn).toHaveBeenCalled()
			})
		})
	})
  
	describe('when there are no results for the image', () => {
		let realConsole = console
		let pendingSauceNaoQuery

		beforeEach(() => {
			response = {
				request: {path: 'https://example.com?url=imgurl'},
				data: {
					results: []
				}
			}

			global.console = {
				warn: jest.fn()
			}

			global.console.warn.mockClear()

			pendingSauceNaoQuery = parseSauceNaoResults(response)
		})

		afterEach(() => {
			global.console = realConsole
		})

		test('logs no results warning to console', () => {
			expect(global.console.warn).toHaveBeenCalled()
		})

		test('when resolved returns the original imgur image url', () => {
			return pendingSauceNaoQuery.then(source => expect(source).toEqual('imgurl'))
		})
	})
})