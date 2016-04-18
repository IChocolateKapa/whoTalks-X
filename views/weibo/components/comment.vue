<template>
    <div class="commentPanel">
        <div v-if="cmtdata" class="commentItem" v-for="cmt in cmtdata">
            <img class="headimg"  v-bind:src='{{cmt.headimg}}'  alt="头像"/>
            <div class="dongtan-content">
                <p class="author">{{cmt.author}}</p>
                <p class="tip"><span>{{cmt.time}}</span></p>
                <p class="content">
                    {{cmt.content}}
                </p>
            </div>
            <div class="like" v-bind:class="{ 'active': cmt.likes == 0? true: false}" >
                <span>{{cmt.likes}}</span>
            </div>
        </div>

        <p v-else class="none">暂无评论</p>
    </div>
</template>

<script>
    module.exports = {
        props: ['cmtdata']
    }
</script>