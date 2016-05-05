/**
 * Created by Echo on 16/3/25.
 */

define(['jquery'], function () {
    var util = {
        toggleClass: function ($obj, className) {
            if ($obj.hasClass(className)) {
                $obj.removeClass(className);
            } else {
                $obj.addClass(className);
            }
        },
        /**
         * @param: n -- 获取今天之前n天的年月日, 比如昨天就是1
         * @返回值: yyyy-mm-dd
         * */
        getDateTarget: function (n) {
            var curD = new Date(),
                oTime = n ? curD.getTime() - 1000*60*60*24*n : curD.getTime();

            var yesD = new Date();
            yesD.setTime(oTime);


            var year = yesD.getFullYear(),
                month = (yesD.getMonth() + 1) > 9 ? yesD.getMonth() + 1 : '0' + (yesD.getMonth() + 1),
                day = yesD.getDate() > 9 ? yesD.getDate(): '0' + yesD.getDate();


            return ('' + year + month + day);
            //return ('' + year + month + day);
        },
        getDate: function (n) {
            var curD = new Date(),
                oTime = n ? curD.getTime() - 1000*60*60*24*n : curD.getTime();

            var yesD = new Date();
            yesD.setTime(oTime);


            var year = yesD.getFullYear(),
                month = yesD.getMonth() + 1,
                day = yesD.getDate();


            return ('' + month + '.' + day + ' ');
        }
    };

    return util;
});