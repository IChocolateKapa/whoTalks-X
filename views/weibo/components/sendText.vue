<style lang="less">
    .input_wrap{
        height: .8rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        background-color: #fff;
        .text{
            flex: 4;
            height: 95%;
            text-indent: 10px;
            border-radius: 10px;
            outline: none;
            border: 1px solid #eeeeee;
        }
        .danger{
            flex: 1;
            height: 100%;
        }
    }
</style>

<template>
    <div class="input_wrap">
        <input type="text" class="text" v-model="mycomment" placeholder="发表你的评论~~"/>
        <input type="button" class="input danger" @click="sendcomment" value="发布"/>
    </div>
</template>

<script>
    var util = require('../resource/js/util');
    var socket1 = require('socket.io-client'),
        socket = socket1();

    module.exports = {
        data: function () {
            return {
                mycomment: ''
            }
        },
        ready: function () {
            var self = this;
            socket.on('showComment', function (comment) {
                console.log('received comment: ', comment);
                self.$parent.cmtdata.push(comment);
            });
        },
        methods: {
            sendcomment: function () {
                var self = this;
                if (self.mycomment.trim()) {
                    var temp = {
                        headimg: 'http://wuhaiping.com/myhead/' + util.getRanDomNumber(12) + '.jpg',
                        author: util.getChar(6),
                        time: util.getFormatTime(),
                        likes: 0,
                        likeflag: false,
                        content: self.mycomment
                    };

                    socket.emit('sendNewComment', temp);

                    self.mycomment = '';
                }
            }
        }
    }
</script>