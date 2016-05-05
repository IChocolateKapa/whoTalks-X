/**
 * Created by Echo on 2016/3/29.
 */

define(['jquery', 'util', 'text'], function ($, util) {

    var $sideBar = $(".sideBar"),
        $main = $(".main");

    var RenderTemplate = {
        initHtml: function (page) {
            var self = this;
            var loadPage = 'text!../templates/' + page + '/index.html';
            require([loadPage], function (data) {
                var $main = $('.main');
                $main.html(data);
                /*根据main内容设定左侧高度*/
                self.renderTable();
                self.renderTablePlat();
                self.getListPager();
                $sideBar.height($main.height());
            });
        },
        url: '/systemMonitor/getSystemMonitorData',
        params: {},
        eachPage: 20,

        getListPager: function () {
            /*发送ajax获取数据*/
            var self = this;
            var param = $.extend(true, {operate: 'zengzhiservice', graph_type: 'list3', offset: 0, limit: self.eachPage}, self.params);
            $(".table tbody").empty();
            /*根据main内容设定左侧高度*/
            $sideBar.height($main.height());

            $("#loading1").show();

            $.ajax({
                url: self.url,
                data: param,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    $("#loading1").hide();
                    var totalCounts = data.rows_count,
                        tableData = data.data;

                    if (totalCounts == 0) {
                        $(".table._3 tbody").html('<tr><td colspan="3">暂无相关数据</td></tr>');
                    } else {
                        for (var i = 0; i < tableData.length; i++) {
                            var htm = '<tr>'
                                + '<td>' + tableData[i].brand + '</td>'
                                + '<td>' + tableData[i].gml + '</td>'
                                + '<td>' + tableData[i].gmrs + '</td>'
                                + '</tr>';
                            $(".table._3 tbody").append(htm);
                        }



                        var totalPage = Math.floor((totalCounts + self.eachPage - 1) / self.eachPage);
                        laypage({
                            cont: document.getElementById('pager1'), //容器。值支持id名、原生dom对象，jquery对象,
                            first: 1,
                            last: totalPage,
                            pages: totalPage, //总页数
                            prev: false, //若不显示，设置false即可
                            skin: '#00A6EC', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                            groups: 5, //连续显示分页数
                            jump: function(obj){ //触发分页后的回调
                                if (obj.curr != 1) {
                                    self.getListTable(obj.curr);
                                }
                            }
                        });

                        /*根据main内容设定左侧高度*/
                        $sideBar.height($main.height());
                    }

                }
            });
        },
        getListTable: function (page) {
            /*发送请求获取列表数据*/
            /*发送ajax获取数据*/
            var self = this;
            var ret = self.getParams();
            if (!ret) {
                return  false;
            }

            var offset = (parseInt(page) - 1) * self.eachPage;
            var param = $.extend(true, {graph_type: 'list', offset: offset, limit: self.eachPage}, self.params);
            $("#loading1").show();
            $(".table._3 tbody").empty();
            /*根据main内容设定左侧高度*/
            $sideBar.height($main.height());
            $.ajax({
                url: self.url,
                data: param,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    $("#loading1").hide();
                    var tableData = data.data;
                    for (var i = 0; i < tableData.length; i++) {
                        var htm = '<tr>'
                            + '<td>' + tableData[i].brand + '</td>'
                            + '<td>' + tableData[i].gml + '</td>'
                            + '<td>' + tableData[i].gmrs + '</td>'
                            + '</tr>';
                        $(".table._3 tbody").append(htm);
                    }


                    /*根据main内容设定左侧高度*/
                    $sideBar.height($main.height());
                }


            });
        },


        /*第一个表*/
        renderTable: function () {

            var self = this;

            var today = util.getDate(1),
                yesterday = util.getDate(2),
                lastweek = today + '-' + util.getDate(7);

            var tbkey = {
                    'pv': 'PV',
                    'uv': 'UV',
                    'gmrs': '购买人数',
                    'gml': '购买量',
                    'ckl': '查看量(单次查看)',
                    'ckls': '查看率(含多次查看)',
                    'zxf': '总消费',
                    'xjxf': '现金消费',
                    'yhxf': '优惠消费',
                    'arpu': 'ARPU',
                    'gmcg': '购买成功',
                    'gmsb': '购买失败',
                    'tkrs': '退款人数'
                },
                thkey = {
                    'today': '&nbsp;今日 <br><span>' + today + '</span>',
                    'yesterday': '&nbsp;昨日 <br><span>' + yesterday + '</span>',
                    'ribi': '日比 <br>  &nbsp;',
                    'lastweek': '&nbsp;上周 <br><span>' + lastweek + '</span>',
                    'zhoubi': '周比 <br> &nbsp;'
                };

            $("#loading0").show();

            var $thead = $(".table._1 thead"),
                $tbody = $(".table._1 tbody");
            var theadHtml = '';
            for(var thk in thkey) {
                theadHtml += '<th>' + thkey[thk] + '</th>';
            }
            $thead.html('<tr><th></th>' + theadHtml + '</tr>');

            var myparams = $.extend(true, {operate: 'zengzhiservice', graph_type: 'list1'}, self.params);


            $.ajax({
                url: self.url,
                type: 'post',
                data: myparams,
                dataType: 'json',
                success: function (data) {
                    $("#loading0").hide();
                    var fakeData = data;
                    for (var fk in fakeData) {
                        var temp = '<td>' + tbkey[fk] + '</td>';
                        var k = 0;
                        for (var tk in fakeData[fk]) {
                            if (k > 0) {
                                temp += '<td>' + fakeData[fk][tk] + '</td>';
                            }
                            k++;
                        }
                        temp = '<tr>' + temp + '</tr>';
                        $tbody.append(temp);
                    }


                    /*根据main内容设定左侧高度*/
                    $sideBar.height($main.height());
                }
            });

        },


        /*第二个表*/
        renderTablePlat: function () {
            var self = this;
            var tbkey = {
                    'pc': 'PC',
                    'm': 'M',
                    'app': 'APP',
                    'sum': '合计'
                };

            var myparams = $.extend(true, {operate: 'zengzhiservice', graph_type: 'list2'}, self.params);

            $.ajax({
                url: self.url,
                type: 'post',
                data: myparams,
                dataType: 'json',
                success: function (data) {
                    var fakeData = data;
                    /*上面获取到了假数据*/
                    var $tbody = $(".table._2 tbody");

                    for (var fk in fakeData) {
                        var temp = '<td>' + tbkey[fk] + '</td>';
                        for (var tk in fakeData[fk]) {
                            temp += '<td>' + fakeData[fk][tk] + '</td>';
                        }
                        temp = '<tr>' + temp + '</tr>';
                        $tbody.append(temp);
                    }
                    /*根据main内容设定左侧高度*/
                    $sideBar.height($main.height());
                }
            });
        }
    };

    return RenderTemplate;
});