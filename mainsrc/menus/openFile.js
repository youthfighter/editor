const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;
const fileUtils = require('../utils/file');
const configs = require('../configs/index');
async function openFile(menu, win) {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'markdown', extensions: ['md'] }]
      }, async function (files) {
        if (!files) return;
        try {
            configs.currentFilepath = files[0];
            let md = await fileUtils.getString(files[0]);
            win.webContents.send('openMarkdown', md);
        } catch(e) {
            dialog.showErrorBox('打开失败', '打开文件失败');
        }
    })
}
module.exports = openFile;