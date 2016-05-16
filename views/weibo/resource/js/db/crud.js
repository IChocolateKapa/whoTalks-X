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
    insert: function (tableName, param) {
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        var newInstance = new table(param);
        newInstance.save();
    },
    remove: function (tableName, param, callback) {
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.remove(param, function (err) {
            if (err) return console.error(err);
            callback();
        });
    },

    update: function (tableName, findParam, updateParam, callback) {
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.update(findParam, updateParam, function (err) {
            if (err) return console.error(err);
            callback();
        });
    },

    find: function (tableName, param, callback) {
        initDb.getConnection(tableName);
        var table = require('./schema_model/' + tableName);
        table.find(param, function (err, results) {
            if (err) return console.error(err);
            console.log('results: ', results);
            callback(results);
        });
    }
};

 module.exports = CRUD;