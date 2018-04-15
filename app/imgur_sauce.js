const axios = require('axios')

const chunkSize = require('./config').sauceNao.chunkSize
const getImgurImageUrls = require('./get_imgur_image_urls')
const searchSauceNao = require('./search_sauce_nao')
const parseSauceNaoResults = require('./parse_sauce_nao_results')

const printSources = (sources, sourceIndex) => {
  sources.forEach(source => {
    console.log(`[Source ${++sourceIndex}](${source})`)
  })

  return sourceIndex
}

const imgurSauce = (albumUrl, callback = printSources) => {
  return axios
    .get(albumUrl)
    .then(getImgurImageUrls)
    .then(imageUrls => {
        let pendingSearches
        let sourceIndex = 0

        for (let i = 0, numImages = imageUrls.length; i < numImages; i += chunkSize) {
          const imageUrlsChunk = imageUrls.slice(i, i + chunkSize)

          if (i == 0) {
            pendingSearches = axios.all(searchImages(imageUrlsChunk)).then((sources) => {sourceIndex = callback(sources, sourceIndex) })
            continue
          }

          pendingSearches.then(() => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(
                  axios.all(searchImages(imageUrlsChunk)).then((sources) => { sourceIndex = callback(sources, sourceIndex) }).catch(reject)
                )
              }, 60000)
            })
          })
        }

        return pendingSearches
      }
    )
    .catch(console.error)
}


module.exports = imgurSauce

const searchImages = (imageUrls) => imageUrls.map((url, index) => searchSauceNao(url).then(response => parseSauceNaoResults(response, ++index)))
