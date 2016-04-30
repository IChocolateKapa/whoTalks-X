/**
 * Created by Echo on 2016/4/22.
 */

define([], function () {
    var Util = {};
    var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var clients = ['三星Note5', 'MX4', '华为Mate8', '红米', 'HTC One', '安卓客户端', 'iphone 5', 'iphone 6', 'iphone 6s', 'iphone 6s plus'];
    Util= {
        getFormatTime: function () {
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
        getClient: function () {
            return clients[this.getRanDomNumber(10)];
        }
    };

    return Util;

});