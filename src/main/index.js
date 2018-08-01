import { app, BrowserWindow } from 'electron';

app.on('ready', () => {
  const win = new BrowserWindow();
  win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
