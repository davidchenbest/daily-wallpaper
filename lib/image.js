const fetch = require('node-fetch')
const cheerio = require('cheerio')

// 'https://www.bing.com'
async function getImageSrc(url){
    let data = await fetch(url)
    data = await data.text()
    const $ = cheerio.load(data)
    const element = $('link[rel="preload"]')
    const href = url + element.attr('href')
    console.log(href)
    return href
}

module.exports={getImageSrc}