const wallpaper = require('wallpaper')

async function setWallpaper(path) {
    // 'C:/Users/jdchen/Pictures/Screenshots/test.png'
    return await wallpaper.set(path)
}

async function getWallpaper() {
    return await wallpaper.get()
}

module.exports = { setWallpaper, getWallpaper }