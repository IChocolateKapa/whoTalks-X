<template>
    <div class="commentPanel">
        <div v-show="cmtdata.length > 0 ? true : false" class="commentItem" v-model="cmtdata" tracke-by="$index" transition="fade" transition-mode="out-in">
            <div v-for="cmt in cmtdata" data-id={{cmt._id.toString()}}" style="position: relative;">
                <img class="headimg" src='{{cmt.headimg}}'  alt="头像"/>
                <div class="dongtan-content">
                    <p class="author">{{cmt.author}}</p>
                    <p class="tip"><span>{{cmt.time}}</span></p>
                    <p class="content">
                        {{cmt.content}}
                    </p>
                </div>
                <div class="like" transition="fade" transition-mode="out-in" @click="toggleClass($index, index, id, cmt._id.toString())" v-model="cmt.likeflag" :class="{ 'active': cmt.likeflag }">
                    <span>{{cmt.likes}}</span>
                </div>
            </div>
        </div>

        <div v-else class="none">暂无评论</div>

        <send-comment :index="index" :id="id"></send-comment>

    </div>
</template>

<script>
    /*how lucky~*/
    var inputcomment = require('./sendText.vue');

    module.exports = {
        components: {
            'send-comment': inputcomment
        },
        ready: function () {
            var self = this;

        },
        data: function () {
            return {
                cmtdata: [],
                cmt: {},
                socket: this.$parent.socket
            }
        },
        props: ['cmtdata', "index", "id"],
        methods: {
            toggleClass: function (index, dtIndex, dtId, id) {
                var self = this;
                var curFlag = self.cmtdata[index].likeflag;
                var dif = 1;
                if (curFlag) dif = -1;

                var tem = {
                    index: index,
                    dtIndex: dtIndex,
                    id: id,
                    dtId: dtId,
                    dif: dif
                };
                self.socket.emit('sendLikes2',  tem);
            }
        }
    };
</script>