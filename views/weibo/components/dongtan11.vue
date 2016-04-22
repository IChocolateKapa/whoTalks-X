<style lang="less">

</style>

<template>
    <section class="dongtan" v-for="pro in prodata" tracked-by="$index"><div class="head pr">
            <img class="headimg" v-bind:src="{{pro.headimg}}" alt="headimg"/>
            <div class="dongtan-content">
                <p class="author">{{pro.author}}</p>
                <p class="tip"><span>{{pro.time}}</span> <span>来自</span><strong>{{pro.client}}</strong></p>
                <p class="content">
                    {{pro.content}}
                </p>
            </div>
            <div class="dongtan-footer">
                <div class="star"></div>
                <div class="comment" @click="toggleComment()" v-model="flag"></div>
                <div @click="toggleComment" class="like" v-bind:class="{ 'active': cmt.likes == 0 && flag == 1? true: false}" >
                    <span>{{pro.likes}}</span>
                </div>
            </div>

            <my-comment :cmtdata="pro.comments"></my-comment>
        </div>
    </section>
</template>

<script>
    var commentVue = require('./comment.vue');
    module.exports = {
        data: {
            flag: 1
        },
        components: {
            'my-comment': commentVue
        },
        methods: {
            toggleComment: function () {
                var self = this;
                self.$data.flag = 0;
            }
        },

        props: ['prodata', 'cmtdata']
    }
</script>