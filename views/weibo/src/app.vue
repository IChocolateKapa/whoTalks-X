<template>
    <header>
        <h4>快来动弹一下吧~</h4>
    </header>

    <section class="send_text">
        <textarea v-model="msg" class="text mysend" placeholder="发布你的动弹~"></textarea>
        <div class="send_wrap">
            <input type="button" class="input danger" @click="notify()" value="发布"/>
        </div>
    </section>

    <!--<send-text v-on:notify="generate-send"></send-text>-->

    <dongtan :prodata="prodata" :cmtdata="cmtdata"></dongtan>
</template>

<script>
    var dongtanVue = require('../components/dongtan.vue'),
        $ = require('jquery');
    console.log('expecting jquery is: ', $);

    module.exports = {
        components: {
            'dongtan': dongtanVue
        },
        methods: {
            notify: function () {
                if (this.msg.trim()) {
                    this.$emit('generate-send', this.msg);
                    this.msg = '';
                }
            },
            setData : function(data){
                this.$data.prodata = data;
            }
        },
        events: {
            'generate-send': function (msg) {
                var self = this;
                var protemp = {
                    content: msg,
                    author: 'Lilei',
                    time: new Date() + '',
                    likes: 0,
                    client: '三星S5',
                    headimg: './img/myhead/'+Math.floor(Math.random() * 6) + '.jpg'
                };
                self.prodata.push(protemp);

            }
        },
        data: function () {
          return {
              msg: '',
              prodata: [],
          }
        },
        computed: {
            prodata: function () {
                var prod = [],
                    self = this;
                $.ajax({
                    type: 'post',
                    url: '/getFakeData',
                    dataType: 'json',
                    success: function (data) {
                        console.log('fakedata: ', data);
                        self.setData(data.data);
                    }
                })
            }
        },
        /*data: function () {
            return {
                'msg': '',
                'prodata': [
                {
                    headimg: './img/myhead/' + Math.floor(Math.random() * 10) + '.jpg',
                    author: 'Echo'+Math.random()*10,
                    time: '2015-10-10 12:12:12',
                    client: '小米Note',
                    content: '乱花渐欲迷人眼，浅草才能没马蹄',
                    likes: Math.floor(Math.random() * 10000)
                },
                {
                    headimg: './img/myhead/' + Math.floor(Math.random() * 10) + '.jpg',
                    author: 'Echo'+Math.random()*10,
                    time: '2015-10-10 12:12:12',
                    client: '小米Note',
                    content: '乱花渐欲迷人眼，浅草才能没马蹄',
                    likes: Math.floor(Math.random() * 10000)
                },
                {
                    headimg: './img/myhead/' + Math.floor(Math.random() * 10) + '.jpg',
                    author: 'Echo'+Math.random()*10,
                    time: '2015-10-10 12:12:12',
                    client: '小米Note',
                    content: '乱花渐欲迷人眼，浅草才能没马蹄',
                    likes: Math.floor(Math.random() * 10000)
                },
                {
                    headimg: './img/myhead/' + Math.floor(Math.random() * 10) + '.jpg',
                    author: 'Echo'+Math.random()*10,
                    time: '2015-10-10 12:12:12',
                    client: '小米Note',
                    content: '乱花渐欲迷人眼，浅草才能没马蹄',
                    likes: Math.floor(Math.random() * 10000)
                }
            ],
                'cmtdata': [
                    {
                        headimg: './img/myhead/' + Math.floor(Math.random() * 10) + '.jpg',
                        author: 'Echo'+Math.random()*10,
                        time: '2015-10-10 12:12:12',
                        content: '乱花渐欲迷人眼，浅草才能没马蹄',
                        likes: Math.floor(Math.random() * 10000)
                    },
                    {
                        headimg: './img/myhead/' + Math.floor(Math.random() * 10) + '.jpg',
                        author: 'Echo'+Math.random()*10,
                        time: '2015-10-10 12:12:12',
                        content: '乱花渐欲迷人眼，浅草才能没马蹄',
                        likes: Math.floor(Math.random() * 10000)
                    },
                    {
                        headimg: './img/myhead/' + Math.floor(Math.random() * 10) + '.jpg',
                        author: 'Echo'+Math.random()*10,
                        time: '2015-10-10 12:12:12',
                        content: '乱花渐欲迷人眼，浅草才能没马蹄',
                        likes: Math.floor(Math.random() * 10000)
                    },
                    {
                        headimg: './img/myhead/' + Math.floor(Math.random() * 10) + '.jpg',
                        author: 'Echo'+Math.random()*10,
                        time: '2015-10-10 12:12:12',
                        content: '乱花渐欲迷人眼，浅草才能没马蹄',
                        likes: Math.floor(Math.random() * 10000)
                    }
                ]
            }
        }*/
    }
</script>