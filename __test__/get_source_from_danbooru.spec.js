jest.mock('axios', () => {
	return {
		get: jest.fn(() => Promise.resolve({
			data: {},
			config: {url: 'url'}
		}))
	}
})

jest.mock('../app/parse_danbooru_for_source', () => {
	return () => {
		return 'source'
	}
})

const axios = require('axios')

const getSourceFromDanbooru = require('../app/get_source_from_danbooru')

describe('get source from danbooru', () => {
	let url, pendingRequest
  
	beforeEach(() => {
		url = 'url'
		pendingRequest = getSourceFromDanbooru(url)
	})

	test('makes a request to danbooru for the source', () => {
		expect(axios.get).toBeCalledWith(url)
	})

	test('returns a promise for the danbooru request', () => {
		expect(pendingRequest).toBeInstanceOf(Promise)
	})

	test('the resolved promise returns the source', () => {
		return pendingRequest.then(data => expect(data).toEqual('source'))
	})
  

})