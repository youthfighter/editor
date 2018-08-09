const nedb = require('nedb');
const db = new nedb({
    filename: './data/save.db',
    autoload: true
});
/* 设置配置 */
function updateSettings(o) {
    let _id = 'width';
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
            if (err) reject(err);
            else resolve(doc);
        })
    });

    db.findOne({}, cb);
}

module.exports = {
    querySettings,
    updateSettings
}