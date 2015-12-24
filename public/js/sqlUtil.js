/**
 * Created by Echo on 15/12/24.
 */


var mysqlUtil = {

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