<style lang="less">

</style>

<template>
    <section class="dongtan" v-for="pro in prodata" tracked-by="$index"><div class="head pr">
            <!--<img class="headimg" src="https://www.baidu.com/img/2016_4_26logo_843a64cc86a54b8da14d7e9baad4d15f.gif" alt="headimg"/>-->
            <img class="headimg" src="{{pro.headimg}}" alt="headimg"/>
            <div class="dongtan-content">
                <p class="author">{{pro.author}}</p>
                <p class="tip"><span>{{pro.time}}</span> <span>来自</span><strong>{{pro.client}}</strong></p>
                <p class="content">
                    {{pro.content}}
                </p>
            </div>
            <div class="dongtan-footer">
                <div class="star"></div>
                <div class="comment" @click="toggleComment($index)"></div>
                <div class="like" :class="{ 'active': pro.likes == 0? true: false}" >
                    <span>{{pro.likes}}</span>
                </div>
            </div>

            <my-comment :cmtdata="pro.comments" v-show="pro.showflag" v-model="pro.showflag"></my-comment>
        </div>
    </section>
</template>

<script>
    var commentVue = require('./comment.vue');
    module.exports = {
        data: function () {
            return {
                prodata: [],
                pro: {
                  showflag: ''
                },
                shows: false
            }
        },
        components: {
            'my-comment': commentVue
        },
        methods: {
            toggleComment: function (index) {
                var self = this,
                    curFlag = self.prodata[index].showflag;
                self.pro.showflag = self.prodata[index].showflag = !curFlag;
            }
        },

        props: ['prodata', 'cmtdata']
    }
</script>