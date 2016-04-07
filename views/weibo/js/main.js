/**
 * Created by Echo on 2016/4/7.
 */

require(['vue'], function (Vue) {
    // 定义
    //var MyComponent = Vue.extend({
    //    template: '../components/dongtan'});
    /*var MyComponent = Vue.extend({
        template: '<div class="commentItem" v-for="pp in peopleList">'
                    + '<img class="headimg" src="img/myhead/4.jpg" alt="头像"/>'
                    + '<div class="dongtan-content">'
                        + '<p class="author">' + '精神境界啊' + '</p>'
                        + '<p class="tip"><span>' + 'peopleList' + '</span></p>'
                        + '<p class="content">'
                            + 'peopleList'
                        + '</p>'
                    + '</div>'
                    + '<div class="like"></div>'
                  + '</div>'
    });*/

    var MyComponent = Vue.extend({
        template: '<div class="commentItem">'
                    + '{{tip}}'
                  + '</div>'
    });
    //
    //var MyComponent = Vue.extend({
    //    template: '<div class="commentItem" v-for="pp in peopleList">'
    //                + '<img class="headimg" src="img/myhead/4.jpg" alt="头像"/>'
    //                + '<div class="dongtan-content">'
    //                    + '<p class="author">' + '{{pp.name}}' + '</p>'
    //                    + '<p class="tip"><span>' + '{{pp.time}}' + '</span></p>'
    //                    + '<p class="content">'
    //                        + '{{pp.word}}'
    //                    + '</p>'
    //                + '</div>'
    //                + '<div class="like"></div>'
    //              + '</div>'
    //});

    // 注册
    Vue.component('comment-template', MyComponent);

    // 创建根实例
    new Vue({
        el: '.commentPanel',
        /*data: function () {
            var peopleList = [
                {
                    name: '_哈哈哈',
                    time: '2016.03.02 13:24:43',
                    word: '真的假的啊？看起来平时人还不错啊？求真相~'
                },
                {
                    name: '_哈哈哈333',
                    time: '2023.03.02 13:24:43',
                    word: 'ewe？r3wtrtfewtr543t？求真相~'
                }
            ];
            return {
                peopleList: peopleList
            };
        },*/
        data: {
            tip: 'Hello World!'
        }
    });
    //var vm = new Vue({
    //    el: '.commentPanel',
    //    /*data: function () {
    //        var peopleList = [
    //            {
    //                name: '_哈哈哈',
    //                time: '2016.03.02 13:24:43',
    //                word: '真的假的啊？看起来平时人还不错啊？求真相~'
    //            },
    //            {
    //                name: '_哈哈哈333',
    //                time: '2023.03.02 13:24:43',
    //                word: 'ewe？r3wtrtfewtr543t？求真相~'
    //            }
    //        ];
    //        return {
    //            peopleList: peopleList
    //        };
    //    },*/
    //    data: {
    //        peopleList: [
    //            {
    //                name: '_哈哈哈',
    //                time: '2016.03.02 13:24:43',
    //                word: '真的假的啊？看起来平时人还不错啊？求真相~'
    //            },
    //            {
    //                name: '_哈哈哈333',
    //                time: '2023.03.02 13:24:43',
    //                word: 'ewe？r3wtrtfewtr543t？求真相~'
    //            }
    //        ]
    //    }
    //});

});