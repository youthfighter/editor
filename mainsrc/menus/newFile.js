const configs = require('../configs/index');
function newFileBtnClick(menus, win) {
    configs.currentFilepath = null;
    win.webContents.send('newMarkdown');
}

module.exports = {
    newFileBtnClick
}