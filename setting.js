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

const WallpaperSyncTime = {
    name: 'wallpaperSyncTime',
    defaultTime: '0 6 * * *', // At 06:00 AM
    get() {
        const time = STORE.get(this.name)
        if (time) return time
        this.set(this.defaultTime)
        return STORE.get(this.name)
    },
    set(time) {
        STORE.set(this.name, time)
    }
}

module.exports = { SavePath, WallpaperSyncTime }