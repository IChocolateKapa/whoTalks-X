/**
 * Created by Echo on 16/3/24.
 */

define(['jquery', 'util', 'text'], function ($, util) {

    var $sideBar = $(".sideBar"),
        $main = $(".main");

    var RenderTemplate = {
        initHtml: function (page) {
            var self = this;
            var loadPage = 'text!../templates/' + page + '/index.html';
            require([loadPage], function (data) {
                $main.html(data);
                //self.getTextValueXhr();
                self.initDomEvents();
                /*根据main内容设定左侧高度*/
                $sideBar.height($main.height());
            });
        },
        url: '/systemMonitor/getSystemMonitorData',
        //url: 'http://fvp.58.com/system_monitor.php',
        params: {},
        eachPage: 20,

        getParams: function () {
            /*先获取参数*/
            var self = this;

            /*日期范围*/
            var beginTime = $("#begin").val(),
                endTime = $("#end").val();

            if (beginTime == "") {
                alert('请选择起始时间~~');
                return false;
            }

            if (endTime == "") {
                alert('请选择结束时间~~');
                return false;
            }
            if (parseInt(endTime) < parseInt(beginTime)) {
                alert('结束时间不应在开始时间之前喔~~');
                return false;
            }

            /*页面类型*/
            var pages= self.getSelectedPageTypes();
            if (pages == "") {
                alert('请选择至少一种页面类型~~');
                return false;
            }
            /*城市*/
            var cities = self.getSelectedCities();
            if (cities == "") {
                alert('请选择至少一个城市~~');
                return false;
            }


            self.params = {
                operate: 'vipcenter',
                ds_start: beginTime,
                ds_end: endTime,
                pagetype_list: pages,
                city_list: cities
            };
            return true;

        },
        goSearchRes: function () {
            /*先获取参数*/
            var self = this;
            var ret = self.getParams();
            if (!ret) {
                return false;
            }
            /*/!*日期范围*!/
            var beginTime = $("#begin").val(),
                endTime = $("#end").val();

            if (beginTime == "") {
                alert('请选择起始时间~~');
                return false;
            }

            if (endTime == "") {
                alert('请选择结束时间~~');
                return false;
            }

            /!*页面类型*!/
            var pages= self.getSelectedPageTypes();
            if (pages.split(':').length < 2) {
                alert('请选择至少两个页面类型~~');
                return false;
            }
            /!*城市*!/
            var cities = self.getSelectedCities();
            if (cities.split(':').length < 2) {
                alert('请选择至少两个城市~~');
                return false;
            }


            self.params = {
                operate: 'vipcenter',
                ds_start: beginTime,
                ds_end: endTime,
                pagetype_list: pages,
                city_list: cities
            };*/

            /*第一个图表*/
            self.renderChart('date');
            /*第二个图表*/
            self.renderChart('pageType');
            /*第三个图表*/
            self.renderChart('city');
            /*列表数据*/
            self.getListPager();
        },

        getSelectedPageTypes: function () {
            var pages = '';
            $(".allPages .city").each(function () {
                var $this = $(this);
                if ($this.hasClass('checked')) {
                    pages += $(this).attr('data-val') + ':';
                }

            });
            return pages.substring(0, pages.length-1);
        },

        getSelectedCities: function () {
            var cities = '';

            var $huizong = $(".huizong .city.checked");
            if ($huizong.length == 0) {
                $(".allCitys .city").each(function () {
                    var $this = $(this);
                    if ($this.hasClass('checked')) {
                        cities += $(this).attr('data-val') + ':';
                    }
                });

            } else {
                cities = $huizong.attr('data-val') + ':';
            }

            if (cities) {
                return cities.substring(0, cities.length-1);
            } else {
                return "";
            }

        },

        pageCityData: {},

        getTextValueXhr: function () {
            var self = this;
            /*需要拟定参数的格式*/
            $.ajax({
                url: self.url,
                data: {
                    operate: 'filter',
                    type: 'pagetype'
                },
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    self.pageCityData = data.data;
                    self.getTextValue('page');

                    self.initDomEvents();
                }
            });
        },

        getTextValue: function (type) {
            var self = this;
            if (type == 'page') {
                var $dom = $(".allPages");
                if ($dom.html() == "") {
                    $dom.empty();
                    var textValue = self.pageCityData;
                    for (var i = 0; i < textValue.length; i++) {
                        //if (textValue[i].text === "管理车源") {
                            var htm = '<div class="city"' + 'data-val="' + textValue[i].value + '">' +
                                '<label></label>' +
                                '<span>' + textValue[i].text + '</span>' +
                                '</div>';
                            $dom.append(htm);
                        //}

                    }
                }
            } else {
                console.log('ok');
            }
        },


        getListPager: function () {
            /*发送ajax获取数据*/
            var self = this;
            var ret = self.getParams();
            if (!ret) {
                return  false;
            }
            var param = $.extend(true, {graph_type: 'list', offset: 0, limit: self.eachPage}, self.params);
            $(".table tbody").empty();
            /*根据main内容设定左侧高度*/
            $sideBar.height($main.height());

            $("#loading").show();

            $.ajax({
                url: self.url,
                data: param,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    $("#loading").hide();
                    var totalCounts = data.rows_count,
                        tableData = data.data;

                    if (totalCounts == 0) {
                        $(".table tbody").html('<tr><td colspan="5">暂无相关数据</td></tr>');
                    } else {
                        for (var i = 0; i < tableData.length; i++) {
                            var htm = '<tr>'
                                + '<td>' + tableData[i].ds + '</td>'
                                + '<td>' + tableData[i].pagetype + '</td>'
                                + '<td>' + tableData[i].city + '</td>'
                                + '<td>' + tableData[i].pv + '</td>'
                                + '<td>' + tableData[i].uv + '</td>'
                                + '</tr>';
                            $(".table tbody").append(htm);
                        }



                        var totalPage = Math.floor((totalCounts + self.eachPage - 1) / self.eachPage);
                        laypage({
                            cont: document.getElementById('pager'), //容器。值支持id名、原生dom对象，jquery对象,
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
            $("#loading").show();
            $(".table tbody").empty();
            /*根据main内容设定左侧高度*/
            $sideBar.height($main.height());
            $.ajax({
                url: self.url,
                data: param,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    $("#loading").hide();
                    var tableData = data.data;
                    for (var i = 0; i < tableData.length; i++) {
                        var htm = '<tr>'
                            + '<td>' + tableData[i].ds + '</td>'
                            + '<td>' + tableData[i].pagetype + '</td>'
                            + '<td>' + tableData[i].city + '</td>'
                            + '<td>' + tableData[i].pv + '</td>'
                            + '<td>' + tableData[i].uv + '</td>'
                            + '</tr>';
                        $(".table tbody").append(htm);
                    }


                    /*根据main内容设定左侧高度*/
                    $sideBar.height($main.height());
                }


            });
        },

        initDomEvents: function () {
            var self = this;
            $(document).click(function () {
                $(".selectMask").removeClass('open');
            });

            /*日期设置皮肤*/
            laydate.skin('yalan');


            $(".allPage").click(function (evt) {
                var $this = $(this);
                if ($this.hasClass('checked')) {
                    $this.closest('.selectPanel').find('.city').removeClass('checked');
                } else {
                    $this.closest('.selectPanel').find('.city').addClass('checked');
                }

                evt.stopPropagation();
                evt.preventDefault();
            });
            /*点击下拉面板的位置时，面板不能消失*/
            $(".selectPanel").click(function (evt) {
                evt.stopPropagation();
            });
            /*触发全选*/
            //$(".all").trigger('click');


            /*点击全选按钮 --页面类型*/
            $(".allPages").on('click', '.city', function (evt) {
                var $this = $(this);

                if ($this.hasClass('checked')) {
                    $this.removeClass('checked');
                    $this.parent().siblings('.all').removeClass('checked');
                } else {
                    $this.addClass('checked');
                }
                evt.stopPropagation();
                evt.preventDefault();
            });

            /*城市类型  汇总城市要单选*/
            $(".huizong .city").click(function (evt) {
                var $this = $(this);
                $this.closest('.selectPanel').find(".city").removeClass('checked');
                $this.addClass('checked');
                evt.stopPropagation();
                evt.preventDefault();
            });
            /*城市类型 分城市 全选按钮*/
            $(".allCity").click(function (evt) {
                var $this = $(this);
                $(".huizong .city").removeClass('checked');
                if ($this.hasClass('checked')) {
                    $this.removeClass('checked');
                    $(".allCitys .city").removeClass('checked');
                } else {
                    $this.addClass('checked');
                    $(".allCitys .city").addClass('checked');
                }
                evt.stopPropagation();
                evt.preventDefault();
            });
            $(".allCitys .city").click(function (evt) {
                var $this = $(this);

                $(".huizong .city").removeClass('checked');

                util.toggleClass($this, 'checked');
                evt.stopPropagation();
                evt.preventDefault();
            });

            $(".selectMask").click(function (evt) {
                var $this = $(this);
                util.toggleClass($this, 'open');
                evt.stopPropagation();
                evt.preventDefault();
            });



            /*点击查询结果*/
            $("#search").click(function (evt) {
                self.goSearchRes();
                evt.stopPropagation();
                evt.preventDefault();
            });

            /*点击切换PV/UV按钮， 进行发请求*/
            $(".switch a").click(function (evt) {
                var $this = $(this);

                if (!$this.hasClass('active')) {
                    /*切换*/
                    $this.closest('aside').find('a').removeClass('active');
                    $this.addClass('active');
                    var type = $this.closest('aside').attr('data-val');
                    /*不同接口*/
                    self.renderChart(type);
                } else {
                    $this.removeClass('active');
                }

                evt.stopPropagation();
                evt.preventDefault();
            });

            /*窗口大小改变时*/
            $(window).on('resize', function () {
                if (self.chartDomMap['date']) {
                    self.chartDomMap['date'].resize();
                }
                if (self.chartDomMap['pageType']) {
                    self.chartDomMap['pageType'].resize();
                }
                if (self.chartDomMap['city']) {
                    self.chartDomMap['city'].resize();
                }

            });

        },

        chartDomMap: {
            date: '',
            pageType: '',
            city: ''
        },
        renderChart: function (type) {
            var self = this,
                param = {};
            var ret = self.getParams();
            if (!ret) {
                return  false;
            }
            require(['echart', 'echartOption'], function (echarts, option) {

                var chartDom = echarts.init(document.getElementById(type));
                self.chartDomMap[type] = chartDom;
                chartDom.showLoading({
                    text: '正在刷新.....',
                    textColor: '#007FAA',
                    color: '#00678A',
                    maskColor: 'rgba(64,74,89, .5)'
                });


                if (type === 'date') {
                    param = $.extend(true, {graph_type: 'date'}, self.params);
                    $.ajax({
                        url: self.url,
                        type: 'post',
                        data: param,
                        dataType: 'json',
                        success: function (data) {
                            chartDom.hideLoading();
                            var lineOption = option.lineFunc(data);
                            console.log(lineOption);
                            setTimeout(function () {
                                chartDom.setOption(lineOption);
                            }, 500);

                        },
                        error : function() {
                            try{
                                chartDom.showLoading({text: '数据请求异常，请稍后再来试试...'});
                            }catch(e){}
                        }
                    });
                } else if (type == 'pageType') {
                    var showLabel = $("#pageChart .switch a.active").html().toLowerCase();
                    param = $.extend(true, {graph_type: 'pagetype', show_label: showLabel}, self.params);
                    $.ajax({
                        url: self.url,
                        type: 'post',
                        data: param,
                        dataType: 'json',
                        success: function (data) {

                            chartDom.hideLoading();

                            var barOption = option.barFunc(data, '页面类型');
                            chartDom.setOption(barOption);
                        },
                        error : function() {
                            try{
                                chartDom.showLoading({text: '数据请求异常，请稍后再来试试...'});
                            }catch(e){}
                        }
                    });
                } else {
                    var showLabel = $("#cityChart .switch a.active").html().toLowerCase();
                    param = $.extend(true, {graph_type: 'city', show_label: showLabel}, self.params);
                    $.ajax({
                        url: self.url,
                        type: 'post',
                        data: param,
                        dataType: 'json',
                        success: function (data) {
                            chartDom.hideLoading();
                            var barOption = option.barFunc(data, '城市数据');
                            chartDom.setOption(barOption);
                        },
                        error : function() {
                            try{
                                chartDom.showLoading({text: '数据请求异常，请稍后再来试试...'});
                            }catch(e){}
                        }
                    });
                }
            });

        }
    };

    return RenderTemplate;
});