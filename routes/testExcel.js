/**
 * Created by Echo on 2016/4/21.
 */


/*nodejs 操作excel表格*/
var xlsx = require('node-xlsx');
var list = xlsx.parse('4.xlsx')[0].data;
//console.log('excel list is: ', list);

var ret = [],
    temp = [],
    mapTemp = {};
for (var i = 2; i < list.length; i++) {
    mapTemp = {
        'name': list[i][2],
        'title': list[i][8],
        'department': list[i][6],
        'inTime': list[i][9],
        'pic': 'http://j2.58cdn.com.cn/mis/bc/order/orderOnline/birthShowNew/userPicture/' + list[i][13] + '.png',
        'birthday': list[i][4],
        'wishType': list[i][10]? '好友寄语': '心愿',
        'wish': list[i][10]?list[i][10]: (list[i][11]?list[i][11]:'')
    };
    temp.push(mapTemp);
    if (i % 2 == 0 && i != 2) {
        ret.push(temp);
        temp = [];
    }
}

console.log('myret :', ret);


