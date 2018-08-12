const {app, BrowserWindow, Menu, dialog, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const getMenus = require('./mainsrc/menus/index');
const settingsService = require('./mainsrc/settings/index');
const { saveFile, saveAs } = require('./mainsrc/menus/saveFile');
const recentOpenFileList = require('./mainsrc/menus/recentOpenFileList');

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

async function createWindow () {
    // 创建浏览器窗口。
    let config = await settingsService.querySettings();
    if (!config) config = await settingsService.initSettings();
    win = new BrowserWindow({width: config.width, height: config.height, webPreferences: {webSecurity: false}});
    if (config.maximize) win.maximize();
    const menuConfig = await getMenus();
    const menu = Menu.buildFromTemplate(menuConfig);
    /* 设置调试模式 */
    Menu.setApplicationMenu(menu)
    // 然后加载应用的 index.html。
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/editor/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    // 打开开发者工具。
    //win.webContents.openDevTools();

    win.on('resize', () => {
        let wh = win.getSize()
        win.webContents.send('resize', wh);
    });
    win.on('maximize', () => {
        let wh = win.getSize();
        console.log(wh);
        settingsService.updateSettings({width: wh[0], height: wh[1], maximize: true});
    });
    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })

    /* ipcMain bind */
     ipcMain.on('saveMarkdown', function (event, arg) {
        saveFile(arg);
    });
    ipcMain.on('saveAsMarkdown', function (event, arg) {
        saveAs(arg);
    });
    ipcMain.on('initMarkdown', function(event, arg) {
        recentOpenFileList.openDefaultFile(win);
    });
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        let wh = win.getSize();
        settingsService.updateSettings({width: wh[0], height: wh[1]});
        app.quit();        
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。