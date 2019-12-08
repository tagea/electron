const { app, BrowserWindow, ipcMain } = require('electron');

function getDate(){
  const date = new Date();
  const options = {weekday: 'long', year: 'numeric', day: 'numeric'};
  const day = date.toLocaleString('en-US', options);
  const time = date.toLocaleString('en-US', {hour12: false, hour: 'numeric', minute: 'numeric'});
  return { day: day, time: time };
}

function createWindow (){
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
  //win.webContents.openDevTools();
}

ipcMain.on('asynchronous-message', (event, arg) => {
  event.sender.send('asynchronous-reply', getDate() );
});

app.on('ready', createWindow);