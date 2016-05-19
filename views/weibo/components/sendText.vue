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
        <input type="button" class="input danger" @click="sendcomment(index, id)" value="发布"/>
    </div>
</template>

<script>
    var util = require('../resource/js/util');

    module.exports = {
        data: function () {
            return {
                mycomment: '',
                socket: this.$parent.socket
            }
        },
        props: ['index', 'id'],
        methods: {
            sendcomment: function (index, id) {
                var self = this;
                if (self.mycomment.trim()) {
                    var temp = {
                        headimg: 'http://wuhaiping.com/myhead/' + util.getRanDomNumber(12) + '.jpg',
                        author: util.getAuthor(),
                        time: util.getFormatTime(),
                        likes: 0,
                        likeflag: false,
                        content: self.mycomment
                    };
                    var datas = {
                        data: temp,
                        index: index,
                        dtId: id
                    };

                    self.socket.emit('sendNewComment', datas);

                    self.mycomment = '';
                }
            }
        }
    }
</script>