
<template>
    {{title.title}}
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