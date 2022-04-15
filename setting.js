const Store = require('electron-store')

const STORE = new Store()


const SavePath = {
    name: 'savePath',
    get() {
        return STORE.get(this.name)
    },
    set(path) {
        path = path.replace(/\\/gm, '/')
        STORE.set(this.name, path)
    }
}

module.exports = { SavePath }