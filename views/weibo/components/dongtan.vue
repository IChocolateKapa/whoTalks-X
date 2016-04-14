<style lang="less">

</style>

<template>
    <p>{{prodata}}</p>
    <section class="dongtan" v-for="pro in prodata"><div class="head pr">
            <img class="headimg" v-bind:src="{{pro.headimg}}" alt="头像"/>
            <div class="dongtan-content">
                <p class="author">{{pro.author}}</p>
                <p class="tip"><span>{{pro.time}}</span> <span>来自</span><strong>{{pro.client}}</strong></p>
                <p class="content">
                    {{pro.content}}
                </p>
            </div>
            <div class="dongtan-footer">
                <div class="star"></div>
                <div class="comment" @click="toggleComment()"></div>
                <div class="like"><span>{{pro.likes}}</span></div>
            </div>

            <my-comment :cmtdata="cmtdata"></my-comment>
        </div>
    </section>
</template>

<script>
    var commentVue = require('./comment.vue');
    module.exports = {
        components: {
            'my-comment': commentVue
        },
        methods: {
            toggleComment: function () {
                alert('jkjkjk');
            }
        },

        props: ['prodata', 'cmtdata']
    }
</script>