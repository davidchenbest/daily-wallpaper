const { app, BrowserWindow } = require('electron')
const path = require('path')

// const cron = require('node-cron');
const { getImageSrc } = require('./lib/image')
const { download } = require('./lib/download')
const { setWallpaper } = require('./lib/wallpaper')


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(async () => {
  createWindow()

  const imgSrc = await getImageSrc('https://www.bing.com')
  const imgPath = await download(imgSrc)
  setWallpaper(imgPath)

  // cron.schedule('* * * * * *', () => {
  //   console.log('running a task every sec');
  // });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
