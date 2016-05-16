/**
 * Created by Echo on 2016/5/16.
 */
var mongoose = require('mongoose');

var db = null,
    Dongtan = require('./schema_model/Dongtan'),
    Comments = require('./schema_model/Comments'),
    util = require('../util');

function initData () {

    var clients = ['三星Note5', 'MX4', '华为Mate8', '红米', 'HTC One', '安卓客户端', 'iphone 5', 'iphone 6', 'iphone 6s', 'iphone 6s plus'];

    var authors = ['Lily', 'Williams', 'James', 'Charlot', 'Jack', 'Emily', 'Spencer', 'Tony', 'Bary', 'Histing'];
    var contents = [
        '乱花渐欲迷人眼，浅草才能没马蹄, 又来到颐和园的白堤，心情仿佛也回到了3年前那次春游，愿我们心如明镜，不卑不亢，接受生活的美好和丑恶',
        '终于爬到山顶啦！快看是谁在偷笑~~',
        '解释春风无限恨，沉香亭北倚阑干',
        'You can easily be the top 10% if you work harder than common people, cause most people can not say they have tied their best, even they do not make any effort.',
        '秒针分针滴答滴答在转动，我的内心忽上忽下的阵阵悸动。明天我要嫁给你啦，明天我要嫁给你啦，要不是你问我，要不是你劝我，要不是适当的时候，你让我心动。【此时应该响起婚礼进行曲的钢琴版.....】',
        '看来我真的不适合养花啊，花都死掉了，绿色盆栽都被太阳烤糊了。cry...',
        '窗户开或者关，完全看个人心情， 就像我的头发，我自己的头发爱怎么弄就怎么弄，不用你来指导',
        '路过森林，山泉的声音非常吸引人，就像森林在低吟浅唱',
        '"靠过来，听回响，永恒就是这一秒的时间"',
        '你的温柔怎可以捕捉？',
        '茶没有喝光早变酸，从来没热恋已相恋。陪着你天天在兜圈，那缠绕，怎么可算短？你的衣裳今天我再穿，未留住你，却仍然温暖。',
        '一个一个一个人 谁比谁美丽, 一个一个一个人 谁比谁甜蜜,一个一个一个人 谁比谁容易,又有什么了不起',
        '有太多太多魔力 太少道理,太多太多游戏 只是为了好奇,还有什么值得 歇斯底里,对什么东西 死心塌地,一个一个偶像 都不外如此,沉迷过的偶像 一个个消失,谁曾伤天害理 谁又是上帝, 我们在等待 什么奇迹,最后剩下自己 舍不得挑剔,最后对着自己 也不大看得起,谁给我全世界 我都会怀疑,心花怒放 却开到荼蘼',
        '无聊透顶的人。确实没有什么值得歇斯底里。',
        '心花怒放，开到荼蘼',
        '如果可以磊落，谁情愿闪躲。如果可以快乐，谁愿意忘掉心魔。或者，偷心要先去偷情，为了担一个愉快罪名。亦比寂寞人值得高兴。能浏览遍好风景才去认命，才不需要突发事情。',
        '我等的恋人最怕过节。',
        '写了卡片能够寄给谁，心碎的像天上的纸屑。',
        '清风徐来，水波不兴',
        '本来是去看长在舌头上的大疙瘩，结果变成了治疗鼻窦炎，是最无奈的事情了。',
        '今天给几位阿拉伯的朋友或者我我也不知道哪国的朋友，充当了翻译，感觉自己英文真是很令我感动。老刘在旁边快笑出眼泪了，希望没有给挂错号[认真脸]',
        '一直被穿小鞋，从未被超越。也是醉了。呵呵哒。'
    ];

    var len = authors.length;
    for (var i = 0; i < len; i++) {
        var mydt = new Dongtan({
            id: '',
            headimg: 'http://wuhaiping.com/myhead/' + util.getRanDomNumber(12) + '.jpg',
            author: authors[i],
            time: util.getFormatTime(),
            client: clients[i],
            likes: 0,
            likeflag: false,
            content: contents[util.getRanDomNumber(contents.length)],
            comments: [],
            showflag: false,
            starflag: false
        });

        mydt.save();
    }

}


function initDB () {

    mongoose.connect('mongodb://localhost/weibo', {
        autoIndex: false
    });
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log('connection built successfully!');
    });


    Dongtan.find(function (err, dts) {
        if (err) return console.error(err);

        console.log('dts: ', dts);

        if (dts.length == 0) {
            initData(Dongtan);
        }
    });


    return [db, Dongtan, Comments];
}



function getConnection() {
    var ret;
    if (db == null) {
        ret = initDB();
    } else {
        ret = [db, Dongtan, Comments];
    }
    return ret;
}

//getConnection();

module.exports = {
    getConnection: getConnection
};
