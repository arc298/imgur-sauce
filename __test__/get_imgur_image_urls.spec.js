const getImgurImageUrls = require('../app/get_imgur_image_urls')
const {directImgurImg} = require('../app/config').templates

describe('get imgur album image urls', () => {

	describe('when imgur album page source contains the image metadata', () => {
		let images, response

		beforeEach(() => {
			images = [
				{hash: 'sH4oHi4'},
				{hash: 'DeS3k4D'},
				{hash: '5CGsKLb'}
			]

			response = {
				data: `
          window.runSlots = {
            item: {
              "album_images": {
                "images": ${JSON.stringify(images)}
              }
            }
          };
        `
			}
		})

		test('returns the direct image links', () => {
			expect(getImgurImageUrls(response)).toEqual(images.map(img => directImgurImg({hash: img.hash})))
		})
	})
})