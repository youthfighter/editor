const DbService = require('../utils/dbService');
const fileUtils = require('../utils/file');
const configs = require('../configs/index');
const { dialog } = require('electron');
class RecentOpenFileList extends DbService{
    constructor(filename){
        super(filename);
    }

    async insertOpenFile(filePath) {
        try {
            let data = await this.findOne({});
            if (data && data.list) {
                let idx = data.list.indexOf(filePath);
                if (idx != -1) data.list.splice(idx, 1);
                data.list.unshift(filePath);
                let _id = data._id;
                await this.update({ _id }, data, { multi: true });
            } else {
                await this.insert({
                    list:[filePath]
                })
            }
        } catch(e) {
            console.log(e);
        }
    }
    async removeOpenFile(filePath) {
        try {
            let data = await this.findOne({});
            if (data && data.list) {
                let idx = data.list.indexOf(filePath);
                if (idx != -1) data.list.splice(idx, 1);
                let _id = data._id;
                await this.update({ _id }, data, { multi: true });
            }
        } catch(e) {
            console.log(e);
        }
    }
    async getRecentOpenFileMenus() {
        let o = [];
        let self = this;
        try {
            let data = await this.findOne({});
            if (data && data.list) {
                for(let filePath of data.list) {
                    o.push({
                        label: filePath,
                        click: function(a, win) {
                            self.openFile(win, filePath);
                        }
                    })
                }
            } 
        } catch(e) {
            console.log(e);
        }
        return o;
    }

    async clearRecentOpenFileList() {
        try {
            let data = await this.findOne({});
            if (data && data.list) {
                data.list = [];
                let _id = data._id;
                await this.update({_id}, data, { multi: true });
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    async getFirstFilePath() {
        let ret = '';
        try {
            let res = await this.findOne({ });
            if (res && res.list && res.list.length > 0) ret = res.list[0]
        } catch(e) {
            console.log(err);
        }
        return ret;
    }

    async openDefaultFile(win) {
        let filePath = await this.getFirstFilePath();
        if (filePath && await fileUtils.isExist(filePath)) await this.openFile(win, filePath);
    }

    async openFile(win, filePath) {
        try {
            await this.insertOpenFile(filePath);
            configs.currentFilepath = filePath;
            let md = await fileUtils.getString(filePath);
            win.webContents.send('openMarkdown', md);
        } catch(e) {
            console.log(e);
            if (e.errno === -4058) {
                await this.removeOpenFile(filePath);
                dialog.showErrorBox('打开失败', '文件已经被删除');
            } else {
                dialog.showErrorBox('打开失败', '打开文件失败');
            }
            
        }
    }
}


module.exports = new RecentOpenFileList('./data/recentOpenList.db');