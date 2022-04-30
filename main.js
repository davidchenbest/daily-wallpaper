const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
const { setWallpaper } = require('./lib/wallpaper')

const cron = require('node-cron')
const { SavePath, WallpaperSyncTime } = require('./setting')
const { createTray } = require('./lib/tray')
const { createMenu } = require('./lib/menu')
let mainWindow = null

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
  win.on('close', event => {
    event.preventDefault()
    win.hide()
    return false
  })
  return win
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

ipcMain.on('directoryPath', (event, arg) => {
  const directory = SavePath.get()
  event.reply('directoryPath', directory)
})

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
}
else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }
  })

  // Create mainWindow, load the rest of the app, etc...
  app.on('ready', async () => {
    mainWindow = createWindow()
    setWallpaper()
    cron.schedule(WallpaperSyncTime.get(), () => {
      setWallpaper()
    })

    createMenu(app, mainWindow)
    createTray(app, mainWindow)
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

console.log(`app data path: ${app.getPath('userData')}`)