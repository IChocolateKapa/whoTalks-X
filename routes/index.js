/**
 * Created by Echo on 2015/12/18.
 */
var express = require('express');
var router = express.Router();
var https = require('https');
var jsSHA = require('jssha');
//var str = 'jsapi_ticket=' + '1234' + '&noncestr=' + 'ewre' + '&timestamp='+ 'wewre' +'&url=' + 'wedwaf';
//shaObj = new jsSHA(str, 'TEXT');
//console.log(shaObj.getHash('SHA-1', 'HEX'));
// 2小时后过期，需要重新获取数据后计算签名
var expireTime = 7200 - 100;
var appInfo = {
    appid: 'wxcee47dce7e575f35',
    secret: '9fda98c5ce0bfab7fd89891fab47cfa5'
};
//var mongoUtil = require('../public/js/mongoUtils');
//var db = mongoUtil.init();
//
//var userModel = require('../public/js/userModel.js'),
//    _User = userModel.User;
//

/* first page user can access */
router.get('/', function(req, res) {
    res.render("login/index");
});

router.get('/login', function(req, res) {

    res.render("login/login");
});

router.get('/register', function(req, res) {
    res.render("login/register");
});

router.get('/index', function (req, res) {
    var username = req.query.user;

    _User.find(function (err, docs) {
        console.log('retretredocst: ', docs);
    });


    console.log("someone just logged in! name: ", username);

    console.log("global.io: ", global.io);

    global.io.on('connection', function (socket) {
        console.log("login emit!!!!");
        global.io.emit("userLogin", username);
    });

    res.render("main/main");
});

router.post('/sendCode', function(req, res) {
    var phoneNum = req.body.phone;
    //console.log("in req, phone is: ", phoneNum);
    /*需要验证手机号的格式*/
    var code = Math.floor(Math.random()*1000000);
    global.code = code;
    global.phoneNum = phoneNum;

    /*其实是需要给手机号发送短信， 这里就简化下流程吧*/
    res.send({'status': 'success', 'code': code, 'phone': phoneNum});
});

router.get('/fillCode', function (req, res) {
    var code = req.query.code;
    //console.log("code is: ", code);
    //console.log("global.phoneNum is: ", global.phoneNum);
    res.render("login/fillCode", {'code': code, 'phone': global.phoneNum});
});


router.post('/saveAccount', function(req, res) {
    var phone = req.body.phone,
        password = req.body.password,
        code = req.body.code;

    console.log("in save, code=", code);
    console.log("in save, global.code=", global.code);


    /*验证 验证码输入是否正确*/
    if (code != global.code) {
        res.send({'status': 'failed'});
    } else {

        /*这里其实是需要操作数据库--暂定mysql*/
        /*Echo Added --2016.01.15-- 使用mongodb*/

        var user = new _User({
            'email': '',
            'username': phone,
            'password': password
        });
        user.save();

        res.send({'status': 'success'});
    }
});

router.get('/getData', function (req, res) {
    _User.find(function (err, docs) {
        console.log(docs);
        res.send(docs);
    });

});

router.get('/main', function(req, res) {
    res.render("main/main", {
        countrys: ['中国', '日本', '韩国', '美国', '新西兰', '澳大利亚',
        '英国', '俄罗斯', '北京', '上海', '成都', '青岛', '云南', '益阳', '徐州', '海南', '天津', '深圳', '香港', '台北', '新竹']
    });
});


router.get('/chat', function (req, res) {

    res.render('chat/chat', {
        'name': 'Echo'
    });
});




router.get('/shop', function (req, res) {
    res.render('shop/index', {
        title: '商铺首页',
        keywords: '电商,移动端'
    });
});

router.get('/shop2', function (req, res) {
    res.render('shop2/index', {
        title: '商铺首页2-mixin重写',
        keywords: '电商,移动端'
    });
});



router.get('/spinner', function (req, res) {
    res.render('spinner/index', {
        title: '幸运大转盘',
        keywords: '娱乐,游戏'
    });
});



router.get('/birthShow', function (req, res) {
    res.render('birthShow/index', {
        title: '生日快乐',
        keywords: '娱乐,游戏'
    });
});



router.get('/wxsdk', function (req, res) {
    res.render('wxsdk/index', {
        title: '摇一摇',
        keywords: '娱乐,游戏'
    });
});

var cachedSignatures = {};
router.post('/getAppInfo', function (req, res) {
    var _url = req.body.url.split('#')[0];

    // 获取微信签名所需的access_token
    https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ appInfo.appid +'&secret=' + appInfo.secret, function(_res) {
        var str = '';
        _res.on('data', function(data){
            str += data;
        });
        _res.on('end', function(){
            console.log('return access_token:  ' + str);
            try{
                var resp = JSON.parse(str);
            }catch(e){
                //console.log('解析access_token返回的JSON数据错误');
                return errorRender(res, '解析access_token返回的JSON数据错误', str);
            }

            getTicket(_url, res, resp);
        });
    });

});


// 输出数字签名对象
var responseWithJson = function (res, data) {
    // 允许跨域异步获取
    res.set({
        "Access-Control-Allow-Origin": "*"
        ,"Access-Control-Allow-Methods": "POST,GET"
        ,"Access-Control-Allow-Credentials": "true"
    });
    res.json(data);
};

// 随机字符串产生函数
var createNonceStr = function() {
    return Math.random().toString(36).substr(2, 15);
};

// 时间戳产生函数
var createTimeStamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};

//错误处理函数
var errorRender = function (res, info, data) {
    if(data){
        console.log(data);
        console.log('---------');
    }
    res.set({
        "Access-Control-Allow-Origin": "*"
        ,"Access-Control-Allow-Methods": "POST,GET"
        ,"Access-Control-Allow-Credentials": "true"
    });
    responseWithJson(res, {errmsg: 'error', message: info, data: data});
};

