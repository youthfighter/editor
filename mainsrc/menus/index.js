/**
 * 菜单目录
 */
const openFile = require('./openFile');
const saveFile = require('./saveFile');
 /* 获取菜单项 */
menus = [{
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
            click: openFile
        }, 
        {
            type: 'separator'
        },
        {
            label:'保存',
            click: saveFile
        },
        {
            label:'另保存',
            click:function(){
                saveFile();
            }
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
module.exports = menus;