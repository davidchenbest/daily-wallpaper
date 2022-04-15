const { ipcRenderer } = require("electron")

window.addEventListener('DOMContentLoaded', () => {
  const openDialog = document.querySelector('.openDialog')
  const directory = document.querySelector('.directory')
  ipcRenderer.send('directoryPath')

  openDialog.onclick = () => {
    ipcRenderer.send('showDirectory')
  }
  ipcRenderer.on('directoryPath', (event, data) => {
    directory.innerHTML = data
  })


})
