<template>
    <div class="commentPanel">
        <div v-show="cmtdata.length > 0 ? true : false" class="commentItem">
            <div v-for="cmt in cmtdata">
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

    </div>
</template>

<script>
    module.exports = {
        props: ['cmtdata']
    };
    /*export default {
        props: ['cmtdata']
    }*/
</script>