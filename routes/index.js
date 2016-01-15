/**
 * Created by Echo on 2015/12/18.
 */
var express = require('express');
var router = express.Router();

/*node.js 复制， 扩展对象 -- 开始 --*/
var config = {
    'name': '23243',
    'props': {
        'age': 34,
        'leave': {
            'a': 1,
            'b': 2
        }
    }
};

var util = require("util"),
    extend = util._extend;

var er = extend({'gender': 'female'}, config);
console.log("thisCfg: ", er);

/*node.js 复制， 扩展对象 -- 结束 --*/


/* first page user can access */
router.get('/', function(req, res, next) {
    res.render("login/index");
});

router.get('/login', function(req, res, next) {
    res.render("login/login");
});

router.get('/register', function(req, res, next) {
    res.render("login/register");
});

router.get('/index', function (req, res, next) {
    res.render("main/main")
})

router.post('/sendCode', function(req, res, next) {
    var phoneNum = req.body.phone;
    //console.log("in req, phone is: ", phoneNum);
    /*需要验证手机号的格式*/
    var code = Math.floor(Math.random()*1000000);
    global.code = code;
    global.phoneNum = phoneNum;

    /*其实是需要给手机号发送短信， 这里就简化下流程吧*/
    res.send({'status': 'success', 'code': code, 'phone': phoneNum});
});

router.get('/fillCode', function(req, res, next) {
    var code = req.query.code;
    //console.log("code is: ", code);
    //console.log("global.phoneNum is: ", global.phoneNum);
    res.render("login/fillCode", {'code': code, 'phone': global.phoneNum});
});


router.post('/saveAccount', function(req, res, next) {
    var phone = req.body.phone,
        password = req.body.password,
        code = req.body.code;

    console.log("in save, code=", code);
    console.log("in save, global.code=", global.code);


    /*验证 验证码输入是否正确*/
    if (code != global.code) {
        res.send({'status': 'failed'})
    } else {

        /*这里其实是需要操作数据库--暂定mysql*/
        /*Echo Added --2016.01.15-- 使用mongodb*/
        var mongodb = require('mongodb');
        var server = new mongodb.Server("127.0.0.1", 27017, {});//本地27017端口

        new mongodb.Db('echotest', server, {}).open(function (error, client) {//数据库：echotest

            if(error) throw error;

            var collection = new mongodb.Collection(client, 'userList');//表：userList

            collection.insert({
                'username': phone,
                'password': password
            });

            collection.find(function (error, cursor) {

                cursor.each(function (error, doc) {
                    if (doc) {
                        console.log(doc);
                    }
                });
            });
        });


        res.send({'status': 'success'})
    }
});




module.exports = router;
