/**
 * Created by Echo on 2016/5/5.
 */

var express = require('express');
var router = express.Router();
var https = require('https');

router.get('/systemMonitor', function(req, res) {
    res.render("systemMonitor/index");
});
router.post('/getSystemMonitorData', function(req, res) {
    var oprate = req.body.operate,
        graph_type = req.body.graph_type,
        data = {};


    if (oprate == 'zengzhiservice') {
        switch(graph_type) {
            case 'list1':
                data =  {
                    pv: {
                        dd: '7014',
                        today: '今日(20160426)2545',
                        yesterday: '昨日(20160425)2277',
                        ribi: '日比7260',
                        lastweek: '上周(20160426-20160420)1808',
                        zhoubi: '周比3239'
                    },
                    uv: {
                        dd: '368',
                        today: '今日(20160426)2190',
                        yesterday: '昨日(20160425)8500',
                        ribi: '日比7707',
                        lastweek: '上周(20160426-20160420)1666',
                        zhoubi: '周比5788'
                    },
                    gmrs: {
                        dd: '1202',
                        today: '今日(20160426)8984',
                        yesterday: '昨日(20160425)5860',
                        ribi: '日比4514',
                        lastweek: '上周(20160426-20160420)7422',
                        zhoubi: '周比5901'
                    },
                    gml:{ dd: '8644',
                        today: '今日(20160426)321',
                        yesterday: '昨日(20160425)818',
                        ribi: '日比1806',
                        lastweek: '上周(20160426-20160420  )1204',
                        zhoubi: '周比5400' },
                    ckl:{ dd: '6623',
                        today: '今日(20160426)5570',
                        yesterday: '昨日(20160425)6661',
                        ribi: '日比8910',
                        lastweek: '上周(20160426-20160420)3050',
                        zhoubi: '周比8133' },
                    ckls:{ dd: '400',
                        today: '今日(20160426)4031',
                        yesterday: '昨日(20160425)1251',
                        ribi: '日比5116',
                        lastweek: '上周(20160426-20160420)3976',
                        zhoubi: '周比9379' },
                    zxf:{ dd: '4878',
                        today: '今日(20160426)5408',
                        yesterday: '昨日(20160425)6196',
                        ribi: '日比6082',
                        lastweek: '上周(20160426-20160420)177',
                        zhoubi: '周比9525' },
                    xjxf:{ dd: '3942',
                        today: '今日(20160426)1581',
                        yesterday: '昨日(20160425)9605',
                        ribi: '日比1438',
                        lastweek: '上周(20160426-20160420)7824',
                        zhoubi: '周比2614' },
                    yhxf:{ dd: '3273',
                        today: '今日(20160426)4098',
                        yesterday: '昨日(20160425)2551',
                        ribi: '日比6019',
                        lastweek: '上周(20160426-20160420)3950',
                        zhoubi: '周比4682' },
                    arpu:{ dd: '421',
                        today: '今日(20160426)7240',
                        yesterday: '昨日(20160425)7139',
                        ribi: '日比1503',
                        lastweek: '上周(20160426-20160420)4642',
                        zhoubi: '周比9948' },
                    gmcg:{ dd: '9638',
                        today: '今日(20160426)7991',
                        yesterday: '昨日(20160425)8132',
                        ribi: '日比8004',
                        lastweek: '上周(20160426-20160420)4317',
                        zhoubi: '周比9016' },
                    gmsb:{ dd: '8959',
                        today: '今日(20160426)4069',
                        yesterday: '昨日(20160425)7639',
                        ribi: '日比3430',
                        lastweek: '上周(20160426-20160420)3673',
                        zhoubi: '周比2361' },
                    tkrs:{ dd: '708',
                        today: '今日(20160426)9786',
                        yesterday: '昨日(20160425)8571',
                        ribi: '日比3584',
                        lastweek: '上周(20160426-20160420)7098',
                        zhoubi: '周比436' }
                };
                break;
            case 'list2':
                data = {
                    pc: { gml: '购买量8520', gmrs: '购买人数1599' },
                    m: { gml: '购买量8253', gmrs: '购买人数5164' },
                    app: { gml: '购买量2518', gmrs: '购买人数6559' },
                    sum: { gml: '购买量5798', gmrs: '购买人数369' }
                };
                break;
            case 'list3':
                data = {"data":[{"brand":"\u4e00\u6c7d\u5927\u4f17\/\u5965\u8fea","gml":7,"gmrs":7},{"brand":"\u5954\u9a70","gml":3,"gmrs":2},{"brand":"\u65af\u67ef\u8fbe","gml":3,"gmrs":3},{"brand":"\u5b9d\u9a6c","gml":3,"gmrs":3},{"brand":"\u5317\u4eac\u73b0\u4ee3","gml":3,"gmrs":3},{"brand":"\u652f\u6301\u54c1\u724c","gml":2,"gmrs":2},{"brand":"\u514b\u83b1\u65af\u52d2","gml":2,"gmrs":2},{"brand":"\u4e00\u6c7d\u4e30\u7530","gml":2,"gmrs":2},{"brand":"\u8fdb\u53e3\u5927\u4f17","gml":1,"gmrs":1}],"rows_count":59};
                break;
        }

    } else if (oprate == 'vipcenter') {
        switch (graph_type) {
            case 'date':
                data = {"data":{"2016-04-13":{"pv":135082,"uv":7391},"2016-04-14":{"pv":151655,"uv":7698},"2016-04-15":{"pv":131404,"uv":7380},"2016-04-16":{"pv":105988,"uv":5444},"2016-04-17":{"pv":94211,"uv":4929},"2016-04-18":{"pv":128658,"uv":7390},"2016-04-19":{"pv":134096,"uv":7649},"2016-04-20":{"pv":147972,"uv":7703},"2016-04-21":{"pv":140014,"uv":7773},"2016-04-22":{"pv":138422,"uv":7579},"2016-04-23":{"pv":119277,"uv":6803},"2016-04-24":{"pv":102904,"uv":5381},"2016-04-25":{"pv":147485,"uv":8100},"2016-04-26":{"pv":135713,"uv":8016},"2016-04-27":{"pv":132073,"uv":7846},"2016-04-28":{"pv":130475,"uv":7758},"2016-04-29":{"pv":128208,"uv":7829},"2016-04-30":{"pv":103512,"uv":6720},"2016-05-01":{"pv":67290,"uv":3919},"2016-05-02":{"pv":77533,"uv":4398},"2016-05-03":{"pv":110372,"uv":6037},"2016-05-04":{"pv":120047,"uv":7242},"2016-05-05":{"pv":0,"uv":0}},"status":"success"};

                break;
            case 'pagetype':
                data = {"data":{"\u7ba1\u7406\u8f66\u6e90":[{"name":20160413,"value":134982},{"name":20160414,"value":151559},{"name":20160415,"value":131300},{"name":20160416,"value":105910},{"name":20160417,"value":94146},{"name":20160418,"value":128571},{"name":20160419,"value":134004},{"name":20160420,"value":147863},{"name":20160421,"value":139904},{"name":20160422,"value":138321},{"name":20160423,"value":119186},{"name":20160424,"value":102846},{"name":20160425,"value":147400},{"name":20160426,"value":135622},{"name":20160427,"value":131975},{"name":20160428,"value":130392},{"name":20160429,"value":128124},{"name":20160430,"value":103450},{"name":20160501,"value":67258},{"name":20160502,"value":77477},{"name":20160503,"value":110297},{"name":20160504,"value":119200},{"name":20160505,"value":0}]},"status":"success"};

                break;
            case 'city':
                data = {"data":{"\u5168\u56fd":[{"name":20160413,"value":135082},{"name":20160414,"value":151655},{"name":20160415,"value":131404},{"name":20160416,"value":105988},{"name":20160417,"value":94211},{"name":20160418,"value":128658},{"name":20160419,"value":134096},{"name":20160420,"value":147972},{"name":20160421,"value":140014},{"name":20160422,"value":138422},{"name":20160423,"value":119277},{"name":20160424,"value":102904},{"name":20160425,"value":147485},{"name":20160426,"value":135713},{"name":20160427,"value":132073},{"name":20160428,"value":130475},{"name":20160429,"value":128208},{"name":20160430,"value":103512},{"name":20160501,"value":67290},{"name":20160502,"value":77533},{"name":20160503,"value":110372},{"name":20160504,"value":120047},{"name":20160505,"value":0}]},"status":"success"};

                break;

            case 'list':
                data = {"data":[{"ds":20160429,"pv":9136,"uv":631,"pagetype":"\u7ba1\u7406\u8f66\u6e90","city":"\u5317\u4eac"},{"ds":20160430,"pv":5952,"uv":522,"pagetype":"\u7ba1\u7406\u8f66\u6e90","city":"\u5317\u4eac"},{"ds":20160501,"pv":4634,"uv":335,"pagetype":"\u7ba1\u7406\u8f66\u6e90","city":"\u5317\u4eac"},{"ds":20160502,"pv":5704,"uv":371,"pagetype":"\u7ba1\u7406\u8f66\u6e90","city":"\u5317\u4eac"},{"ds":20160503,"pv":8448,"uv":547,"pagetype":"\u7ba1\u7406\u8f66\u6e90","city":"\u5317\u4eac"},{"ds":20160504,"pv":9749,"uv":707,"pagetype":"\u7ba1\u7406\u8f66\u6e90","city":"\u5317\u4eac"}],"rows_count":26,"status":"success"};

                break;
        }
    }


    res.send(data);
});


module.exports = router;