<style lang="less">

</style>

<template>
    <section class="send_text">
        <textarea  v-model="msg" class="text mysend" placeholder="发布你的动弹~"></textarea>
        <div class="send_wrap">
            <input type="button" class="input danger" @click="notify()" value="发布"/>
        </div>
    </section>
</template>

<script>

    module.exports = {
        data: function () {
            return {
                msg: ''
            }
        },
        methods: {
            notify: function () {
                if (this.msg.trim()) {
                    this.$emit('generate-send', this.msg);
                    this.msg = '';
                }
            }
        }
    }
</script>