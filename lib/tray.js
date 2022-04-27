const { Tray, Menu } = require('electron')

function createTray(app) {
    const tray = new Tray('./asset/icon.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'show', click: () => win.show() },
        { label: 'exit', click: () => app.exit(0) },
    ])
    tray.setToolTip('Daily Wallpaper')
    tray.setContextMenu(contextMenu)
    return tray
}

module.exports = { createTray }