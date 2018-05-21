const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 920,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/angular-truffle-dapp/favicon.ico`
    })


    win.loadURL(`file://${__dirname}/dist/angular-truffle-dapp/index.html`)

    //// uncomment below to open the DevTools.
    win.webContents.openDevTools()
    win.setMenu(null);
    win.maximize();

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})