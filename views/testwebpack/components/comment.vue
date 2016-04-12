
<template>
    <h2>{{title.title}}</h2>
    <p>{{title.author}}</p>
    <p>{{title.time}}</p>
    <p>{{title.likes}}</p>
</template>

<script>
    export default {
        name: 'Title',
        props: {
            title: {
                title: '',
                author: '',
                time: '',
                content: '',
                likes: 0
            }
        }
    }
</script>