<template>
    <div class="commentPanel">
        <!--<p class="none">暂无评论</p>-->
        <!--<comment-template></comment-template>-->
        <div class="commentItem" v-for="cmt in cmtdata">
            <img class="headimg" v-bind:src="{{cmt.headimg}}" alt="头像"/>
            <div class="dongtan-content">
                <p class="author">{{cmt.author}}</p>
                <p class="tip"><span>{{cmt.time}}</span></p>
                <p class="content">
                    {{cmt.content}}
                </p>
            </div>
            <div class="like"><span>{{cmt.likes}}</span></div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['cmtdata']
    }
</script>