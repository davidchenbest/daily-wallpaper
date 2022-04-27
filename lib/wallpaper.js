const wallpaper = require('wallpaper')
const { SavePath } = require('../setting')
const { getImageSrc } = require('./image')
const { download } = require('./download')

async function setWallpaper() {
    // 'C:/Users/jdchen/Pictures/Screenshots/test.png'
    const imgSrc = await getImageSrc('https://www.bing.com')
    const imgPath = await download(imgSrc, SavePath.get())
    return await wallpaper.set(imgPath)
}

async function getWallpaper() {
    return await wallpaper.get()
}

module.exports = { setWallpaper, getWallpaper }