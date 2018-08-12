/**
 * 菜单目录
 */
const { openFileBtnClick } = require('./openFile');
const { saveBtnClick, saveAsBtnClick } = require('./saveFile');
const { newFileBtnClick } = require('./newFile');
const recentOpenFileList = require('./recentOpenFileList');
//console.log(await getRecentOpenFileMenus);
 /* 获取菜单项 */

async function getMenus() {
    return [{
        label: '文件',
        submenu:[
            {
                label:'新建文件',
                click: newFileBtnClick
            },
            {
                label:'打开文件',
                click: openFileBtnClick
            }, 
            {
                label:'最近打开文件',
                submenu: [
                    ...(await recentOpenFileList.getRecentOpenFileMenus()),
                    {
                        type: 'separator'
                    },
                    {
                        label: '清除最近打开记录',
                        click: function() {
                            recentOpenFileList.clearRecentOpenFileList()
                        }
                    }
                ]
            }, 
            {
                type: 'separator'
            },
            {
                label:'保存',
                click: saveBtnClick
            },
            {
                label:'另保存',
                click: saveAsBtnClick
            },
            {
                type: 'separator'
            },
            {
                label:'退出',
                click:function(menus, win){
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
module.exports = getMenus;