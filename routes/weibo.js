/**
 * Created by Echo on 2016/5/16.
 */

var express = require('express');
var router = express.Router();
var https = require('https');
var initDb = require('../views/weibo/resource/js/db/initDb');
var ret = initDb.getConnection();
// [db, dongtanSchema, commentSchema]
var db = ret[0],
    dongtanSchema = ret[1],
    commentSchema = ret[2];

var Dongtan = db.model('Dongtan', dongtanSchema),
    Comments = db.model('Comments', commentSchema);




router.get('/', function (req, res) {
    res.render('weibo/index');
});

/*generate fake data for weibo*/
router.post('/getFakeData', function(req, res) {

    var crud = require('../views/weibo/resource/js/db/crud');

    crud.findSort('Dongtan', {}, {sort: [['_id', -1]]}, function (results) {
        res.send({'data': results});
    });

    /*console.log(crud);
    var pro = [],
        cmt = [];
    for (var i = 0; i < 10; i++) {
        cmt = [];
        if (i % 2 == 0) {
            for (var j = 0; j < 4; j++) {
                cmt.push({
                    headimg: 'http://wuhaiping.com/myhead/' + getRanDomNumber(12) + '.jpg',
                    author: getChar(6),
                    time: getFormatTime(),
                    likes: getRanDomNumber(30),
                    likeflag: Math.floor(Math.random()*10)%2 == 0? true: false,
                    content: contents[getRanDomNumber(contents.length)]
                })
            }
        }


        pro.push({
            headimg: 'http://wuhaiping.com/myhead/' + getRanDomNumber(12) + '.jpg',
            author: getChar(6),
            time: getFormatTime(),
            client: clients[getRanDomNumber(10)],
            likes: getRanDomNumber(30),
            likeflag: Math.floor(Math.random()*10)%2 == 0? true: false,
            content: contents[getRanDomNumber(contents.length)],
            comments: cmt,
            showflag: false,
            starflag: Math.floor(Math.random()*10)%2 == 0? true: false
        })
    }*/


    


});



module.exports = router;