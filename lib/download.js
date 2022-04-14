const fs = require('fs')
const fetch = require('node-fetch')

async function download(url) {
    const response = await fetch(url)
    const buffer = await response.buffer()
    fs.writeFile(`C:/Users/jdchen/pictures/image.jpg`, buffer, () =>
        console.log('finished downloading!'))
    return 'C:/Users/jdchen/pictures/image.jpg'
}

module.exports={download}
