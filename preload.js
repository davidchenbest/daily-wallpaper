// const wallpaper = require('wallpaper');
// wallpaper.set('C:/Users/jdchen/Pictures/Screenshots/test.png').then(data=>console.log(data))
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
