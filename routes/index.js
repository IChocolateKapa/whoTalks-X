/**
 * Created by Echo on 2015/12/18.
 */
var express = require('express');
var router = express.Router();

var mongoUtil = require('../public/js/mongoUtils');

console.log("mongoUtil: ", mongoUtil);
//mongoUtil.init();

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

        res.send({'status': 'success'})
    }
});

router.get('/main', function(req, res, next) {
    res.render("main/main", {
        countrys: ['中国', '日本', '韩国', '美国', '新西兰', '澳大利亚',
        '英国', '俄罗斯', '北京', '上海', '成都', '青岛', '云南', '益阳', '徐州', '海南', '天津', '深圳', '香港', '台北', '新竹']
    });
});


router.get('/chat', function (req, res, next) {
    res.render('chat/chat', {
        'name': 'Echo'
    });
});



module.exports = router;
