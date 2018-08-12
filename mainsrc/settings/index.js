const nedb = require('nedb');
const db = new nedb({
    filename: './data/save.db',
    autoload: true
});
/* 设置配置 */
function updateSettings(o) {
    let _id = 'settings';
    return new Promise((resolve, reject) => {
        db.update({_id}, {$set: o}, { multi: true }, function(err, doc) {
            if (err) reject(err);
            else resolve(doc);
        });
    });
}
/* 获取配置 */
function querySettings() {
    return new Promise((resolve, reject) => {
        db.findOne({}, (err, doc) => {
            if (err) resolve();
            else resolve(doc);
        })
    });
}

function initSettings() {
    return new Promise((resolve, reject) => {
        db.insert({
            _id: "settings",
            width: 600,
            height: 500
        }, (err, doc) => {
            if (err) reject(err);
            else resolve(doc);
        })
    });
}

module.exports = {
    querySettings,
    updateSettings,
    initSettings
}