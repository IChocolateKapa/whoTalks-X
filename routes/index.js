/**
 * Created by Echo on 2015/12/18.
 */
var express = require('express');
var router = express.Router();

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


router.post('/sendCode', function(req, res, next) {
    var phoneNum = req.body.phone;
    console.log(phoneNum);
    /*需要验证手机号的格式*/
    var code = Math.floor(Math.random()*1000000);
    global.code = code;

    /*其实是需要给手机号发送短信， 这里就简化下流程吧*/
    res.send({'status': 'success', 'code': code, 'phone': phoneNum});
});

router.get('/fillCode', function(req, res, next) {
    var code = req.query.code;
    console.log(code);
    res.render("login/fillCode", {'code': code});
});


router.post('/saveAccount', function(req, res, next) {
    var phone = req.body.phone,
        password = req.body.password,
        code = req.body.code;

    /*验证 验证码输入是否正确*/
    if (code != global.code) {
        res.send({'status': 'failed'})
    } else {
        res.send({'status': 'success'})
    }

    console.log(phone, ": ", phone);

    res.render("login/", {'code': code});
});




module.exports = router;
