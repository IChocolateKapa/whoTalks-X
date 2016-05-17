<template>
    <div class="commentPanel">
        <div v-show="cmtdata.length > 0 ? true : false" class="commentItem" v-model="cmtdata" tracke-by="$index" transition="fade" transition-mode="out-in">
            <div v-for="cmt in cmtdata" style="position: relative;">
                <img class="headimg" src='{{cmt.headimg}}'  alt="头像"/>
                <div class="dongtan-content">
                    <p class="author">{{cmt.author}}</p>
                    <p class="tip"><span>{{cmt.time}}</span></p>
                    <p class="content">
                        {{cmt.content}}
                    </p>
                </div>
                <div class="like" transition="fade" transition-mode="out-in" @click="toggleClass($index, cmt._id.toString())" v-model="cmt.likeflag" :class="{ 'active': cmt.likeflag }">
                    <span>{{cmt.likes}}</span>
                </div>
            </div>
        </div>

        <div v-else class="none">暂无评论</div>

        <send-comment :index="index"></send-comment>

    </div>
</template>

<script>
    /*how lucky~*/
    var inputcomment = require('./sendText.vue');

    var socket1 = require('socket.io-client'),
        socket = socket1();

    module.exports = {
        components: {
            'send-comment': inputcomment
        },
        compiled: function () {
            var self = this;
            self.socket.on('showLikes2', function (info) {
                console.log('showLikes2, received likes info: ', info);
                self.cmtdata[info.index].likes += info.dif;
            });
        },
        data: function () {
            return {
                cmtdata: [],
                cmt: {},
                socket: this.$parent.socket
            }
        },
        props: ['cmtdata', "index"],
        methods: {
            toggleClass: function (index, id) {
                var self = this;
                var curFlag = self.cmtdata[index].likeflag;
//                self.cmtdata[index].likeflag = !curFlag;
                var dif = 1;
                if (curFlag) dif = -1;

//                self.cmtdata[index].likes += dif;
                var tem = {
                    index: index,
                    id: id,
                    dif: dif
                };
                self.socket.emit('sendLikes2',  tem);
            }
        }
    };
</script>