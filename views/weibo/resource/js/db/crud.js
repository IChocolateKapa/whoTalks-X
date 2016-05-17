/**
 * Created by Echo on 2016/5/16.
 */

var mongoose = require('mongoose'),
    rt = require('./schema_model/Dongtan'),
    Comments = require('./schema_model/Comments'),
    initDb = require('./initDb');

function test() {
    initDb.getConnection();
    rt.find(function (err, dts) {
        if (err) return console.error(err);
        console.log('dts: ', dts);
    });
}

var CRUD = {
    insert: function (tableName, param, callback) {
        if (Object.prototype.toString.call(param) != '[object Object]') {
            console.error('Error -- param is not json type');
            return;
        }
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        var newInstance = new table(param);
        newInstance.save();
        callback && callback(newInstance);
    },
    remove: function (tableName, param, callback) {
        if (Object.prototype.toString.call(param) != '[object Object]') {
            console.error('Error -- param is not json type');
            return;
        }
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.remove(param, function (err) {
            if (err) return console.error(err);
            callback();
        });
    },

    findById: function (tableName, id, callback) {
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.findById(id, function (err, ret) {
            if (err) return console.error(err);
            callback(ret);
        })
    },
    update: function (tableName, findParam, updateParam, callback) {
        if (Object.prototype.toString.call(param) != '[object Object]') {
            console.error('Error -- param is not json type');
            return;
        }
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.update(findParam, updateParam, function (err) {
            if (err) return console.error(err);
            callback();
        });
    },

    find: function (tableName, param, callback) {
        if (Object.prototype.toString.call(param) != '[object Object]') {
            console.error('Error -- param is not json type');
            return;
        }
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.find(param, function (err, results) {
            if (err) return console.error(err);
            callback(results);
        });
    }
};



/*CRUD.findById('Dongtan', {'_id': '5739e6da0ffb4c4603bdd562'}, function (results) {
    var num = -1;
    results.likes = results.likes + num;
    // results.save();
    console.log('in callback, results: ',  results);
});*/

/*CRUD.find('Dongtan', {}, function (ret) {
    var len = ret.length;
    for (var i = 0; i < len; i++) {
        console.log(ret[i].comments);
    }
});*/
var id = new mongoose.Schema.Types.ObjectId();
console.log(id)



 module.exports = CRUD;


