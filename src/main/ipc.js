const {ipcMain} = require('electron')

ipcMain.on('aa', (event, arg) => {
  console.log(arg)  // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
})
