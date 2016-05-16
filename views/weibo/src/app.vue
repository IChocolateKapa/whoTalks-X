<style>
    .myloading{
        width: 1.8rem;
        height: 2rem;
        margin: 0 auto;
        /*background: #004444;*/
    }
</style>
<template>
    <header>
        <h4>快来动弹一下吧~</h4>
    </header>

    <div class="myloading">
        <loading></loading>
    </div>


    <section class="send_text">
        <textarea v-model="msg" class="text mysend" placeholder="发布你的动弹~"></textarea>
        <div class="send_wrap">
            <input type="button" class="input danger" style="border-radius: 0;" @click="notify()" value="发布"/>
        </div>
    </section>

    <dongtan :prodata="prodata"></dongtan>
</template>

<script>
    /*
    请问有没有人遇到这样的问题：
    使用v-for渲染出来一组列表，当点击其中某个列表中某个元素时，该列表相应产生变化，请问怎么给每个元素绑定相应的模型呢？
    我现在绑定一个v-model后，点击其中一个元素，所有列表都相应产生了变化，该怎么解决？除了根据$index手动操作dom元素，还有别的办法吗？
    ---使用$index去手动操作数组， 既然是mvvm架构，就要牢记思想，数据双向绑定，通过改变数据就可以进行DOM操作。同样，页面上视图发生变化时数据也会相应变化
    */
    var dongtanVue = require('../components/dongtan.vue'),
        $ = require('jquery'),
        util = require('../resource/js/util'),
        loadingVue = require('../components/loading/loading.vue')    ;

    var socket1 = require('socket.io-client'),
        socket = socket1();

    module.exports = {
        components: {
            'dongtan': dongtanVue,
            'loading': loadingVue
        },
        ready: function () {
            var self = this;
            socket.on('showDongtan', function (user) {
                console.log('received user: ', user);
                self.prodata.splice(0, 0, user);
            });
        },
        methods: {
            notify: function () {
                if (this.msg.trim()) {
                    this.$emit('generate-send', this.msg);
                    this.msg = '';
                }
            },
            setData : function (data) {
                this.$data.prodata = data;
            }
        },
        events: {
            'generate-send': function (msg) {
                var self = this;
                var protemp = {
                    content: msg,
                    author: util.getChar(6),
                    time: util.getFormatTime(),
                    likes: 0,
                    likeflag: false,
                    showflag: false,
                    starflag: false,
                    client: util.getClient(),
                    headimg: 'http://wuhaiping.com/myhead/' + util.getRanDomNumber(12) + '.jpg',
                    comments: []
                };
                self.socket.emit('sendNewDongtan', protemp);
                /*其实不需要返回值，为了在后台存储发送的数据以及，socket发起通信*/
            }
        },
        data: function () {
          return {
              msg: '',
              prodata: [],
              socket: socket1()
          }
        },
        asyncData: function (resolve, reject) {
            // load data and call resolve(data)
            // or call reject(reason) if something goes wrong
            $.ajax({
                type: 'post',
                url: '/weibo/getFakeData',
                dataType: 'json',
                success: function (data) {
                    resolve({
                        prodata: data.data
                    })
                },
                error: function () {
                    reject({
                        prodata: []
                    })
                }
            });
        }
    }
</script>