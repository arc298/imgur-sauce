jest.mock('cheerio', () => {
	return {
		load: (content) => {
			return content
				? () => ({data: () => 'original url'})
				: () => ({data: () => undefined })
		}
	}
})



const parseDanbooruForSource = require('../app/parse_danbooru_for_source')

describe('parse danbooru for the image source', () => {

	let content, source
  
	describe('when the page contains the original source', () => {
		beforeEach(() => {


			content = '<section id="image-container" data-normalized-source="original url" />'
			source = parseDanbooruForSource(content)
		})

		test('returns the original source url', () => {
			expect(source).toEqual('original url')
		})
	})

	describe('when the page does not contain the original source', () => {
		beforeEach(() => {
			content = ''
			source = parseDanbooruForSource(content, 'danbooru url')
		})
    
		test('returns the danbooru url', () => {
			expect(source).toEqual('danbooru url')
		})
	})
})

