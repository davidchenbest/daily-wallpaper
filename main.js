const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
const { setWallpaper } = require('./lib/wallpaper')

const cron = require('node-cron')
const { SavePath, WallpaperSyncTime } = require('./setting')
const { createTray } = require('./lib/tray')
const { createMenu } = require('./lib/menu')
let TRAY = null
let MENU = null

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

app.whenReady().then(async () => {
  const win = createWindow()
  win.on('close', function (event) {
    event.preventDefault()
    win.hide()
    return false
  })

  cron.schedule(WallpaperSyncTime.get(), () => {
    setWallpaper()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  TRAY = createTray(app, win)
  MENU = createMenu(app)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

console.log(`app data path: ${app.getPath('userData')}`)
