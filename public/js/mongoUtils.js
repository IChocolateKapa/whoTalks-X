/**
 * Created by Echo on 2016/1/14.
 */



var mongoUtil = {
    db: '',
    cfg: {},
    config: {
        'host': '127.0.0.1',
        'port': 27017,
        'dbname': 'echotest'
    },

    init: function (config) {

        var util = require("util"),
            extend = util._extend;

        var thisCfg = extend(this.config, config);

        this.cfg = thisCfg;

        var myDb = this.getConnection();

        //console.log("myDb = ", myDb);

        return myDb;

    },
    getConnection: function () {
        if (!this.db) {
            var mongoose = require('mongoose');
            //this.db = mongoose.createConnection('mongodb://' + this.cfg.host + ':' + this.cfg.port + '/' + this.cfg.dbname, {
            //    server: {poolSize: 10}
            //});

            this.db = mongoose.connect('mongodb://' + this.cfg.host + ':' + this.cfg.port + '/' + this.cfg.dbname);

            //this.db.on('error', console.error.bind(console, 'mongoDb 连接错误:'));
        }
        return this.db;
    },

    use: function () {

    },

    insert: function () {

    },

    update: function () {

    },

    remove: function () {

    },

    select: function () {

    }


};


// export them
module.exports =  mongoUtil;
