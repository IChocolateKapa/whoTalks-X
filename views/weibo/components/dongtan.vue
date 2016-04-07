<template>
    <nav-title :title="title"></nav-title>
</template>

<script>
    import navTitle from 'dongtan.vue'
    export default {
        el: '#app',
        data: {
            title: {
                title: 'БъЬт'
            }
        },
        components: [navTitle]
    }
</script>