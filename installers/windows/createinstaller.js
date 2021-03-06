const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

//Promise chain execution
getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    console.log('creating windows installer')
    //Paths
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    //Installer specifications in form of promise
    return Promise.resolve({
        appDirectory: path.join(outPath, 'seths-network-win32-ia32/'),
        authors: 'SergioRoldan',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'seths-network.exe',
        setupExe: 'SethsNetworkInstaller.exe',
        setupIcon: path.join(rootPath, 'src', 'favicon.ico')
    })
}