// 计算签名
var calcSignature = function (ticket, noncestr, ts, url) {
    var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
    shaObj = new jsSHA(str, 'TEXT');
    return shaObj.getHash('SHA-1', 'HEX');
};

// 获取微信签名所需的ticket
var getTicket = function (url, res, accessData) {
    https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ accessData.access_token +'&type=jsapi', function(_res){
        var str = '', resp;
        _res.on('data', function(data){
            str += data;
        });
        _res.on('end', function(){
            console.log('return ticket:  ' + str);
            try{
                resp = JSON.parse(str);
            }catch(e){
                return errorRender(res, '解析远程JSON数据错误', str);
            }

            var appid = appInfo.appid;
            var ts = createTimeStamp();
            var nonceStr = createNonceStr();
            var ticket = resp.ticket;
            var signature = calcSignature(ticket, nonceStr, ts, url);

            cachedSignatures[url] = {
                nonceStr: nonceStr,
                appid: appid,
                timestamp: ts,
                signature: signature,
                url: url
            };

            responseWithJson(res, cachedSignatures[url]);
        });
    });
};

router.get('/weibo', function (req, res) {
    res.render('weibo/index');
});

/*generate fake data for weibo*/
router.post('/getFakeData', function(req, res) {

    function getRanDomNumber (n) {
        return Math.floor(Math.random()*n);
    }
    var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    function getChar (m) {
        var ret = '';
        while(m != 0) {
            ret += base[getRanDomNumber(52)];
            m--;
        }
        return ret;
    }
    /*return:
    * yyyy-mm-dd hh:mm:ss
    * */
    function getFormatTime () {
        var curD = new Date(),
            oTime = curD.getTime();

        var yesD = new Date();
        yesD.setTime(oTime);


        var year = yesD.getFullYear(),
            month = (yesD.getMonth() + 1) > 9 ? yesD.getMonth() + 1 : '0' + (yesD.getMonth() + 1),
            day = yesD.getDate() > 9 ? yesD.getDate(): '0' + yesD.getDate(),
            hour = yesD.getHours(),
            minute = yesD.getMinutes(),
            sec = yesD.getSeconds();


        return ('' + year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + sec);
    }

    var clients = ['三星Note5', 'MX4', '华为Mate8', '红米', 'HTC One', '安卓客户端', 'iphone 5', 'iphone 6', 'iphone 6s', 'iphone 6s plus'];
    var contents = [
        '乱花渐欲迷人眼，浅草才能没马蹄, 又来到颐和园的白堤，心情仿佛也回到了3年前那次春游，愿我们心如明镜，不卑不亢，接受生活的美好和丑恶',
        '终于爬到山顶啦！快看是谁在偷笑~~',
        '昨天加班到深夜，今天又在催，妈的智障吗？不会安排工作就不要安排',
        '秒针分针滴答滴答在转动，我的内心忽上忽下的阵阵悸动。明天我要嫁给你啦，明天我要嫁给你啦，要不是你问我，要不是你劝我，要不是适当的时候，你让我心动。【此时应该响起婚礼进行曲的钢琴版.....】',
        '看来我真的不适合养花啊，花都死掉了，绿色盆栽都被太阳烤糊了。cry...',
        '窗户开或者关，完全看个人心情， 就像我的头发，我自己的头发爱怎么弄就怎么弄，你他妈算个鸟，用你来指导！',
        '路过森林，山泉的声音非常吸引人，就像森林在低吟浅唱',
        '"靠过来，听回响，永恒就是这一秒的时间"',
        '你的温柔怎可以捕捉？',
        '茶没有喝光早变酸，从来没热恋已相恋。陪着你天天在兜圈，那缠绕，怎么可算短？你的衣裳今天我再穿，未留住你，却仍然温暖。',
        '一个一个一个人 谁比谁美丽, 一个一个一个人 谁比谁甜蜜,一个一个一个人 谁比谁容易,又有什么了不起',
        '有太多太多魔力 太少道理,太多太多游戏 只是为了好奇,还有什么值得 歇斯底里,对什么东西 死心塌地,一个一个偶像 都不外如此,沉迷过的偶像 一个个消失,谁曾伤天害理 谁又是上帝, 我们在等待 什么奇迹,最后剩下自己 舍不得挑剔,最后对着自己 也不大看得起,谁给我全世界 我都会怀疑,心花怒放 却开到荼蘼',
        '无聊透顶的人。确实没有什么值得歇斯底里。',
        '心花怒放，开到荼蘼',
        '如果可以磊落，谁情愿闪躲。如果可以快乐，谁愿意忘掉心魔。或者，偷心要先去偷情，为了担一个愉快罪名。亦比寂寞人值得高兴。能浏览遍好风景才去认命，才不需要突发事情。'

    ];
    var pro = [],
        cmt = [];
    for (var i = 0; i < 5; i++) {
        cmt = [];
        if (i % 2 == 0) {
            for (var j = 0; j < 3; j++) {
                cmt.push({
                    headimg: './img/myhead/' + getRanDomNumber(12) + '.jpg',
                    author: getChar(6),
                    time: getFormatTime(),
                    likes: getRanDomNumber(30),
                    content: contents[getRanDomNumber(contents.length)]
                })
            }
        }


        pro.push({
            headimg: './img/myhead/' + getRanDomNumber(12) + '.jpg',
            author: getChar(6),
            time: getFormatTime(),
            client: clients[getRanDomNumber(10)],
            likes: getRanDomNumber(30),
            content: contents[getRanDomNumber(contents.length)],
            comments: cmt
        })
    }

    res.send({'data': pro});
});




module.exports = router;
