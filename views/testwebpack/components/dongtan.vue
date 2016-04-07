<template>
    <h2>{{title.title}}</h2>
</template>

<script>
    import Title from 'comment.vue'
    export default {
        name: 'Dongtan',
        data: function () {
            return {
                title: {
                    title: '标题',
                    author: '无秘密',
                    time: '2015-03-12 12:12:12',
                    likes: 19
                }
            };
        },
        components: {
            'Title': Title
        }
    }
</script>