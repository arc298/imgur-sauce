const {directImgurImg} = require('./config').templates

const getImgurImageUrls = (response) => {
	const content = response.data
	const runSlots = content.split('window.runSlots = ')[1].split('};')[0]
	const item = JSON.parse(runSlots.split('item: ')[1])
	const images = item.album_images.images

	return images.map(img => directImgurImg({hash: img.hash}))
}

module.exports = getImgurImageUrls