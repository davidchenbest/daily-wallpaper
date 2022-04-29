const { Tray, Menu, nativeImage } = require('electron')
const path = require('path')

function createTray(app, win) {
    const iconPath = path.join(__dirname, '..', 'assets', 'icons', 'png', 'icon.png')
    const icon = nativeImage.createFromPath(iconPath)
    const tray = new Tray(icon)
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