const {app, BrowserWindow, Menu, globalShortcut} = require('electron')
const path = require('path')
const url = require('url')
const nedb = require('nedb')

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

/* 设置配置 */
function updateConfig(o) {
    const db = new nedb({
        filename: './data/save.db',
        autoload: true
    });
    let _id = 'width';
    return new Promise((resolve, reject) => {
        db.update({_id}, {$set: o}, { multi: true }, function(err, doc) {
            if (err) reject(err);
            else resolve(doc);
        });
    });
}
/* 获取配置 */
function getConfig() {
    const db = new nedb({
        filename: './data/save.db',
        autoload: true
    });
    return new Promise((resolve, reject) => {
        db.findOne({}, (err, doc) => {
            if (err) reject(err);
            else resolve(doc);
        })
    });

    db.findOne({}, cb);
}

/* 获取菜单项 */
function getMenu() {
    return template = [{
        label: '文件',
        submenu:[
            {
                label:'新建文件',
                click:function(){
                    win.loadURL(url.format({
                        pathname: path.join(__dirname, 'dist/editor/index.html'),
                        protocol: 'file:',
                        slashes: true
                    }))
                }
            },
            {
                label:'打开文件',
                click:function(){
                    console.log('打开文件');
                }
            }, 
            {
                label:'保存',
                click:function(){
                    console.log('保存');
                }
            },
            {
                type: 'separator'
            },
            {
                label:'退出',
                click:function(){
                    win = null;
                }
            },
        ],
    },
    {
        label: '帮助',
        submenu: [
            {
                label:'关于',
                click:function(){
                    console.log('关于');
                }
            }
        ]
    }];
}

async function createWindow () {
    // 创建浏览器窗口。
    let config = await getConfig();
    console.log(config);
    win = new BrowserWindow({width: config.width, height: config.height, webPreferences: {webSecurity: false}});
    
    win.on('resize', () => {
        let wh = win.getSize()
        updateConfig({width: wh[0], height: wh[1]});
        win.webContents.send('resize', wh);
    })
    //win.maximize();
    const menu = Menu.buildFromTemplate(getMenu())
    /* 设置调试模式 */
    Menu.setApplicationMenu(menu)
    // 然后加载应用的 index.html。
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/editor/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    globalShortcut.register('Ctrl+s', function(){
        console.log('save');
    })
    // 打开开发者工具。
    win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
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
        app.quit()
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