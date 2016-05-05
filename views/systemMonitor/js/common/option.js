/**
 * Created by Echo on 2016/3/25.
 */




define(['echart'], function (echart) {

    var echartsOption = {

        lineOption: {
            title: {
                text: 'PV/UV'
            },
            /*tooltip : {
                trigger: 'axis',
                padding: 0,
                //formatter: '{b0}: {c0}<br />{b1}: {c1}'
            },*/
            legend: {
                data:['PV', 'UV']
            },
            toolbox: {
                show : true,
                feature : {
                    saveAsImage : {show: true}
                }
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'PV',
                    type:'line',
                    areaStyle: {normal: {}},
                    data:[]
                },
                {
                    name:'UV',
                    type:'line',
                    areaStyle: {normal: {}},
                    data:[]
                }
            ]
        },

        barOption: {
            title : {
                text: '',
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:[],
                left: '100px'
            },
            toolbox: {
                show : true,
                feature : {
                    saveAsImage : {show: true}
                }
            },
            grid: {
                left: '5%',
                right: '2%',
                bottom: '2%',
                containLabel: true
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : []
        },

        lineFunc: function (data) {

            var self = this,
                lineOp = $.extend(true, {}, self.lineOption);
            var myData = data.data;
            var xArr = [],
                seriesData = {
                    'PV': [],
                    'UV': []
                };

            for (var date in myData) {
                xArr.push(date);
                seriesData['PV'].push(myData[date]['pv']);
                seriesData['UV'].push(myData[date]['uv']);
            }

            lineOp.xAxis[0]['data'] = xArr;
            lineOp.series[0].data = seriesData['PV'];
            lineOp.series[1].data = seriesData['UV'];

            console.log("lineOp: ", lineOp);
            return lineOp;


        },

        barFunc: function (data, title) {
            var self = this;
            var barOp = $.extend(true, {}, self.barOption);
            var myData = data.data;
            var xArr = [],
                legend = [];



            var m = 0;
            for (var pc in myData) {
                //page, city Get
                legend.push(pc);
                var eList = myData[pc];
                var sdata = [];
                if (m == 0) {
                    for (var i = 0; i < eList.length; i++) {
                        xArr.push(eList[i].name);
                        sdata.push(eList[i].value);
                    }
                    m += 1;
                } else {
                    for (var j = 0; j < eList.length; j++) {
                        sdata.push(eList[j].value);
                    }
                }

                barOp.series.push({
                    name: pc,
                    type:'bar',
                    data:sdata
                });
            }


            barOp.legend['data'] = legend;
            barOp.xAxis[0]['data'] = xArr;

            barOp.title.text = title;


            return barOp;
        }
    };



    return echartsOption;
});
