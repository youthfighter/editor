const fs = require('fs');


module.exports = {
    getString,
    saveString,
    isExist
}
/**
 * 
 * @param {string} filePath 文件路径
 * @return {Promise<string>} 返回文件内容 
 */
async function getString(filePath) {
    console.log(filePath);
    return readFile(filePath);
}
/**
 * 
 * @param {string} filePath 文件路径
 * @return {Promise<boolean>} 返回保存结果
 */
async function saveString(filePath, str) {
    return writeFile(filePath, str);
}

/**
 * 
 * @param {string} filePath
 * @return {Promise<boolean>} 返回是否存在 
 */
function isExist(filePath) {
    return new Promise((reslove, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            reslove(!err);
        });
    });
}
/**
 * @param {string} filePath
 * @return {Promise<string>} 返回文件内容
 */
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if(err) reject(err);
            else resolve(data.toString());
        });    
    });
}
/**
 * @param {string} filePath
 * @return {Promise<boolean>} 返回错误信息或true
 */
function writeFile(filePath, str) {
    return new Promise((reslove, reject) => {
        fs.writeFile(filePath, str,function (err) {
            if(err) reject(err);
            else reslove(true);
        });
    });
}
