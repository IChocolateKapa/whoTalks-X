/**
 * Created by Echo on 2016/4/22.
 */

// define(function () {
    var Util= {
        getFormatTime: function () {
            var curD = new Date(),
                oTime = curD.getTime();

            var yesD = new Date();
            yesD.setTime(oTime);


            var year = yesD.getFullYear(),
                month = (yesD.getMonth() + 1) > 9 ? yesD.getMonth() + 1 : '0' + (yesD.getMonth() + 1),
                day = yesD.getDate() > 9 ? yesD.getDate(): '0' + yesD.getDate(),
                hour = yesD.getHours() > 9 ? yesD.getHours(): '0' + yesD.getHours(),
                minute = yesD.getMinutes() > 9 ? yesD.getMinutes(): '0' + yesD.getMinutes(),
                sec = yesD.getSeconds() > 9 ? yesD.getSeconds(): '0' + yesD.getSeconds();
            return ('' + year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + sec);
        },

        getChar: function (m) {
            var self = this;
            var ret = '';
            while(m != 0) {
                ret += base[self.getRanDomNumber(52)];
                m--;
            }
            return ret;
        },
        getRanDomNumber: function (n) {
            return Math.floor(Math.random()*n);
        },
        getAuthor: function () {
            var authors = ['Jacob', 'Alice', 'Bree', 'Lynnett', 'Natasha', 'Roger', 'Chandler', 'Joey', 'Mark', 'Marting','Jane', 'Joanne', 'Tracy', 'Jason', 'Taylor', 'Mars', 'Andrew', 'Jolin'];
            return authors[this.getRanDomNumber(authors.length)];
        },
        getClient: function () {
            var s = navigator.userAgent;
            if (s.indexOf('iPhone') != -1) {
                return '苹果手机';
            } else {
                return '安卓客户端';
            }
        }
    };

module.exports = Util;
    // return Util;

// });