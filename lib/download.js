const fs = require('fs')
const fetch = require('node-fetch')

async function download(url, directory) {
    if (!directory) throw 'no directory'
    const response = await fetch(url)
    const buffer = await response.buffer()
    // `C:/Users/jdchen/pictures/image.jpg`
    const path = `${directory}/image.jpg`
    fs.writeFile(path, buffer, () =>
        console.log('finished downloading!'))
    return path
}

module.exports = { download }
