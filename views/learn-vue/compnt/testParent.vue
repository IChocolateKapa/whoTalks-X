<style lang="less">
    .profile{
        background: rgba(0,0,0,.1);
        box-shadow: 1px 0 10px 53px #467820;
        border-radius: 8px;
        padding: 10px;
        font-family: 'MicroSoft Yahei';
        &-item{
             color: #467820;
         }
    }
</style>

<template>
    <div class="profile">
        <img src="http://10.252.55.48:8081/whoTalks-X/views/weibo/img/myhead/0.jpg" alt="headimg"/>
        <p class="profile-item" v-for="item in pro">
            {{item}}
        </p>
        <article-item :info="info"></article-item>
    </div>
</template>

<script>
    var articleSection = require('./testChild.vue');

    module.exports = {
        components: {
            'article-item': articleSection
        },
        props: ['pro', 'info']
//        data: function () {
//            return {
//                pro: {
//                    name: 'Echo',
//                    age: '26',
//                    depart: '移动产品部',
//                    job: '前端开发工程师',
//                    home: '山东',
//                    number: '18623749599'
//
//                },
//                info: {
//                    title: '人生起伏不定',
//                    subTitle: '小计工作二三事',
//                    author: '河童',
//                    time: '2016-04-11 12:23:23',
//                    content: '前几天看到了一篇文章，说是关于职场的一些忠告，说的是在一个办公室政治如此复杂的地方，要想生存真的不易，尤其遇到一个特别小肚鸡肠，害怕别人超越他，刻意压制的领导。都是打工的，给别人穿小鞋真的好吗？笑cry...想想也能理解。希望自己能迅速迅速的成长起来，变得强壮才不会把那些小人影响。',
//                    likes: ''
//                }
//            }
//        }
    }
</script>