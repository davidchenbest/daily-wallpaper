const { Tray, Menu } = require('electron')

function createTray(app, win) {
    const tray = new Tray('./assets/icons/png/icon.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'show', click: () => win.show() },
        { label: 'exit', click: () => app.exit(0) },
    ])
    tray.setToolTip('Daily Wallpaper')
    tray.setContextMenu(contextMenu)
    tray.on('click', () => {
        win.show()
    })
    return tray
}

module.exports = { createTray }