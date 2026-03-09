import { app, BrowserWindow, Menu, dialog } from 'electron'
import AutoLaunch from 'auto-launch'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const METADATA = {
  name: "Template",
  window: {
    width: 1500,
    height: 800
  }
}

const IS_DEV = !app.isPackaged;
const ADD_INIT = true;

let forceClose = false;

const getMenuBar = () => {
  return  [
    {
      label: 'Options',
      submenu: [
        {
          label: 'Advanced',
          submenu: [
            {
              label: 'Close',
              accelerator: 'CmdOrCtrl+W',
              click: () => {
                forceClose = true;
                app.quit();
              }
            }
          ]          
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = await import('electron');
            await shell.openExternal('https://electronjs.org');
          }
        }
      ]
    }
  ];
}


function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    title: METADATA.name,
    width: METADATA.window.width,
    height: METADATA.window.height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'public/favicon.ico')
  })  

  IS_DEV && win.webContents.openDevTools();

  win.loadURL(
    IS_DEV
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'index.html')}`
  );

  win.on('close', (e) => {
    if (!forceClose) {
      e.preventDefault();
      dialog.showMessageBox({
        type: 'warning',
        buttons: ['Cancelar', 'Salir'],
        defaultId: 0,
        message: '¿Estás seguro de que quieres cerrar la aplicación?',
        cancelId: 0
      }).then((result) => {
        if (result.response === 1) { // Si el usuario elige "Salir"
          forceClose = true;
          app.quit();
        }
      });
    }
  });  

  const menu = Menu.buildFromTemplate(getMenuBar());
  Menu.setApplicationMenu(menu);

  win.on('closed', function () {
    win = null;
  });
}

app.on('ready', () => {
  createWindow();
  if(ADD_INIT){ 
    let autoLauncher = new AutoLaunch({
      name: METADATA.name,
      path: app.getPath('exe'),
    });

    autoLauncher.isEnabled().then((isEnabled) => {
      if (!isEnabled) autoLauncher.enable();
    }).catch((err) => {
      console.error(err);
    });
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})