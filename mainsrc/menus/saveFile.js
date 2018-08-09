const { dialog, ipcMain } = require('electron');
const configs = require('../configs/index');
const fileUtils = require('../utils/file');
async function saveFile(arg) {
    try {
        await fileUtils.saveString(configs.currentFilepath, arg)
    } catch (e) {
        console.log(e);
        dialog.showErrorBox('保存失败', '文件保存发生错误')
    }
}
async function saveMarkdown() {
    
}
module.exports = saveFile;