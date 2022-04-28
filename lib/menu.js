const { Menu } = require("electron")

function createMenu(app, win) {
    const template = [
        {
            label: 'File',
            submenu: [{ label: 'Hide', click: () => win.hide() }, { label: 'Exit', click: () => app.exit(0) },]
        },
        // {
        //     label: 'Edit',
        // },
        // {
        //     label: 'View',
        // },
        // {
        //     label: 'Window',
        // },
        // {
        //     label: 'Help',
        // },
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    return menu
}

module.exports = { createMenu }