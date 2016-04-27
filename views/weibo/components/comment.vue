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
    <div class="commentPanel">
        <div v-show="cmtdata.length > 0 ? true : false" class="commentItem" v-model="cmtdata">
            <div v-for="cmt in cmtdata" style="position: relative;">
                <img class="headimg" src='{{cmt.headimg}}'  alt="头像"/>
                <div class="dongtan-content">
                    <p class="author">{{cmt.author}}</p>
                    <p class="tip"><span>{{cmt.time}}</span></p>
                    <p class="content">
                        {{cmt.content}}
                    </p>
                </div>
                <div class="like" :class="{ 'active': cmt.likes == 0? true: false}" >
                    <span>{{cmt.likes}}</span>
                </div>
            </div>
        </div>

        <div v-else class="none">暂无评论</div>

        <!--<send-comment></send-comment>-->

        <div class="input_wrap">
            <input type="text" class="text" v-model="mycomment" placeholder="发表你的评论~~"/>
            <input type="button" class="input danger" @click="sendcomment" value="发布"/>
        </div>

    </div>
</template>

<script>
//    var inputcomment = require('./sendText.vue');
var util = require('../resource/js/util');
    module.exports = {
        /*components: {
            'send-comment': inputcomment
        },*/
        data: function () {
            return {
                cmtdata: []
            }
        },
        props: ['cmtdata'],

        methods: {
            sendcomment: function () {
                var self = this;
                if (self.mycomment.trim()) {
                    var temp = {
                        headimg: 'http://wuhaiping.com/myhead/' + util.getRanDomNumber(12) + '.jpg',
                        author: util.getChar(6),
                        time: util.getFormatTime(),
                        likes: util.getRanDomNumber(30),
                        content: self.mycomment
                    };

                    self.cmtdata.push(temp);

                    self.mycomment = '';
                }
            }
        }

    };
</script>