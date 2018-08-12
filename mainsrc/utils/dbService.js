const nedb = require('nedb');
class DbService {
    constructor(filename) {
        this.db = new nedb({ filename, autoload: true });
    }
    /**
     * 
     * @param { object } query object类型，查询条件。支持使用比较运算符($lt, $lte, $gt, $gte, $in, $nin, $ne), 逻辑运算符($or, $and, $not, $where), 正则表达式进行查询。
     * @return 查询Promise<object>
     */
    find(query) {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, docs) => {
                if (err) reject(err);
                else resolve(docs);
            })
        });
    }
    findOne(query) {
        return new Promise((resolve, reject) => {
            this.db.findOne({}, (err, doc) => {
                if (err) reject(err);
                else resolve(doc);
            })
        });
    }
    /**
     * 
     * @param {object | array} doc 要插入的文档
     * @return 插入结果
     */
    insert(doc) {
        return new Promise((resolve, reject) => {
            this.db.insert(doc, (err, newDoc) => {
                if (err) reject(err);
                else resolve(newDoc);
            })
        });
    }

    update(query, update, options) {
        return new Promise((resolve, reject) => {
            this.db.update(query, update, options, (err, numReplaced) => {
                if (err) reject(err);
                else resolve(numReplaced);
            })
        });
    }

    remove(query, update) {
        return new Promise((resolve, reject) => {
            this.db.remove(query, options, (err, numRemoved) => {
                if (err) reject(err);
                else resolve(numRemoved);
            })
        });
    }

    count(query) {
        return new Promise((resolve, reject) => {
            this.db.count(query, options, (err, count) => {
                if (err) reject(err);
                else resolve(count);
            })
        });
    }
}

module.exports = DbService;