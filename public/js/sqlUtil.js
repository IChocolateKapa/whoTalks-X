/**
 * Created by Echo on 15/12/24.
 */


var mysqlUtil = {
    config: {
        host: 'localhost',
        user: 'root',
        password: 'whp123292',
        database: 'whoTalkx'
    },
    getConnection: function (cfg) {
        var _this = this,
            connectionConfig = {};

        if (cfg) {
            connectionConfig = cfg;
        } else {
            connectionConfig = _this.config;
        }

        client = mysql.createConnection(connectionConfig);

        client.connect();

        return client;



    }
}

var http = require('http'),
    mysql = require('mysql');

var sqlInfo = {
    host: 'localhost',
    user: 'root',
    password: 'whp123292',
    database: 'whoTalkx'
}

client = mysql.createConnection(sqlInfo);

client.connect();


module.exports =  mysqlUtil;