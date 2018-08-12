const { dialog, ipcMain } = require('electron');
const configs = require('../configs/index');
const fileUtils = require('../utils/file');
function saveBtnClick(menus, win) {
    win.webContents.send('saveMarkdown');
}
function saveAsBtnClick(menus, win) {
    win.webContents.send('saveAsMarkdown');    
}
/* 保存的方法 */
async function saveFile(arg) {
    /* 没有路径转为saveas方法 */
    if (!configs.currentFilepath || !await fileUtils.isExist(configs.currentFilepath)) {
        return saveAs(arg);
    }  
    try {
        await fileUtils.saveString(configs.currentFilepath, arg);
    } catch (e) {
        console.log(e);
        dialog.showErrorBox('保存失败', '文件保存发生错误');
    }
}
/* 另存为方法 */
async function saveAs(arg) {
    try {
        dialog.showSaveDialog({
            title: '保存文档',
            filters: [
                { name: 'markdown', extensions: ['md']}
            ]
        }, async function(filePath) {
            configs.currentFilepath = filePath;
            await fileUtils.saveString(filePath, arg);
        })
    } catch(e) {
        console.log(e);
        dialog.showErrorBox('保存失败', '文件保存发生错误');
    }
}
module.exports = {
    saveFile,
    saveAs,
    saveBtnClick,
    saveAsBtnClick
};