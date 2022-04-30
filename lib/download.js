const fs = require('fs')
const fetch = require('node-fetch')

const imageName = 'wallpaper.jpg'
const saveFolderName = 'saveTodayWallpaper'

async function download(url, directory) {
    if (!directory) throw 'no directory'
    const response = await fetch(url)
    const buffer = await response.buffer()
    // `C:/Users/jdchen/pictures/image.jpg`
    const path = `${directory}/${imageName}`
    fs.writeFile(path, buffer, () =>
        console.log('finished downloading!'))
    return path
}

function saveTodayWallpaper(directory) {
    const DATE = new Date()
    const year = DATE.getFullYear()
    const month = DATE.getMonth()
    const date = DATE.getDate()
    const today = `${year}${month < 10 ? '0' + month : month}${date < 10 ? '0' + date : date}`
    const wallpaperPath = `${directory}/${imageName}`
    const wallpaperFileExist = fs.existsSync(wallpaperPath)
    if (wallpaperFileExist) {
        const saveFolder = `${directory}/${saveFolderName}`
        const savedPath = `${saveFolder}/${today}.jpg`
        createDirectory(saveFolder)
        fs.copyFile(wallpaperPath, savedPath, (err) => {
            if (err) console.log("Error Found:", err)
            console.log('saved Today Wallpaper')
        })
    }
}

function createDirectory(path) {
    try {
        // first check if directory already exists
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
            console.log("Directory is created.")
        } else {
            console.log("Directory already exists.")
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = { download, saveTodayWallpaper }
