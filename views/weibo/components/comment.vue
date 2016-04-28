<template>
    <div class="commentPanel">
        <div v-show="cmtdata.length > 0 ? true : false" class="commentItem" v-model="cmtdata" tracked-by="$index">
            <div v-for="cmt in cmtdata" style="position: relative;">
                <img class="headimg" src='{{cmt.headimg}}'  alt="头像"/>
                <div class="dongtan-content">
                    <p class="author">{{cmt.author}}</p>
                    <p class="tip"><span>{{cmt.time}}</span></p>
                    <p class="content">
                        {{cmt.content}}
                    </p>
                </div>
                <div class="like" @click="toggleClass($index)" v-model="cmt.likeflag" :class="{ 'active': cmt.likeflag }">
                    <span>{{cmt.likes}}</span>
                </div>
            </div>
        </div>

        <div v-else class="none">暂无评论</div>

        <send-comment></send-comment>

    </div>
</template>

<script>
    /*how lucky~*/
    var inputcomment = require('./sendText.vue');
    module.exports = {
        components: {
            'send-comment': inputcomment
        },
        data: function () {
            return {
                cmtdata: []
            }
        },
        props: ['cmtdata'],
        methods: {
            toggleClass: function (index) {
                var self = this;
                var curFlag = self.cmtdata[index].likeflag;
                self.cmtdata[index].likeflag = !curFlag;
            }
        }
    };
</script>