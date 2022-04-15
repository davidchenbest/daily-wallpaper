const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')

// const cron = require('node-cron');
const { getImageSrc } = require('./lib/image')
const { download } = require('./lib/download')
const { setWallpaper } = require('./lib/wallpaper')
const { SavePath } = require('./setting')


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

ipcMain.on('showDirectory', (event, arg) => {
  dialog.showOpenDialog({ properties: ['openDirectory'] })
    .then(path => {
      if (!path.canceled && path.filePaths[0]) {
        SavePath.set(path.filePaths[0])
        const directory = SavePath.get()
        event.reply('directoryPath', directory)
      }
    })

})

app.whenReady().then(async () => {
  createWindow()

  // const imgSrc = await getImageSrc('https://www.bing.com')
  // const imgPath = await download(imgSrc, SavePath.get())
  // setWallpaper(imgPath)

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

console.log(`app data path: ${app.getPath('userData')}`)
