const nedb = require('nedb');

/* 设置配置 */
function updateSettings(o) {
    const db = new nedb({
        filename: './data/save.db',
        autoload: true
    });
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
    const db = new nedb({
        filename: './data/save.db',
        autoload: true
    });
    return new Promise((resolve, reject) => {
        db.findOne({}, (err, doc) => {
            if (err) reject(err);
            else resolve(doc);
        })
    });

    db.findOne({}, cb);
}

function initConfig() {
    const db = new nedb({
        filename: './data/save.db',
        autoload: true
    });
    db.insert({
        _id: 'width',
        width: 2000,
        height: 1000
    }, function(err) {
        if (err) return;
        console.log('ok');
    })
}

/* initConfig(); */
updateSettings({"width":1000});
/* querySettings().then(function(doc) {
    console.log(doc);
}) */