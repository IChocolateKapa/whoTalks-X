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
    console.log("Fuck all of you!");
    var phoneNum = req.body.phone;
    console.log(phoneNum);
    /*需要验证手机号的格式*/
    res.send({'status': 'success'});
});



module.exports = router;
