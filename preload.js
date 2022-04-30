const { ipcRenderer } = require("electron")

window.addEventListener('DOMContentLoaded', () => {
  const openDialog = document.querySelector('.openDialog')
  const directory = document.querySelector('.directory')
  const openAtLogin = document.querySelector('#openAtLogin')
  ipcRenderer.send('platform')
  ipcRenderer.send('directoryPath')
  ipcRenderer.send('openAtLogin')

  openDialog.onclick = () => {
    ipcRenderer.send('showDirectory')
  }

  openAtLogin.onchange = function () {
    ipcRenderer.send('openAtLogin', this.checked)
  }

  ipcRenderer.on('platform', (event, platform) => {
    if (platform === 'linux') document.querySelector('.openAtLogin').style.display = 'none'
  })

  ipcRenderer.on('directoryPath', (event, data) => {
    directory.innerHTML = data
  })

  ipcRenderer.on('openAtLogin', (event, data) => {
    openAtLogin.checked = data
  })


})
