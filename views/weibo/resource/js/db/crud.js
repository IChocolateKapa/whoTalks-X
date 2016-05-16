/**
 * Created by Echo on 2016/5/16.
 */

var mongoose = require('mongoose'),
    Dongtan = require('./schema_model/Dongtan'),
    Comments = require('./schema_model/Comments');

function test() {
    Dongtan.find(function (err, dts) {
        if (err) return console.error(err);

        console.log('dts: ', dts);
    });
}

test();


var CRUD = {
    insert: function (db, param) {


    },
    remove: function (db) {

    },

    find: function (db, param) {

    }
};

// module.exports = CRUD;